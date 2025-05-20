import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteAllFinance,
  deleteOneFinance,
  getAllFinanceByUserId,
  postNewFinanceByUserId,
  putFinanceById,
} from '../../api/FinanceApi';
import type { Finance, FinanceRequest } from '../../types/finance';
import { errorHandling } from '../../helper/errorHandling';

export const fetchFinanceHistory = createAsyncThunk(
  'finance/fetchFinanceHistory',
  async () => {
    try {
      const financeHistory = await getAllFinanceByUserId();

      return financeHistory;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);

export const fetchFinanceCreate = createAsyncThunk(
  'finance/fetchFinanceCreate',
  async (finance: FinanceRequest) => {
    try {
      const financeCreate = await postNewFinanceByUserId(finance);

      return financeCreate;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);

export const fetchFinanceChange = createAsyncThunk(
  'finance/fetchFinanceChange',
  async (finance: Finance) => {
    try {
      const { _id, type, category, description, amount } = finance;
      await putFinanceById(_id, {
        type,
        category,
        description,
        amount,
      });
      const financeChange = await getAllFinanceByUserId();

      return financeChange;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);

export const fetchFinanceDelete = createAsyncThunk(
  'finance/fetchFinanceDelete',
  async (finance: { financeId: string; userId: string }) => {
    try {
      await deleteOneFinance(finance.financeId);
      const financeHistory = await getAllFinanceByUserId();

      return financeHistory;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);

export const fetchFinanceDeleteAll = createAsyncThunk(
  'finance/fetchFinanceDeleteAll',
  async () => {
    try {
      await deleteAllFinance();
      const financeHistory = await getAllFinanceByUserId();

      return financeHistory;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);
