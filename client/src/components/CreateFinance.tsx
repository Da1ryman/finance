import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import type { FinanceRequest } from '../types/finance';
import type { FinanceRequestWithoutUserId } from '../hooks/finance/useCraeteFinance';

interface PropsCreate {
  isPending: boolean;
  handleFieldChange: (
    field: keyof FinanceRequest,
    value: string | number,
  ) => void;
  newFinance: FinanceRequestWithoutUserId;
}

export const CreateFinance = ({
  isPending,
  handleFieldChange,
  newFinance,
}: PropsCreate) => {
  return (
    <form>
      <FormControl fullWidth margin='normal' size='small'>
        <InputLabel id='type-select-label'>Тип</InputLabel>

        <Select
          labelId='type-select-label'
          label='Тип'
          value={newFinance.type || ''}
          onChange={(e) => handleFieldChange('type', e.target.value)}
          disabled={isPending}
          required
        >
          <MenuItem value='Доходы'>Доходы</MenuItem>

          <MenuItem value='Расходы'>Расходы</MenuItem>
        </Select>
      </FormControl>

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
