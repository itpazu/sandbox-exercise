import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  colors,
  TablePagination,
} from '@mui/material';
import BoxItem from '../theme/BoxItem';
import Row from './tableRow';

export default function CollapsibleTable(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (!state?.rows) navigate('/');
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      {!!state?.rows && (
        <>
          <BoxItem topPosition={'60vh'} leftPosition={'50%'} width={'80vw'}>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: '70vh', overflow: 'fit-content' }}
            >
              <Table aria-label='collapsible table'>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: colors.blue[300],
                    }}
                  >
                    <TableCell />
                    <TableCell sx={{ fontSize: '1rem' }}>Engine Name</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }} align='center'>
                      Scan Result
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <Row key={row.engine_name} row={row} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component='div'
              count={state.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </BoxItem>
        </>
      )}
    </>
  );
}
