import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Tecnico</StyledTableCell>
                <StyledTableCell align="center">Semana</StyledTableCell>
                <StyledTableCell align="center">Día</StyledTableCell>
                <StyledTableCell align="center">Hora de inicio</StyledTableCell>
                <StyledTableCell align="center">Hora de fin</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <StyledTableRow key={data.name}>
                  <StyledTableCell align="center">
                    {data.ID_TECNICO}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.NUMERO_SEMANA}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.DIA_SEMANA}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.HORA_INICIO}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.HORA_FIN}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
}

export default TablaCalculo;
