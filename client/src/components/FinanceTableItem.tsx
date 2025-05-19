import {
  TableCell,
  TableRow,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/store';
import { useState } from 'react';
import type { Finance } from '../types/finance';
import { fetchFinanceChange } from '../store/finance/action';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogDelete } from './DialogDelete';

export const FinanceTableItem = () => {
  const { financeHistory, loading } = useAppSelector((state) => state.finance);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedFields, setEditedFields] = useState<Partial<Finance>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleEditClick = (item: Finance) => {
    setEditingId(item._id);
    setEditedFields({
      type: item.type,
      category: item.category,
      description: item.description,
      amount: item.amount,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedFields({});
  };

  const handleSaveChanges = async (originalItem: Finance) => {
    if (!editingId || Object.keys(editedFields).length === 0) return;

    try {
      setIsSaving(true);
      const updatedItem = {
        ...originalItem,
        ...editedFields,
      };
      await dispatch(fetchFinanceChange(updatedItem)).unwrap();
      setEditingId(null);
      setEditedFields({});
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (field: keyof Finance, value: string | number) => {
    setEditedFields((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) : value,
    }));
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

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

      <DialogDelete
        setDeleteDialogOpen={setDeleteDialogOpen}
        setItemToDelete={setItemToDelete}
        deleteDialogOpen={deleteDialogOpen}
        itemToDelete={itemToDelete}
      />
    </>
  );
};
