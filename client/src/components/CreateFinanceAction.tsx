import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import type { FinanceRequestWithoutUserId } from '../hooks/finance/useCraeteFinance';

interface PropsCreateAction {
  handleAddDialogClose: () => void;
  isCreating: boolean;
  newFinance: FinanceRequestWithoutUserId;
  handleCreateFinance: () => void;
}

export const CreateFinanceAction = ({
  handleAddDialogClose,
  isCreating,
  newFinance,
  handleCreateFinance,
}: PropsCreateAction) => {
  return (
    <>
      <Button onClick={handleAddDialogClose} disabled={isCreating}>
        Отмена
      </Button>

      <Button
        onClick={handleCreateFinance}
        color='primary'
        disabled={
          isCreating ||
          !newFinance.type ||
          !newFinance.category ||
          !newFinance.amount
        }
        startIcon={isCreating ? <CircularProgress size={24} /> : <AddIcon />}
      >
        Добавить
      </Button>
    </>
  );
};
