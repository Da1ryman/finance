import { CircularProgress, Container, Paper, Button, Box } from '@mui/material';
import { useAppSelector } from '../store/store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { FinanceTable } from './FinanceTable';
import { useCreateFinance } from '../hooks/finance/useCraeteFinance';
import { CreateFinance } from './CreateFinance';
import { CustomModal } from '../another/CustomModal';
import { CreateFinanceAction } from './CreateFinanceAction';
import { useDeleteAllFinance } from '../hooks/finance/useDeleteAllFinance';
import { DeleteAllFinanceAction } from './DeleteAllFinanceAction';

export const FinanceComponent = () => {
  const { loading, financeHistory } = useAppSelector((state) => state.finance);

  const {
    removeAllDialogOpen,
    isRemovingAll,
    handleDeleteAllClick,
    handleDeleteAllDialogClose,
    handleConfirmDeleteAll,
  } = useDeleteAllFinance();

  const {
    newFinance,
    isCreating,
    handleFieldChange,
    handleCreateFinance,
    addDialogOpen,
    handleAddDialogClose,
    handleAddDialogOpen,
  } = useCreateFinance();

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
              isRemovingAll ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                <DeleteForeverIcon />
              )
            }
            onClick={handleDeleteAllClick}
            disabled={financeHistory.length === 0 || loading || isRemovingAll}
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
          <CreateFinanceAction
            handleAddDialogClose={handleAddDialogClose}
            isCreating={isCreating}
            newFinance={newFinance}
            handleCreateFinance={handleCreateFinance}
          />
        }
      />

      <CustomModal
        title='Удалить все записи?'
        dialogOpen={removeAllDialogOpen}
        dialogClose={handleDeleteAllDialogClose}
        action={
          <DeleteAllFinanceAction
            handleDeleteAllDialogClose={handleDeleteAllDialogClose}
            isRemovingAll={isRemovingAll}
            handleConfirmDeleteAll={handleConfirmDeleteAll}
          />
        }
      />
    </Container>
  );
};
