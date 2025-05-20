import { Button, CircularProgress } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface DeleteAllProps {
  handleDeleteAllDialogClose: () => void;
  isRemovingAll: boolean;
  handleConfirmDeleteAll: () => void;
}

export const DeleteAllFinanceAction = ({
  handleDeleteAllDialogClose,
  isRemovingAll,
  handleConfirmDeleteAll,
}: DeleteAllProps) => {
  return (
    <>
      <Button onClick={handleDeleteAllDialogClose} disabled={isRemovingAll}>
        Отмена
      </Button>

      <Button
        onClick={handleConfirmDeleteAll}
        color='error'
        disabled={isRemovingAll}
        startIcon={
          isRemovingAll ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            <DeleteForeverIcon />
          )
        }
      >
        Удалить
      </Button>
    </>
  );
};
