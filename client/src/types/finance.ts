export type FinanceRequest = {
  type: string;
  category: string;
  description: string;
  amount: number;
};

export type Finance = FinanceRequest & {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __V: number;
};

export interface FinanceState {
  loading: boolean;
  error: boolean;
  financeHistory: Finance[];
}
