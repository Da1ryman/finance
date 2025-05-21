import { Container, Paper } from '@mui/material';
import { CustomChart } from '../ui/CustomChart';
import { useChartFinance } from '../hooks/finance/useChartFinance';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { fetchFinanceHistory } from '../store/finance/action';

export const ChartComponent = () => {
  const { expensesChartData, incomeChartData } = useChartFinance();
  const authInfo = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authInfo?.id) {
      dispatch(fetchFinanceHistory());
    }
  }, [authInfo, dispatch]);

  return (
    <Container sx={{ mt: 10 }}>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: '650px',
        }}
      >
        <CustomChart
          labels={expensesChartData.labels}
          datasets={expensesChartData.datasets}
          title='Расходы'
        />

        <CustomChart
          labels={incomeChartData.labels}
          datasets={incomeChartData.datasets}
          title='Доходы'
        />
      </Paper>
    </Container>
  );
};
