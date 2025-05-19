import { InputAdornment, TextField } from '@mui/material';

import type { FinanceRequest } from '../types/finance';
import type { FinanceRequestWithoutUserId } from '../hooks/finance/useCreateFinance';

export const CreateFinance = ({
  isPending,
  handleFieldChange,
  newFinance,
}: {
  isPending: boolean;
  handleFieldChange: (
    field: keyof FinanceRequest,
    value: string | number,
  ) => void;
  newFinance: FinanceRequestWithoutUserId;
}) => {
  return (
    <form>
      <TextField
        label='Тип'
        value={newFinance.type || ''}
        onChange={(e) => handleFieldChange('type', e.target.value)}
        size='small'
        fullWidth
        margin='normal'
        disabled={isPending}
        required
      />

      <TextField
        label='Категория'
        value={newFinance.category || ''}
        onChange={(e) => handleFieldChange('category', e.target.value)}
        size='small'
        fullWidth
        margin='normal'
        disabled={isPending}
        required
      />

      <TextField
        label='Описание'
        value={newFinance.description || ''}
        onChange={(e) => handleFieldChange('description', e.target.value)}
        size='small'
        fullWidth
        margin='normal'
        disabled={isPending}
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
        disabled={isPending}
        required
      />
    </form>
  );
};
