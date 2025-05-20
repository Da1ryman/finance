import { useState } from 'react';
import type { Finance } from '../../types/finance';
import { fetchFinanceChange } from '../../store/finance/action';
import { useAppDispatch } from '../../store/store';

export const useChangeFinance = () => {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedFields, setEditedFields] = useState<Partial<Finance>>({});
  const [isSaving, setIsSaving] = useState(false);

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

  return {
    editedFields,
    editingId,
    isSaving,
    handleEditClick,
    handleCancelEdit,
    handleSaveChanges,
    handleFieldChange,
  };
};
