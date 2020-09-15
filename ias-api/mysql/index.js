const mysql = require("mysql");
const config = require("./config");

class DataBase {
  constructor() {
    this.connection = mysql.createConnection(config);
  }
}

module.exports = new DataBase();
