// to be fair, the back-end node.js script was inspired from Node + mysql template on web
// but I know what I am doing ;)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const route = require('./routes');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'm3lh0r0p0rtun1d4d3',
  database : 'moviereferences',
  multipleStatements: true
});

connection.connect();

const app = express()
  .use(cors()) //to link operations in ports 3000 (node) and 4200 (angular) (cross-origin)
  .use(bodyParser.json())
  .use(route(connection)) // middleware for requests to the db

app.listen(3000, () => {
  console.log(`Express server listening on port 3000`);
});