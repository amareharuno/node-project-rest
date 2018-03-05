let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
// let favicon = require('serve-favicon');
let cors = require('cors');

let index = require('./routes/index');
let courses = require('./routes/courses');
let students = require('./routes/students');
let teachers = require('./routes/teachers');

let app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors({credentials: true, origin: true})); //enable cors

let server = app.listen(3000, "127.0.0.1", function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use('/', index);
app.use('/courses', courses);
app.use('/students', students);
app.use('/teachers', teachers);

module.exports = app;
