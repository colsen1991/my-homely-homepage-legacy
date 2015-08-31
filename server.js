'use strict';

var express = require('express');
var mongoose = require('mongoose');

var app = express();

var Messages;

app.use('/build', express.static('build'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/messages', function (req, res) {
    Messages.find({}, {_id: 0},  function (err, messages) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        res.send(messages);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('node server listening at http://%s:%s', host, port);

    mongoose.connect('mongodb://localhost:27017/testing');
    var dbConn = mongoose.connection;

    Messages = mongoose.model('message', {message: String});

    dbConn.on('error', console.error.bind(console, 'mongoose error'));
    dbConn.on('disconnected', console.log.bind(console, 'mongoose disconnected'));
    dbConn.on('connected', console.log.bind(console, 'mongoose connected'));
});
