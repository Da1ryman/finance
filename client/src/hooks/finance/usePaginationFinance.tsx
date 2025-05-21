import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchFinanceHistory } from '../../store/finance/action';

export const usePaginationFinance = () => {
  const { loading, financeHistory } = useAppSelector((state) => state.finance);
  const authInfo = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - financeHistory.length)
      : 0;

  return {
    financeHistory,
    page,
    rowsPerPage,
    loading,
    titles,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
  };
};
