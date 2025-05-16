import { Typography } from '@mui/material';
import { SidePanelLayout } from '../layout/SidePanelLayout';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useAppSelector } from '../store/store';
import { TableFinance } from '../components/TableFinance';

export const MainPage = () => {
  const { financeHistory } = useAppSelector((state) => state.finance);

  return (
    <SidePanelLayout>
      <>
        <Typography
          variant='h2'
          component='h1'
          sx={{ mt: '100px', ml: '100px' }}
        >
          {' '}
          <BackupTableIcon sx={{ fontSize: '50px' }} /> Таблица{' '}
          {financeHistory.length}
        </Typography>

        <TableFinance />
      </>
    </SidePanelLayout>
  );
};
