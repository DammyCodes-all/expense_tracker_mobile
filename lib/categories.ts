import { TransactionIconKey } from "./transactions";

export interface Category {
  id: string;
  name: string;
  notes?: string;
  budget?: number;
  amountSpent?: number;
  currency?: string;
  icon?: TransactionIconKey;
  createdAt: string;
}

export const SEED_CATEGORIES: Category[] = [
  {
    id: "cat_transport",
    name: "Transport",
    budget: 700,
    amountSpent: 0,
    currency: "USD",
    icon: "car",
    createdAt: "2025-09-01T00:00:00.000Z",
  },
  {
    id: "cat_dining",
    name: "Dining Out",
    budget: 500,
    amountSpent: 0,
    currency: "USD",
    icon: "cutlery",
    createdAt: "2025-09-01T00:00:00.000Z",
  },
  {
    id: "cat_groceries",
    name: "Groceries",
    budget: 400,
    amountSpent: 0,
    currency: "USD",
    icon: "bag",
    createdAt: "2025-09-01T00:00:00.000Z",
  },
  {
    id: "cat_utilities",
    name: "Utilities",
    budget: 200,
    amountSpent: 0,
    currency: "USD",
    icon: "money",
    createdAt: "2025-09-01T00:00:00.000Z",
  },
  {
    id: "cat_entertainment",
    name: "Entertainment",
    budget: 300,
    amountSpent: 0,
    currency: "USD",
    icon: "car",
    createdAt: "2025-09-01T00:00:00.000Z",
  },
];

export const categoriesToOptions = (categories: Category[]) =>
  categories.map((c) => ({ label: c.name, value: c.id }));
