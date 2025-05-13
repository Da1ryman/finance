import type { FinanceState } from '../../types/finance';

export const financeInitialState: FinanceState = {
  loading: false,
  error: false,
  financeHistory: [],
};
