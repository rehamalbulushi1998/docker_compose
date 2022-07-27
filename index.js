const express = require('express')
const mysql = require('mysql');

const mysqlConfig = {
  host: process.env.mysql_server",
  user: "reham",
  password: "reham12345",
  database: "docker_db"
}


let con = null

const app = express()

// respond with "hello world" when a GET request is made to the homepage

app.get('/dbconnection', function (req, res) {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
    res.send('connected')
  });
})


app.get('/getadmin', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    //retrive admin name from the database
    const sql = `SELECT * FROM admin`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.listen(8000)

console.log("listening on port 8000")

