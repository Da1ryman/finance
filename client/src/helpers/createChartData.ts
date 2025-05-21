import { getRandomColor } from './getRandomColor';

export const createChartData = (map: Map<string, number>) => {
  const labels = Array.from(map.keys());
  const data = Array.from(map.values());
  const colors = labels.map(() => getRandomColor());

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };
};
