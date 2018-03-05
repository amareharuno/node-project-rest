let express = require('express');
let router = express.Router();
let connection = require('../connection');

router.get('/', function (req, res) {
    connection.query('select * from teacher', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:id', function (req, res) {
    let params = [req.params.id];
    connection.query(
        'select * from teacher where id=?', params,

        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        });
});

//rest api to create a new customer record into mysql database
router.post('/', (req, res) => {
    let params = req.body;
    console.log(params);
    connection.query(
        'INSERT INTO teacher SET ?', params,

        (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
});

//rest api to update record into mysql database
router.put('/', (req, res) => {
    let params = [req.body.Name, req.body.name, req.body.startDate, req.body.endDate, req.body.id];
    connection.query(
        'UPDATE `teacher` SET `name`=?,`startDate`=?,`endDate`=?,`teacherId`=? where `id`=?', params,

        (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
});

//rest api to delete record from mysql database
router.delete('/:id', (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `teacher` WHERE `id`=?', [req.params.id],

        (error, results, fields) => {
            if (error) throw error;
            res.end('Record has been deleted!');
        });
});

module.exports = router;