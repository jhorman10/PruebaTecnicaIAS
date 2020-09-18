const moment = require("moment");
const mysqlCon = require("../mysql");

class Utils {
  constructor() {}
  CalcularHoraInicio(fechaInicio) {
    return moment(fechaInicio).format("HH");
  }

  CalcularHoraFin(fechaFin) {
    return moment(fechaFin).format("HH");
  }

  calcularDiaDelaSemana(fechaInicio) {
    return moment(fechaInicio).format("w");
  }

  calcularNombreDiaDelaSemana(fechaInicio) {
      return moment(fechaInicio).format("dddd");
  }

  calcularSemanaDelAnio(fechaInicio) {
    return moment(fechaInicio).format("w");
  }

  calcularHorasTrabajadasPorSemana(tecnico, semana) {
    return new Promise((resolve, reject) => {
      mysqlCon.connection.query(
        `SELECT SUM(HA.TOTAL_HORAS) AS TOTAL_HORAS -- , S.NUMERO_SEMANA, TS.ID_TECNICO
         FROM 
         HORA_ATENCION HA 
         LEFT JOIN DIA D ON HA.ID_HORA_ATENCION = D.ID_DIA
         LEFT JOIN SEMANA S ON D.ID_DIA = S.ID_SEMANA
         LEFT JOIN TECNICO_SERVICIO TS ON S.ID_SEMANA = TS.ID_SEMANA
         WHERE ID_TECNICO = ${tecnico} AND NUMERO_SEMANA = ${semana};`,
        (err, rows, fields) => {
          if (err) {
            reject(err);
          } else {
            const [info] = rows;
            const { TOTAL_HORAS } = info;
            return resolve(TOTAL_HORAS);
          }
        }
      );
    });
  }

  consultarHorasPorSemana(tecnico, semana) {
    let total = value;
    return total;
  }

  calcularHorasTrabajadasPorDia(fechaInicio, fechaFin) {
    let horaInicio = moment(fechaInicio).format("HH");
    let horaFin = moment(fechaFin).format("HH");
    return horaFin - horaInicio;
  }
  calcularHorasNocturnas(fechaInicio, fechaFin) {
    let horaFin = moment(fechaFin).format("HH");
    let totalHorasNocturna = 0;
    let horaNocturnaInicio = 20;
    let horaNocturnaFin = 7;

    if (horaFin > horaNocturnaInicio) {
      return horaFin - horaNocturnaInicio;
    } else if (horaFin < horaNocturnaFin) {
      return horaFin + 4;
    } else {
      return totalHorasNocturna;
    }
  }

  calcularHoraExtra(fechaFin) {
    let horaFin = moment(fechaFin).format("HH");
    let totalHorasExtra = 0;
    let horaExtra = 20;
    if (horaFin > horaExtra) {
      return horaFin - horaExtra;
    } else {
      return totalHorasExtra;
    }
  }
}

module.exports = new Utils();
