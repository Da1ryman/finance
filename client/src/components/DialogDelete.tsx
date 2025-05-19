import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchFinanceDelete } from '../store/finance/action';
import { CustomModal } from '../another/CustomModal';

interface DialogDeleteProps {
  setDeleteDialogOpen: (open: boolean) => void;
  setItemToDelete: (item: string | null) => void;
  deleteDialogOpen: boolean;
  itemToDelete: string | null;
}

export const DialogDelete = ({
  setDeleteDialogOpen,
  setItemToDelete,
  deleteDialogOpen,
  itemToDelete,
}: DialogDeleteProps) => {
  const authInfo = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

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
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <CustomModal
      dialogClose={handleDeleteDialogClose}
      dialogOpen={deleteDialogOpen}
      action={
        <>
          <Button onClick={handleDeleteDialogClose}>Отмена</Button>

          <Button
            onClick={handleConfirmDelete}
            color='error'
            startIcon={<DeleteIcon />}
          >
            Удалить
          </Button>
        </>
      }
      title='Удалить эту запись?'
    />
  );
};
