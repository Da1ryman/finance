import { Typography } from '@mui/material';
import { SidePanelLayout } from '../layout/sidepanellayout/SidePanelLayout';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useAppSelector } from '../store/store';
import { FinanceComponent } from '../components/FinanceComponent';

export const MainPage = () => {
  const financeHistory = useAppSelector(
    (state) => state.finance.financeHistory,
  );

  return (
    <SidePanelLayout>
      <Typography variant='h2' component='h1' sx={{ mt: '100px', ml: '100px' }}>
        <BackupTableIcon sx={{ fontSize: '50px' }} /> Таблица{' '}
        {financeHistory.length}
      </Typography>

      <FinanceComponent />
    </SidePanelLayout>
  );
};
