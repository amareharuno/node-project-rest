let express = require('express');
let router = express.Router();
let connection = require('../connection');

router.get('/', function (req, res) {
    connection.query('select * from student', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:id', function (req, res) {
    connection.query('select * from student where id=?', [req.params.id], (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:id/courses', function (req, res) {
    connection.query('select course.id, course.name, course.startDate, course.endDate ' +
        'from course inner join student_has_course s on s.courseId = course.id where s.studentId=?',
        [req.params.id], (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        });
});

//rest api to create a new customer record into mysql database
router.post('/', (req, res) => {
    let params = req.body;
    console.log(params);
    connection.query('INSERT INTO student SET ?', params, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

router.put('/:id', function (req, res) {
    let query = 'UPDATE `student` SET ? where `id`=' + req.params.id;
    connection.query(query, req.body, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

//rest api to delete record from mysql database
router.delete('/:id', (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `student_has_course` WHERE `studentId`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record1 has been deleted!');
    });
    connection.query('DELETE FROM `student` WHERE `id`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record2 has been deleted!');
    });
});

module.exports = router;