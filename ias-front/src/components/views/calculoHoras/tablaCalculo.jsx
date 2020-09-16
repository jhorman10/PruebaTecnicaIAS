import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// const TableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TablaCalculo(props) {
  const { data } = props;
  const classes = useStyles;
  return (
    <>
      {data.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Semana</TableCell>
                <TableCell align="center">Día</TableCell>
                <TableCell align="center">Hora de inicio</TableCell>
                <TableCell align="center">Hora de fin</TableCell>
                <TableCell align="center">Total horas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.name}>
                  <TableCell align="center">
                    {data.NUMERO_SEMANA}
                  </TableCell>
                  <TableCell align="center">
                    {data.DIA_SEMANA}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_INICIO}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_FIN}
                  </TableCell>
                  <TableCell align="center">
                    {data.TOTAL_HORAS}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
}

export default TablaCalculo;
