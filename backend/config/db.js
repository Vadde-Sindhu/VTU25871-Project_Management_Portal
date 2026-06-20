const mysql = require("mysql2");

const db = mysql.createConnection({
 host:"localhost",
 user:"root",
 password:"your_password",
 database:"project_management"
});

module.exports = db;