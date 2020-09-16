require("./config/config");
const mysqlCon = require("../mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/servicio", (req, res) => {
  let query = req.query;
  let { cc_tecnico, semana } = query;

  mysqlCon.connection.query(
    `SELECT HA.HORA_INICIO, HA.HORA_FIN, D.DIA_SEMANA, S.NUMERO_SEMANA, TS.ID_TECNICO
  FROM 
  HORA_ATENCION HA 
  LEFT JOIN DIA D ON HA.ID_HORA_ATENCION = D.ID_DIA
  LEFT JOIN SEMANA S ON D.ID_DIA = S.ID_SEMANA
  LEFT JOIN TECNICO_SERVICIO TS ON S.ID_SEMANA = TS.ID_SEMANA
  WHERE ID_TECNICO = ${cc_tecnico} AND NUMERO_SEMANA = ${semana};`,
    (err, results) => {
      if (err) throw err;
      data = results;
      res.json({
        ok: true,
        data,
      });
    }
  );
});

app.post("/reporte-servicio", (req, res, next) => {
  let query = req.query;
  let { fechaFin, fechaInicio, servicio, tecnico } = query;
  let diaSemana = moment(fechaInicio).day();
  let numeroSemana = moment(fechaInicio).format("w");
  let body = {
    fechaInicio,
    fechaFin,
    servicio,
    tecnico,
    diaSemana,
    numeroSemana,
  };
  let errorMessage;

  mysqlCon.connection.query(
    `INSERT INTO SERVICIO SET ID_TIPO_SERVICIO = ${servicio};`,
    (err, result) => {
      if (err) {
        errorMessage = err;
        res.status(400).json({
          message: err,
        });
        next();
      }
    }
  );
  mysqlCon.connection.query(
    `INSERT INTO SEMANA SET NUMERO_SEMANA = ${numeroSemana};`,
    (err, result) => {
      if (err) {
        errorMessage = err;
        res.status(400).json({
          message: err,
        });
        next();
      }
    }
  );
  mysqlCon.connection.query(
    `INSERT INTO DIA SET DIA_SEMANA = ${diaSemana};`,
    (err, result) => {
      if (err) {
        errorMessage = err;
        res.status(400).json({
          message: err,
        });
        next();
      }
    }
  );
  mysqlCon.connection.query(
    `INSERT INTO HORA_ATENCION SET HORA_INICIO = '${fechaInicio}', HORA_FIN = '${fechaFin}';`,
    (err, result) => {
      if (err) {
        errorMessage = err;
        res.status(400).json({
          message: err,
        });
        next();
      }
    }
  );
  mysqlCon.connection.query(
    `INSERT INTO TECNICO_SERVICIO SET ID_TECNICO = ${tecnico}, ID_SERVICIO = (SELECT MAX(ID_SERVICIO)  FROM SERVICIO), ID_SEMANA = (SELECT MAX(ID_SEMANA)  FROM SEMANA)`,
    (err, result) => {
      if (err) {
        errorMessage = err;
        res.status(400).json({
          message: err,
        });
        next();
      }
    }
  );
  console.log(body);
  console.log(errorMessage);

  res.json({
    body,
    status: 200,
    ok: true,
  });

  // res.status(400).send({
  //   status: 400,
  //   message: "Error al intentar insertar en la base de datos",
  // });
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
