export interface FinanceRequest {
  type: string;
  category: string;
  description: string;
  amount: number;
  userId: string;
}

export interface Finance extends FinanceRequest {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __V: number;
}

export interface FinanceState {
  loading: boolean;
  error: boolean;
  financeHistory: Finance[];
}
