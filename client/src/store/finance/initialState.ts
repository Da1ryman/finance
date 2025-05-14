import type { FinanceState } from '../../types/finance';

export const initialState: FinanceState = {
  loading: false,
  error: false,
  financeHistory: [],
};
