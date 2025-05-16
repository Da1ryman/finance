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
  async (userId: string) => {
    try {
      const financeHistory = await getAllFinanceByUserId(userId);

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
      const { _id, type, category, description, amount, userId } = finance;
      await putFinanceById(_id, {
        type,
        category,
        description,
        amount,
        userId,
      });
      const financeChange = await getAllFinanceByUserId(userId);

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
      const financeHistory = await getAllFinanceByUserId(finance.userId);

      return financeHistory;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);

export const fetchFinanceDeleteAll = createAsyncThunk(
  'finance/fetchFinanceDeleteAll',
  async (userId: string) => {
    try {
      await deleteAllFinance(userId);
      const financeHistory = await getAllFinanceByUserId(userId);

      return financeHistory;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);
