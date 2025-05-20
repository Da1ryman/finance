import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchFinanceDelete } from '../../store/finance/action';

export const useDeleteFinance = () => {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const authInfo = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setRemoveDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete || !authInfo?.id) return;

    try {
      await dispatch(
        fetchFinanceDelete({
          financeId: itemToDelete,
          userId: authInfo.id,
        }),
      ).unwrap();
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setRemoveDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteDialogClose = () => {
    setRemoveDialogOpen(false);
  };

  return {
    removeDialogOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleDeleteDialogClose,
  };
};
