import {
  Apple01Icon,
  Car01Icon,
  KitchenUtensilsIcon,
  MenuRestaurantIcon,
  Money03Icon,
  Note01Icon,
  ShoppingBag02Icon,
  WaterPumpIcon,
} from "@hugeicons/core-free-icons";

export type TransactionIconKey =
  | "car"
  | "cutlery"
  | "bag"
  | "money"
  | "water"
  | "fruit"
  | "soup"
  | "note";

export interface LedgerTransaction {
  id: string;
  icon: TransactionIconKey;
  title: string;
  category: string;
  time: string;
  amount: number;
  date: string;
  isIncome?: boolean;
  createdAt: string;
  notes?: string;
}

export type TransactionCategoryValue =
  | "transport"
  | "dining_out"
  | "groceries"
  | "water_refill"
  | "fruits"
  | "soups"
  | "other";

export interface AddTransactionInput {
  person: string;
  date: string;
  allocation: TransactionCategoryValue;
  amount: number;
  notes?: string;
}

export const CATEGORY_OPTIONS: {
  label: string;
  value: TransactionCategoryValue;
}[] = [
  { label: "Transport", value: "transport" },
  { label: "Dinner Out", value: "dining_out" },
  { label: "Groceries", value: "groceries" },
  { label: "Water Refill", value: "water_refill" },
  { label: "Fruits", value: "fruits" },
  { label: "Soups", value: "soups" },
  { label: "Other", value: "other" },
];

const CATEGORY_METADATA: Record<
  TransactionCategoryValue,
  { label: string; icon: TransactionIconKey }
> = {
  transport: { label: "Transport", icon: "car" },
  dining_out: { label: "Dinner Out", icon: "cutlery" },
  groceries: { label: "Groceries", icon: "bag" },
  water_refill: { label: "Water Refill", icon: "water" },
  fruits: { label: "Fruits", icon: "fruit" },
  soups: { label: "Soups", icon: "soup" },
  other: { label: "Other", icon: "note" },
};

export const TRANSACTION_ICON_COMPONENTS: Record<TransactionIconKey, any> = {
  car: Car01Icon,
  cutlery: KitchenUtensilsIcon,
  bag: ShoppingBag02Icon,
  money: Money03Icon,
  water: WaterPumpIcon,
  fruit: Apple01Icon,
  soup: MenuRestaurantIcon,
  note: Note01Icon,
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export const createLedgerTransaction = (
  input: AddTransactionInput,
): LedgerTransaction => {
  const metadata = CATEGORY_METADATA[input.allocation];
  const now = new Date();

  return {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    icon: metadata.icon,
    title: input.person.trim(),
    category: metadata.label,
    time: formatTime(now),
    amount: input.amount,
    date: input.date.trim(),
    isIncome: false,
    createdAt: now.toISOString(),
    notes: input.notes?.trim() || undefined,
  };
};

export const SEED_TRANSACTIONS: LedgerTransaction[] = [
  {
    id: "seed_apple_store",
    icon: "bag",
    title: "Apple Store",
    category: "Technology",
    time: "2:45 PM",
    amount: 1299.0,
    date: "OCT 12",
    isIncome: false,
    createdAt: "2025-10-12T14:45:00.000Z",
  },
  {
    id: "seed_dividend",
    icon: "money",
    title: "Dividend Payout",
    category: "Investment",
    time: "11:20 AM",
    amount: 450.25,
    date: "OCT 11",
    isIncome: true,
    createdAt: "2025-10-11T11:20:00.000Z",
  },
  {
    id: "seed_dining",
    icon: "cutlery",
    title: "The Gilded Fork",
    category: "Dining",
    time: "8:15 PM",
    amount: 240.5,
    date: "OCT 10",
    isIncome: false,
    createdAt: "2025-10-10T20:15:00.000Z",
  },
  {
    id: "seed_spotify",
    icon: "money",
    title: "Spotify Premium",
    category: "Entertainment",
    time: "10:30 AM",
    amount: 9.99,
    date: "OCT 9",
    isIncome: false,
    createdAt: "2025-10-09T10:30:00.000Z",
  },
];
