let express = require('express');
let router = express.Router();
let connection = require('../connection');

router.get('/', function (req, res) {
    connection.query('select * from course', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:id', function (req, res) {
    connection.query('select * from course where id=?', [req.params.id], (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

//rest api to create a new customer record into mysql database
router.post('/', (req, res) => {
    let params = req.body;
    console.log(params);
    connection.query('INSERT INTO course SET ?', params, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to update record into mysql database
router.put('/', (req, res) => {
    connection
        .query(
            'UPDATE `staff` SET `Name`=?,`course`=?,`Country`=?,`Phone`=? where `Id`=?',
            [req.body.Name, req.body.course, req.body.Country, req.body.Phone, req.body.Id],

            (error, results, fields) => {
                if (error) throw error;
                res.end(JSON.stringify(results));
            }
        );
});

//rest api to delete record from mysql database
router.delete('/:id', (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `course` WHERE `id`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});

module.exports = router;