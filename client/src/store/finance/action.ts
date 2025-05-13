import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteAllFinance,
  deleteOneFinance,
  getAllFinanceByUserId,
  postNewFinanceByUserId,
  putFinanceById,
} from '../../api/FinanceApi';
import type { Finance, FinanceChange } from '../../types/finance';

export const fetchFinanceHistory = createAsyncThunk(
  'finance/fetchFinanceHistory',
  async (idUser: string) => {
    try {
      const financeHistory = await getAllFinanceByUserId(idUser);

      return financeHistory;
    } catch (error) {
      console.error(error);

      throw error;
    }
  },
);

export const fetchFinanceCreate = createAsyncThunk(
  'finance/fetchFinanceCreate',
  async (finance: FinanceChange) => {
    try {
      const financeCreate = await postNewFinanceByUserId(finance);

      return financeCreate;
    } catch (error) {
      console.error(error);

      throw error;
    }
  },
);

export const fetchFinanceChange = createAsyncThunk(
  'finance/fetchFinanceChange',
  async (finance: Finance) => {
    try {
      const { _id, type, category, description, amount, userId } = finance;
      const financeChange = await putFinanceById(_id, {
        type,
        category,
        description,
        amount,
        userId,
      });

      return financeChange;
    } catch (error) {
      console.error(error);

      throw error;
    }
  },
);

export const fetchFinanceDelete = createAsyncThunk(
  'finance/fetchFinanceDelete',
  async ({ financeId, userId }: { financeId: string; userId: string }) => {
    try {
      await deleteOneFinance(financeId);
      const financeHistory = await getAllFinanceByUserId(userId);

      return financeHistory;
    } catch (error) {
      console.error(error);

      throw error;
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
      console.error(error);

      throw error;
    }
  },
);
