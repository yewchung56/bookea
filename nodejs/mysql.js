var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'newuser',
  password : 'bookea',
  database : 'bookea'
});
 
connection.connect();
 
connection.query('SELECT * FROM review', function (error, results, fields) {
  if (error) {
    console.log(error)
  };
  console.log(results);
});
 
connection.end();