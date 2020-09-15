require("./config/config");
const mysqlCon = require("../mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/servicio", (req, res) => {
  let query = req.query;
  res.json({ query });
  console.log('query :' , query);
});

app.post("/reporte-servicio", (req, res) => {
  let query = req.query;
  res.json({ 
    body: query,
    status: 200,
    ok: true
  });
  console.log('query :' , query);
});

app.listen(process.env.PORT, () => {
  console.log("Listen port: ", process.env.PORT);
});
