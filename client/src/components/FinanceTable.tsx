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

  const titles = [
    'Тип',
    'Категория',
    'Описание',
    'Сумма',
    'Дата записи/обновления',
    'Изменить',
  ];

  useEffect(() => {
    if (authInfo?.id) {
      dispatch(fetchFinanceHistory());
    }
  }, [authInfo, dispatch]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {titles.map((title) => (
            <TableCell sx={{ textAlign: 'center' }}>{title}</TableCell>
          ))}
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
