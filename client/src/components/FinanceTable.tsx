import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { FinanceTableItem } from './FinanceTableItem';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { fetchFinanceHistory } from '../store/finance/action';

export const FinanceTable = () => {
  const loading = useAppSelector((state) => state.finance.loading);
  const authInfo = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authInfo?.id) {
      dispatch(fetchFinanceHistory(authInfo.id));
    }
  }, [authInfo, dispatch]);

  return (
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
          <FinanceTableItem />
        )}
      </TableBody>
    </Table>
  );
};
