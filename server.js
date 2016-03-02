var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var usersFile = __dirname + "/" + "users.json";


app.use(bodyParser());


app.get('/', function (req, res) {
    fs.readFile( __dirname + "/" + "index.html", 'utf8', function (err, data) {
        res.end( data );
    });
});

app.get('/listUsers', function (req, res) {
    fs.readFile( usersFile, 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});

app.post('/addUser', function (req, res) {
    fs.readFile( usersFile, 'utf8', function (err, data) {
        data = JSON.parse( data );
        //data = data.concat([req.body.name]);
        data.push(req.body.name);
        fs.writeFile(usersFile, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log( data );
            res.end( JSON.stringify(data));
        });
    });
});

app.delete('/deleteUser/:number', function (req, res) {
    fs.readFile( usersFile, 'utf8', function (err, data) {
        data = JSON.parse( data );
        data.splice(parseInt(req.params.number) - 1, 1);
        fs.writeFile(usersFile, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log( data );
            res.end( JSON.stringify(data));
        });
    });
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
    console.log("or http://127.0.0.1:8081/");

});