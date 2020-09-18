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
                <TableCell align="center">TECNICO</TableCell>
                <TableCell align="center">SEMANA</TableCell>
                <TableCell align="center">HORAs EXTRA</TableCell>
                <TableCell align="center">HORAs SABATINAS</TableCell>
                <TableCell align="center">HORAs DOMINICALES</TableCell>
                <TableCell align="center">HORAs EXTRA NOCTURNAS</TableCell>
                <TableCell align="center">HORAs EXTRA SABATINAS</TableCell>
                <TableCell align="center">TOTAL HORAS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.ID_TECNICO}>
                <TableCell align="center">
                    {data.ID_TECNICO}
                  </TableCell>
                  <TableCell align="center">
                    {data.NUMERO_SEMANA}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_EXTRA}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_SABATINA}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_DOMINICAL}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_EXTRA_NOCTURNA}
                  </TableCell>
                  <TableCell align="center">
                    {data.HORA_EXTRA_SABATINA}
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
