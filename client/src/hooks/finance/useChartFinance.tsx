import { createChartData } from '../../helpers/createChartData';
import { filterDataByType } from '../../helpers/filterDataByType';
import { useAppSelector } from '../../store/store';

export const useChartFinance = () => {
  const financeHistory = useAppSelector(
    (state) => state.finance.financeHistory,
  );

  const { expensesMap, incomeMap } = filterDataByType(financeHistory);

  const expensesChartData = createChartData(expensesMap);
  const incomeChartData = createChartData(incomeMap);

  return {
    expensesChartData,
    incomeChartData,
  };
};
