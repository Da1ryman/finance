import type { Finance } from '../types/finance';

export const filterDataByType = (financeHistory: Finance[]) => {
  const expensesMap = new Map<string, number>();
  const incomeMap = new Map<string, number>();

  financeHistory.forEach((item) => {
    const currentMap = item.type === 'Расходы' ? expensesMap : incomeMap;
    const currentAmount = currentMap.get(item.category) || 0;
    currentMap.set(item.category, currentAmount + item.amount);
  });

  return { expensesMap, incomeMap };
};
