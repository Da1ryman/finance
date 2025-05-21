import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { FinanceTableItem } from './FinanceTableItem';
import { usePaginationFinance } from '../hooks/finance/usePaginationFinance';

export const FinanceTable = () => {
  const {
    loading,
    titles,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    page,
    financeHistory,
    rowsPerPage,
  } = usePaginationFinance();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {titles.map((title) => (
            <TableCell sx={{ textAlign: 'center' }}>{title}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} align='center'>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : (
          <>
            {financeHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((finance) => (
                <FinanceTableItem key={finance._id} finance={finance} />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </>
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={6}
            count={financeHistory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Записей на странице:'
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};
