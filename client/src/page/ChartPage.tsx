import { Typography } from '@mui/material';
import { SidePanelLayout } from '../layout/sidepanellayout/SidePanelLayout';
import PieChartIcon from '@mui/icons-material/PieChart';
import { ChartComponent } from '../components/ChartComponent';

export const ChartPage = () => {
  return (
    <SidePanelLayout>
      <Typography variant='h2' component='h1' sx={{ mt: '100px', ml: '100px' }}>
        <PieChartIcon sx={{ fontSize: '50px' }} /> Диаграммы
      </Typography>

      <ChartComponent />
    </SidePanelLayout>
  );
};
