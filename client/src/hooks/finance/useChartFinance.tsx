import { useAppSelector } from '../../store/store';

export const useChartFinance = () => {
  const financeHistory = useAppSelector(
    (state) => state.finance.financeHistory,
  );

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const expensesMap = new Map<string, number>();
  const incomeMap = new Map<string, number>();

  financeHistory.forEach((item) => {
    const currentMap = item.type === 'Расходы' ? expensesMap : incomeMap;
    const currentAmount = currentMap.get(item.category) || 0;
    currentMap.set(item.category, currentAmount + item.amount);
  });

  const expensesLabels = Array.from(expensesMap.keys());
  const expensesData = Array.from(expensesMap.values());
  const expensesColors = expensesLabels.map(() => getRandomColor());

  const incomeLabels = Array.from(incomeMap.keys());
  const incomeData = Array.from(incomeMap.values());
  const incomeColors = incomeLabels.map(() => getRandomColor());

  const expensesChartData = {
    labels: expensesLabels,
    datasets: [
      {
        data: expensesData,
        backgroundColor: expensesColors,
        borderWidth: 0,
      },
    ],
  };

  const incomeChartData = {
    labels: incomeLabels,
    datasets: [
      {
        data: incomeData,
        backgroundColor: incomeColors,
        borderWidth: 0,
      },
    ],
  };

  return {
    expensesChartData,
    incomeChartData,
  };
};
