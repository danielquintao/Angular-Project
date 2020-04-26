// back-end inspired from https://developer.okta.com/blog/2019/08/16/angular-mysql-express although we don't use authentication here (and the db is much more complicated in our case)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const route = require('./routes');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'm3lh0r0p0rtun1d4d3',
  database : 'moviereferences'
});

connection.connect();

const app = express()
  .use(cors()) //to link operations in ports 3000 (node) and 4200 (angular) (cross-origin)
  .use(bodyParser.json())
  .use(route(connection)) // middleware for requests to the db

app.listen(3000, () => {
  console.log(`Express server listening on port 3000`);
});