export interface Finance {
  type: string;
  category: string;
  description: string;
  amount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __V: number;
}

export interface FinanceChange {
  type: string;
  category: string;
  description: string;
  amount: number;
  userId: string;
}

export interface FinanceState {
  loading: boolean;
  error: boolean;
  financeHistory: Finance[];
}
