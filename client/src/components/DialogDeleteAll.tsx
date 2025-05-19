import { Button, CircularProgress } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { fetchFinanceDeleteAll } from '../store/finance/action';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CustomModal } from '../another/CustomModal';

interface DialogDeleteAllProps {
  deleteAllDialogOpen: boolean;
  setDeleteAllDialogOpen: (open: boolean) => void;
  setIsDeletingAll: (isDeleting: boolean) => void;
  isDeletingAll: boolean;
}

export const DialogDeleteAll = ({
  deleteAllDialogOpen,
  setDeleteAllDialogOpen,
  setIsDeletingAll,
  isDeletingAll,
}: DialogDeleteAllProps) => {
  const { authInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleDeleteAllDialogClose = () => {
    setDeleteAllDialogOpen(false);
  };

  const handleConfirmDeleteAll = async () => {
    if (!authInfo?.id) {
      return;
    }

    try {
      setIsDeletingAll(true);
      await dispatch(fetchFinanceDeleteAll(authInfo.id)).unwrap();
    } catch (error) {
      console.error('Failed to delete all finance records:', error);
    } finally {
      setIsDeletingAll(false);
      setDeleteAllDialogOpen(false);
    }
  };

  return (
    <CustomModal
      title='Удалить все записи?'
      dialogOpen={deleteAllDialogOpen}
      dialogClose={handleDeleteAllDialogClose}
      action={
        <>
          <Button onClick={handleDeleteAllDialogClose} disabled={isDeletingAll}>
            Отмена
          </Button>

          <Button
            onClick={handleConfirmDeleteAll}
            color='error'
            disabled={isDeletingAll}
            startIcon={
              isDeletingAll ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                <DeleteForeverIcon />
              )
            }
          >
            Удалить
          </Button>
        </>
      }
    />
  );
};
