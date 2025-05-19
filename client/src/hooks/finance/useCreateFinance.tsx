import { useState } from 'react';
import type { FinanceRequest } from '../../types/finance';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchFinanceCreate } from '../../store/finance/action';

export type FinanceRequestWithoutUserId = Omit<FinanceRequest, 'userId'>;

const initialState: FinanceRequestWithoutUserId = {
  type: '',
  category: '',
  description: '',
  amount: 0,
};

export const useCreateFinance = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newFinance, setNewFinance] = useState(initialState);
  const [isCreating, setIsCreating] = useState(false);

  //TODO: нужно избавиться, userId можно получить внутри асинхронного экшена,
  // плюс если пользователь авторизован, то на бэке можно получать userId
  const authInfo = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewFinance({ type: '', category: '', description: '', amount: 0 });
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleCreateFinance = async () => {
    if (
      !authInfo?.id ||
      !newFinance.type ||
      !newFinance.category ||
      !newFinance.amount
    ) {
      return;
    }

    try {
      setIsCreating(true);
      const financeRequest: FinanceRequest = {
        type: newFinance.type,
        category: newFinance.category,
        description: newFinance.description || '',
        amount: newFinance.amount,
        userId: authInfo.id,
      };
      await dispatch(fetchFinanceCreate(financeRequest)).unwrap();
      handleAddDialogClose();
    } catch (error) {
      console.error('Failed to create finance record:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleFieldChange = (
    field: keyof FinanceRequest,
    value: string | number,
  ) => {
    setNewFinance((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) : value,
    }));
  };

  return {
    newFinance,
    isCreating,
    handleFieldChange,
    handleCreateFinance,
    addDialogOpen,
    handleAddDialogClose,
    handleAddDialogOpen,
  };
};
