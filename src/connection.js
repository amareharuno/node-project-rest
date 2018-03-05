let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',          //mysql database host name
    user: 'root',               //mysql database user name
    password: 'SQL174',         //mysql database password
    database: 'ng-courses'  //mysql database name
});

connection.connect((err) => {
    if (err) throw err;
    console.log('You are now connected with mysql database...')
});

module.exports = connection;