// Financial Summary Types
export type FinancialChange = {
  percentage: number;
  trend: "up" | "down" | "stable";
};

export type FinancialAmount = {
  amount: number;
  currency: string;
  change?: FinancialChange;
};

export type FinancialSummary = {
  totalBalance: FinancialAmount;
  totalExpense: FinancialAmount;
  totalSavings: FinancialAmount;
  lastUpdated: string;
};

// Working Capital Types
export type WorkingCapitalDataPoint = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

export type WorkingCapitalSummary = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export type WorkingCapital = {
  period: string;
  currency: string;
  data: WorkingCapitalDataPoint[];
  summary: WorkingCapitalSummary;
};

// Wallet Types
export type WalletCard = {
  id: string;
  name: string;
  type: "credit" | "debit";
  cardNumber: string;
  bank: string;
  network: "Visa" | "Mastercard" | "American Express";
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};

export type Wallet = {
  cards: WalletCard[];
};

// Recent Transactions Types
export type Transaction = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
};

export type RecentTransactionsSummary = {
  totalIncome: number;
  totalExpense: number;
  count: number;
};

export type RecentTransactions = {
  transactions: Transaction[];
  summary: RecentTransactionsSummary;
};

// Scheduled Transfers Types
export type ScheduledTransfer = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: "scheduled" | "processing" | "completed" | "cancelled";
};

export type ScheduledTransfersSummary = {
  totalScheduledAmount: number;
  count: number;
};

export type ScheduledTransfers = {
  transfers: ScheduledTransfer[];
  summary: ScheduledTransfersSummary;
};

// Generic API Response wrapper (same as auth)
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: string;
};

