import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LedgerTransaction, SEED_TRANSACTIONS } from "../lib/transactions";

const TRANSACTIONS_STORAGE_KEY = "expense_tracker_transactions_v1";

interface TransactionsContextValue {
  transactions: LedgerTransaction[];
  isHydrated: boolean;
  addTransaction: (transaction: LedgerTransaction) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(
  undefined,
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const stored = await AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setTransactions(parsed);
          }
        } else {
          // Initialize with seed data on first app load
          setTransactions(SEED_TRANSACTIONS);
          await AsyncStorage.setItem(
            TRANSACTIONS_STORAGE_KEY,
            JSON.stringify(SEED_TRANSACTIONS),
          );
        }
      } catch (error) {
        console.warn("Failed to load transactions from storage", error);
        setTransactions(SEED_TRANSACTIONS);
      } finally {
        setIsHydrated(true);
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

  const addTransaction = React.useCallback((transaction: LedgerTransaction) => {
    setTransactions((previous) => [transaction, ...previous]);
  }, []);

  const value = React.useMemo(
    () => ({
      transactions,
      isHydrated,
      addTransaction,
    }),
    [transactions, isHydrated, addTransaction],
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
