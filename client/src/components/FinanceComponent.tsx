import { CircularProgress, Container, Paper, Button, Box } from '@mui/material';
import { useAppSelector } from '../store/store';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { FinanceTable } from './FinanceTable';
import { DialogDeleteAll } from './DialogDeleteAll';
import { CustomModal } from '../another/CustomModal';
import { CreateFinance } from './CreateFinance';
import { useCreateFinance } from '../hooks/finance/useCreateFinance';

export const FinanceComponent = () => {
  const { loading, financeHistory } = useAppSelector((state) => state.finance);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const {
    newFinance,
    isCreating,
    handleFieldChange,
    handleCreateFinance,
    addDialogOpen,
    handleAddDialogClose,
    handleAddDialogOpen,
  } = useCreateFinance();

  const handleDeleteAllClick = () => {
    setDeleteAllDialogOpen(true);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<AddIcon />}
            onClick={handleAddDialogOpen}
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

      <CustomModal
        title='Добавить новую запись?'
        dialogOpen={addDialogOpen}
        dialogClose={handleAddDialogClose}
        content={
          <CreateFinance
            isPending={isCreating}
            handleFieldChange={handleFieldChange}
            newFinance={newFinance}
          />
        }
        action={
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
              startIcon={
                isCreating ? <CircularProgress size={24} /> : <AddIcon />
              }
            >
              Добавить
            </Button>
          </>
        }
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
