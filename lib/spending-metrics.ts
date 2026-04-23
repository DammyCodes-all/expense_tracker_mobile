import { LedgerTransaction } from "./transactions";

export interface TrendPoint {
  value: number;
  label: string;
}

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

const startOfDay = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const addDays = (value: Date, days: number) => {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
};

const getWeekStart = (value: Date) => {
  const date = startOfDay(value);
  const day = date.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  return addDays(date, offset);
};

const getTransactionDate = (transaction: LedgerTransaction) => {
  const parsed = new Date(transaction.createdAt);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isSpendingTransaction = (transaction: LedgerTransaction) =>
  !transaction.isIncome && transaction.amount > 0;

export function buildSpendingTrendSeries(
  transactions: LedgerTransaction[],
  weeks = 5,
) {
  const today = startOfDay(new Date());
  const currentWeekStart = getWeekStart(today);
  const weekStarts = Array.from({ length: weeks }, (_, index) =>
    addDays(currentWeekStart, (index - (weeks - 1)) * 7),
  );
  const totals = weekStarts.map(() => 0);

  for (const transaction of transactions) {
    if (!isSpendingTransaction(transaction)) {
      continue;
    }

    const transactionDate = getTransactionDate(transaction);
    if (!transactionDate) {
      continue;
    }

    const transactionWeekStart = getWeekStart(transactionDate).getTime();
    const bucketIndex = weekStarts.findIndex(
      (weekStart) => weekStart.getTime() === transactionWeekStart,
    );

    if (bucketIndex !== -1) {
      totals[bucketIndex] += transaction.amount;
    }
  }

  const data = weekStarts.map((weekStart, index) => ({
    value: totals[index],
    label: SHORT_DATE_FORMATTER.format(weekStart),
  }));

  const firstWeekStart = weekStarts[0] ?? currentWeekStart;
  const lastWeekEnd = addDays(weekStarts[weekStarts.length - 1] ?? currentWeekStart, 6);

  return {
    data,
    dateRange: `${SHORT_DATE_FORMATTER.format(firstWeekStart)} - ${SHORT_DATE_FORMATTER.format(lastWeekEnd)}`,
  };
}

export function buildSpendingVelocitySeries(transactions: LedgerTransaction[]) {
  const today = startOfDay(new Date());
  const labels = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index - 6);
    return WEEKDAY_FORMATTER.format(date).toUpperCase();
  });

  const actual = Array(7).fill(0);
  const baseline = Array(7).fill(0);

  for (const transaction of transactions) {
    if (!isSpendingTransaction(transaction)) {
      continue;
    }

    const transactionDate = getTransactionDate(transaction);
    if (!transactionDate) {
      continue;
    }

    const transactionDay = startOfDay(transactionDate);
    const dayOffset = Math.round(
      (transactionDay.getTime() - addDays(today, -6).getTime()) / 86400000,
    );

    if (dayOffset >= 0 && dayOffset < 7) {
      actual[dayOffset] += transaction.amount;
      continue;
    }

    const baselineOffset = Math.round(
      (transactionDay.getTime() - addDays(today, -13).getTime()) / 86400000,
    );

    if (baselineOffset >= 0 && baselineOffset < 7) {
      baseline[baselineOffset] += transaction.amount;
    }
  }

  const actualTotal = actual.reduce((sum, value) => sum + value, 0);
  const baselineTotal = baseline.reduce((sum, value) => sum + value, 0);
  const percentChange =
    baselineTotal > 0
      ? ((actualTotal - baselineTotal) / baselineTotal) * 100
      : actualTotal > 0
        ? 100
        : 0;

  return {
    data: actual,
    baseline,
    labels,
    percentChange,
  };
}