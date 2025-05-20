import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { fetchFinanceDeleteAll } from '../../store/finance/action';

export const useDeleteAllFinance = () => {
  const [removeAllDialogOpen, setRemoveAllDialogOpen] = useState(false);
  const [isRemovingAll, setIsRemovingAll] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteAllClick = () => {
    setRemoveAllDialogOpen(true);
  };

  const handleDeleteAllDialogClose = () => {
    setRemoveAllDialogOpen(false);
  };

  const handleConfirmDeleteAll = async () => {
    try {
      setIsRemovingAll(true);
      await dispatch(fetchFinanceDeleteAll()).unwrap();
    } catch (error) {
      console.error('Failed to delete all finance records:', error);
    } finally {
      setIsRemovingAll(false);
      setRemoveAllDialogOpen(false);
    }
  };

  return {
    removeAllDialogOpen,
    isRemovingAll,
    handleDeleteAllClick,
    handleDeleteAllDialogClose,
    handleConfirmDeleteAll,
  };
};
