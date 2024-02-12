const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root123",
    database: "employees_db",
  },
  console.log(`Connected to the employee database.`)
);

module.exports = db;
