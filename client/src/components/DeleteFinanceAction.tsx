import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteProps {
  handleDeleteDialogClose: () => void;
  handleConfirmDelete: () => void;
}

export const DeleteFinanceAction = ({
  handleDeleteDialogClose,
  handleConfirmDelete,
}: DeleteProps) => {
  return (
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
  );
};
