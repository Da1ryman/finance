import { CircularProgress, Container, Paper, Button, Box } from '@mui/material';
import { useAppSelector } from '../store/store';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import type { FinanceRequest } from '../types/finance';
import { FinanceTable } from './FinanceTable';
import { DialogDeleteAll } from './DialogDeleteAll';
import { DialogCreate, type FinanceRequestWithoutUserId } from './DialogCreate';

export const FinanceComponent = () => {
  const { loading, financeHistory } = useAppSelector((state) => state.finance);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [newFinance, setNewFinance] = useState<FinanceRequestWithoutUserId>({
    type: '',
    category: '',
    description: '',
    amount: 0,
  });

  const handleDeleteAllClick = () => {
    setDeleteAllDialogOpen(true);
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
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

        <FinanceTable />
      </Paper>

      <DialogCreate
        setNewFinance={setNewFinance}
        setAddDialogOpen={setAddDialogOpen}
        setIsCreating={setIsCreating}
        isCreating={isCreating}
        addDialogOpen={addDialogOpen}
        newFinance={newFinance}
        handleFieldChange={handleFieldChange}
      />

      <DialogDeleteAll
        deleteAllDialogOpen={deleteAllDialogOpen}
        setDeleteAllDialogOpen={setDeleteAllDialogOpen}
        isDeletingAll={isDeletingAll}
        setIsDeletingAll={setIsDeletingAll}
      />
    </Container>
  );
};
