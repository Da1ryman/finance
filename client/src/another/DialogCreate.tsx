import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { FinanceRequest } from '../types/finance';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchFinanceCreate } from '../store/finance/action';

export type FinanceRequestWithoutUserId = Omit<FinanceRequest, 'userId'>;

interface FinanceDialogProps {
  setAddDialogOpen: (open: boolean) => void;
  setNewFinance: (item: FinanceRequestWithoutUserId) => void;
  setIsCreating: (isCreating: boolean) => void;
  isCreating: boolean;
  addDialogOpen: boolean;
  newFinance: FinanceRequestWithoutUserId;
  handleFieldChange: (
    field: keyof FinanceRequest,
    value: string | number,
  ) => void;
}

export const DialogCreate = ({
  setAddDialogOpen,
  setNewFinance,
  setIsCreating,
  isCreating,
  addDialogOpen,
  newFinance,
  handleFieldChange,
}: FinanceDialogProps) => {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.user.authInfo);

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewFinance({ type: '', category: '', description: '', amount: 0 });
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

  return (
    <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
      <DialogTitle>Добавить новую запись?</DialogTitle>

      <Box sx={{ p: 2 }}>
        <TextField
          label='Тип'
          value={newFinance.type || ''}
          onChange={(e) => handleFieldChange('type', e.target.value)}
          size='small'
          fullWidth
          margin='normal'
          disabled={isCreating}
          required
        />

        <TextField
          label='Категория'
          value={newFinance.category || ''}
          onChange={(e) => handleFieldChange('category', e.target.value)}
          size='small'
          fullWidth
          margin='normal'
          disabled={isCreating}
          required
        />

        <TextField
          label='Описание'
          value={newFinance.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          size='small'
          fullWidth
          margin='normal'
          disabled={isCreating}
        />

        <TextField
          label='Сумма'
          value={newFinance.amount ?? ''}
          onChange={(e) => handleFieldChange('amount', e.target.value)}
          size='small'
          type='number'
          fullWidth
          margin='normal'
          InputProps={{
            startAdornment: <InputAdornment position='start'>₽</InputAdornment>,
          }}
          disabled={isCreating}
          required
        />
      </Box>

      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
};
