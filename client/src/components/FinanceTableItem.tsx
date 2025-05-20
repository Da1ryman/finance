import {
  TableCell,
  TableRow,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useAppSelector } from '../store/store';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomModal } from '../another/CustomModal';
import { useDeleteFinance } from '../hooks/finance/useDeleteFinance';
import { DeleteFinanceAction } from './DeleteFinanceAction';
import { useChangeFinance } from '../hooks/finance/useChangeFinance';

export const FinanceTableItem = () => {
  const { financeHistory, loading } = useAppSelector((state) => state.finance);

  const {
    editedFields,
    editingId,
    isSaving,
    handleEditClick,
    handleCancelEdit,
    handleSaveChanges,
    handleFieldChange,
  } = useChangeFinance();

  const {
    removeDialogOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleDeleteDialogClose,
  } = useDeleteFinance();

  return (
    <>
      {financeHistory.map((finance) => (
        <TableRow key={finance._id}>
          <TableCell sx={{ textAlign: 'center' }}>
            {editingId === finance._id ? (
              <TextField
                value={editedFields.type || finance.type}
                onChange={(e) => handleFieldChange('type', e.target.value)}
                size='small'
                fullWidth
                disabled={isSaving}
              />
            ) : (
              finance.type
            )}
          </TableCell>

          <TableCell sx={{ textAlign: 'center' }}>
            {editingId === finance._id ? (
              <TextField
                value={editedFields.category || finance.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                size='small'
                fullWidth
                disabled={isSaving}
              />
            ) : (
              finance.category
            )}
          </TableCell>

          <TableCell sx={{ textAlign: 'center' }}>
            {editingId === finance._id ? (
              <TextField
                value={editedFields.description || finance.description}
                onChange={(e) =>
                  handleFieldChange('description', e.target.value)
                }
                size='small'
                fullWidth
                disabled={isSaving}
              />
            ) : (
              finance.description
            )}
          </TableCell>

          <TableCell sx={{ textAlign: 'center' }}>
            {editingId === finance._id ? (
              <TextField
                value={editedFields.amount ?? finance.amount}
                onChange={(e) => handleFieldChange('amount', e.target.value)}
                size='small'
                type='number'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>₽</InputAdornment>
                  ),
                }}
                disabled={isSaving}
              />
            ) : (
              `${finance.amount} ₽`
            )}
          </TableCell>

          <TableCell sx={{ textAlign: 'center' }}>
            {new Date(finance.updatedAt).toLocaleString()}
          </TableCell>

          <TableCell sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              {editingId === finance._id ? (
                <>
                  <IconButton
                    color='success'
                    onClick={() => handleSaveChanges(finance)}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <CircularProgress size={24} color='inherit' />
                    ) : (
                      <CheckIcon />
                    )}
                  </IconButton>

                  <IconButton
                    color='error'
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    color='primary'
                    onClick={() => handleEditClick(finance)}
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color='error'
                    onClick={() => handleDeleteClick(finance._id)}
                    disabled={loading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </TableCell>
        </TableRow>
      ))}

      <CustomModal
        dialogClose={handleDeleteDialogClose}
        dialogOpen={removeDialogOpen}
        action={
          <DeleteFinanceAction
            handleDeleteDialogClose={handleDeleteDialogClose}
            handleConfirmDelete={handleConfirmDelete}
          />
        }
        title='Удалить эту запись?'
      />
    </>
  );
};
