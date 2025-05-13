import { createSlice } from '@reduxjs/toolkit';
import { financeInitialState } from './initialState';
import {
  fetchFinanceChange,
  fetchFinanceCreate,
  fetchFinanceDelete,
  fetchFinanceDeleteAll,
  fetchFinanceHistory,
} from './action';
import type { FinanceState } from '../../types/finance';

const pending = (state: FinanceState) => {
  state.loading = true;
  state.error = false;
};

const rejected = (state: FinanceState) => {
  state.loading = false;
  state.error = true;
};

const fulfilled = (state: FinanceState) => {
  state.error = false;
  state.loading = false;
};

const financeSlice = createSlice({
  name: 'finance',
  initialState: financeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceHistory.pending, pending)
      .addCase(fetchFinanceHistory.rejected, rejected)
      .addCase(fetchFinanceHistory.fulfilled, (state, action) => {
        fulfilled(state);
        state.financeHistory = action.payload;
      });

    builder
      .addCase(fetchFinanceChange.pending, pending)
      .addCase(fetchFinanceChange.rejected, rejected)
      .addCase(fetchFinanceChange.fulfilled, (state, action) => {
        fulfilled(state);
        state.financeHistory.map((finance) =>
          finance._id === action.payload._id ? action.payload : finance,
        );
      });

    builder
      .addCase(fetchFinanceCreate.pending, pending)
      .addCase(fetchFinanceCreate.rejected, rejected)
      .addCase(fetchFinanceCreate.fulfilled, (state, action) => {
        fulfilled(state);
        state.financeHistory.push(action.payload);
      });

    builder
      .addCase(fetchFinanceDelete.pending, pending)
      .addCase(fetchFinanceDelete.rejected, rejected)
      .addCase(fetchFinanceDelete.fulfilled, (state, action) => {
        fulfilled(state);
        state.financeHistory = action.payload;
      });

    builder
      .addCase(fetchFinanceDeleteAll.pending, pending)
      .addCase(fetchFinanceDeleteAll.rejected, rejected)
      .addCase(fetchFinanceDeleteAll.fulfilled, (state, action) => {
        fulfilled(state);
        state.financeHistory = action.payload;
      });
  },
});

export const financeReducer = financeSlice.reducer;
