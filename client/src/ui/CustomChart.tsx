import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
  label?: string;
  data: number[];
  backgroundColor: string[];
}

interface ChartProps {
  labels: string[];
  datasets: Data[];
  title: string;
}

export const CustomChart = ({ labels, datasets, title }: ChartProps) => {
  const data = {
    labels,
    datasets,
  };

  return (
    <Box>
      <Typography textAlign='center' variant='h3'>
        {title}
      </Typography>
      <Pie data={data} />
    </Box>
  );
};
