import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Category, SEED_CATEGORIES } from "../lib/categories";
import { LedgerTransaction, SEED_TRANSACTIONS } from "../lib/transactions";

export interface CategoryStat {
  spent: number;
  budget: number;
  percentSpent: number;
  amountLeft: number;
  isOverBudget: boolean;
}

const TRANSACTIONS_STORAGE_KEY = "expense_tracker_transactions_v1";
const CATEGORIES_STORAGE_KEY = "expense_tracker_categories_v1";

interface TransactionsContextValue {
  transactions: LedgerTransaction[];
  isHydrated: boolean;
  addTransaction: (transaction: LedgerTransaction) => void;

  categories: Category[];
  categoriesHydrated: boolean;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  removeCategory: (categoryId: string) => void;
  categoryStats: Record<string, CategoryStat>;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(
  undefined,
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesHydrated, setCategoriesHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const [storedTx, storedCats] = await Promise.all([
          AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY),
          AsyncStorage.getItem(CATEGORIES_STORAGE_KEY),
        ]);

        if (storedTx) {
          const parsed = JSON.parse(storedTx);
          if (Array.isArray(parsed)) {
            setTransactions(parsed);
          }
        } else {
          setTransactions(SEED_TRANSACTIONS);
          await AsyncStorage.setItem(
            TRANSACTIONS_STORAGE_KEY,
            JSON.stringify(SEED_TRANSACTIONS),
          );
        }

        if (storedCats) {
          const parsed = JSON.parse(storedCats);
          if (Array.isArray(parsed)) {
            setCategories(parsed);
          }
        } else {
          setCategories(SEED_CATEGORIES);
          await AsyncStorage.setItem(
            CATEGORIES_STORAGE_KEY,
            JSON.stringify(SEED_CATEGORIES),
          );
        }
      } catch (error) {
        console.warn("Failed to load transactions or categories", error);
        setTransactions(SEED_TRANSACTIONS);
        setCategories(SEED_CATEGORIES);
      } finally {
        setIsHydrated(true);
        setCategoriesHydrated(true);
      }
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions),
    ).catch((error) => {
      console.warn("Failed to persist transactions", error);
    });
  }, [transactions, isHydrated]);

  useEffect(() => {
    if (!categoriesHydrated) return;

    AsyncStorage.setItem(
      CATEGORIES_STORAGE_KEY,
      JSON.stringify(categories),
    ).catch((error) => {
      console.warn("Failed to persist categories", error);
    });
  }, [categories, categoriesHydrated]);

  const addTransaction = useCallback((transaction: LedgerTransaction) => {
    setTransactions((previous) => [transaction, ...previous]);
  }, []);

  const addCategory = useCallback((category: Category) => {
    setCategories((previous) => [category, ...previous]);
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setCategories((previous) =>
      previous.map((c) => (c.id === category.id ? category : c)),
    );
  }, []);

  const removeCategory = useCallback((categoryId: string) => {
    setCategories((previous) => previous.filter((c) => c.id !== categoryId));
  }, []);

  const categoryStats = useMemo(() => {
    const spentByCategoryId: Record<string, number> = {};

    for (const transaction of transactions) {
      if (transaction.isIncome || !transaction.categoryId) {
        continue;
      }

      spentByCategoryId[transaction.categoryId] =
        (spentByCategoryId[transaction.categoryId] || 0) + transaction.amount;
    }

    return categories.reduce<Record<string, CategoryStat>>(
      (stats, category) => {
        const spent = spentByCategoryId[category.id] || 0;
        const budget = category.budget || 0;
        const safeBudget = Math.max(budget, 0);
        const amountLeft = Math.max(safeBudget - spent, 0);
        const percentSpent =
          safeBudget > 0
            ? Math.min((spent / safeBudget) * 100, 100)
            : spent > 0
              ? 100
              : 0;

        stats[category.id] = {
          spent,
          budget: safeBudget,
          percentSpent,
          amountLeft,
          isOverBudget: spent > safeBudget,
        };

        return stats;
      },
      {},
    );
  }, [categories, transactions]);

  const value = useMemo(
    () => ({
      transactions,
      isHydrated,
      addTransaction,

      categories,
      categoriesHydrated,
      addCategory,
      updateCategory,
      removeCategory,
      categoryStats,
    }),
    [
      transactions,
      isHydrated,
      addTransaction,
      categories,
      categoriesHydrated,
      addCategory,
      updateCategory,
      removeCategory,
      categoryStats,
    ],
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }

  return context;
}
