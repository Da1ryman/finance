import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/store';
import { TableItemFinance } from './TableItemFinance';
import { useEffect, useState } from 'react';
import {
  fetchFinanceHistory,
  fetchFinanceDeleteAll,
  fetchFinanceCreate,
} from '../store/finance/action';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import type { FinanceRequest } from '../types/finance';

export const TableFinance = () => {
  const { loading, financeHistory } = useAppSelector((state) => state.finance);
  const { authInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [newFinance, setNewFinance] = useState<Partial<FinanceRequest>>({
    type: '',
    category: '',
    description: '',
    amount: 0,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    if (authInfo?.id) {
      dispatch(fetchFinanceHistory(authInfo.id));
    }
  }, [authInfo, dispatch]);

  const handleDeleteAllClick = () => {
    setDeleteAllDialogOpen(true);
  };

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

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewFinance({ type: '', category: '', description: '', amount: 0 });
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
    <Container sx={{ mt: 10 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            disabled={loading}
          >
            Добавить запись
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={
              isDeletingAll ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                <DeleteForeverIcon />
              )
            }
            onClick={handleDeleteAllClick}
            disabled={financeHistory.length === 0 || loading || isDeletingAll}
          >
            Удалить все записи
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Тип</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Категория</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Описание</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Сумма</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                Дата записи/обновления
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Изменить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <TableItemFinance />
            )}
          </TableBody>
        </Table>
      </Paper>

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
              startAdornment: (
                <InputAdornment position='start'>₽</InputAdornment>
              ),
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
            startIcon={
              isCreating ? <CircularProgress size={24} /> : <AddIcon />
            }
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteAllDialogOpen} onClose={handleDeleteAllDialogClose}>
        <DialogTitle>Удалить все записи?</DialogTitle>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Container>
  );
};
