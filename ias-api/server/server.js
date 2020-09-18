require("./config/config");
const mysqlCon = require("../mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const utils = require("../utils");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/servicio", (req, res) => {
  let query = req.query;
  let { cc_tecnico, semana } = query;

  mysqlCon.connection.query(
    `SELECT TS.ID_TECNICO, S.NUMERO_SEMANA, SUM(HA.HORA_EXTRA) as HORA_EXTRA, SUM(HA.HORA_SABATINA) as HORA_SABATINA, 
    SUM(HA.HORA_DOMINICAL) as HORA_DOMINICAL, SUM(HA.HORA_EXTRA_NOCTURNA) as HORA_EXTRA_NOCTURNA, 
    SUM(HA.HORA_EXTRA_SABATINA) as HORA_EXTRA_SABATINA, SUM(HA.TOTAL_HORAS) as TOTAL_HORAS
    FROM 
    HORA_ATENCION HA 
    INNER JOIN DIA D ON HA.ID_HORA_ATENCION = D.ID_DIA
    INNER JOIN SEMANA S ON D.ID_DIA = S.ID_SEMANA
    INNER JOIN TECNICO_SERVICIO TS ON S.ID_SEMANA = TS.ID_SEMANA
    WHERE ID_TECNICO = ${cc_tecnico} AND NUMERO_SEMANA = ${semana};`,
    (err, results) => {
      if (err) throw err;
      let data = results;
      res.json({
        data,
        ok: true,
        status: 200,
      });
    }
  );
});

app.post("/reporte-servicio", async (req, res, next) => {
  let query = req.query;
  let { fechaFin, fechaInicio, servicio, tecnico } = query;
  let diaSemana = utils.calcularDiaDelaSemana(fechaInicio);
  let nombreDia = utils.calcularNombreDiaDelaSemana(fechaInicio);
  let numeroSemana = utils.calcularSemanaDelAnio(fechaInicio);
  let horaFin = utils.CalcularHoraFin(fechaFin);
  let totalHoras = utils.calcularHorasTrabajadasPorDia(fechaInicio, fechaFin);
  let horasPorSemana = await utils
    .calcularHorasTrabajadasPorSemana(tecnico, numeroSemana)
    .then((hora) => {
      return hora;
    })
    .catch((err) => console.log(err));

  console.log("horasPorSemana :", horasPorSemana);

  let horaDominical;
  let horaNocturna;
  let horaSabatina;
  let horaExtra;
  let horaExtraNocturna;
  let horaExtraSabatina;
  let horaExtraDominical;

  if (nombreDia == "Saturday") {
    horaSabatina = utils.calcularHorasTrabajadasPorDia(fechaInicio, fechaFin);
  } else if (nombreDia == "Sunday") {
    horaDominical = utils.calcularHorasTrabajadasPorDia(fechaInicio, fechaFin);
  }

  if (horasPorSemana > 48) {
    if (nombreDia == "Saturday") {
      horaExtraSabatina = utils.calcularHoraExtra(fechaFin);
    } else if (nombreDia == "Sunday") {
      horaExtraDominical = utils.calcularHoraExtra(fechaFin);
    } else if (horaFin > 20) {
      horaExtraNocturna = utils.calcularHoraExtra(fechaFin);
    }
    horaExtra = utils.calcularHoraExtra(fechaFin);
  }

  let body = {
    fechaInicio,
    fechaFin,
    servicio,
    tecnico,
    diaSemana,
    horasPorSemana,
  };

  mysqlCon.connection.beginTransaction((err) => {
    if (err) throw err;
    mysqlCon.connection.query(
      `INSERT INTO SERVICIO (ID_TIPO_SERVICIO) VALUES
      (${servicio});`,
      (err, results) => {
        if (err) throw err;
        mysqlCon.connection.query(
          `INSERT INTO SEMANA (NUMERO_SEMANA) VALUES 
          (${numeroSemana});`,
          (err, results) => {
            if (err) throw err;
            mysqlCon.connection.query(
              `INSERT INTO DIA (DIA_SEMANA) VALUES
              (${diaSemana});`,
              (err, results) => {
                if (err) throw err;
                mysqlCon.connection.query(
                  `INSERT INTO HORA_ATENCION 
                  (HORA_INICIO, HORA_FIN,HORA_NOCTURNA,HORA_SABATINA,HORA_DOMINICAL,HORA_EXTRA,HORA_EXTRA_NOCTURNA,HORA_EXTRA_SABATINA,HORA_EXTRA_DOMINICAL,TOTAL_HORAS) 
                  VALUES
                  ('${fechaInicio}','${fechaFin}',${horaNocturna || 0},${
                    horaSabatina || 0
                  },${horaDominical || 0},
                  ${horaExtra || 0},${horaExtraNocturna || 0},${
                    horaExtraSabatina || 0
                  },${horaExtraDominical || 0},${totalHoras});`,
                  (err, results) => {
                    if (err) throw err;
                    mysqlCon.connection.query(
                      `INSERT INTO TECNICO_SERVICIO (ID_TECNICO, ID_SERVICIO, ID_SEMANA) VALUES
                      (${tecnico},
                      (SELECT MAX(ID_SERVICIO)  FROM SERVICIO),
                      (SELECT MAX(ID_SEMANA)  FROM SEMANA)
                      );`,
                      (err, results) => {
                        if (err) throw err;
                        res.json({
                          data: body,
                          ok: true,
                          status: 200,
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listen port: ", process.env.PORT);
  mysqlCon.connection.connect((error) => {
    if (error) {
      console.log("Hubo un error", error);
    } else {
      console.log("Conectado a la base de datos", mysqlCon.connection.threadId);
    }
  });
});
