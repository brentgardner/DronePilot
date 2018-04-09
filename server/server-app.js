const express = require('express');
var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var path = require("path");
var fs = require('fs');


var drone = require('./app');

var dir = path.join(__dirname+'/../public/');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};


server.listen(3005, function () {
  console.log('Listening on http://localhost:3005/');
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/../public/index.html'));
// });

app.get('*', function (req, res) {
  var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
  
  var type = mime[path.extname(file).slice(1)] || 'text/plain';
  var s = fs.createReadStream(file);
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
});

io.on('connection', (socket) => {

  socket.emit('logging', 'connected...');

  socket.on('takeoff', () => {
    console.log('takeoff');

    drone.takeoff()
      .then(function() {
        console.log('did take off!');
        socket.emit('logging', 'did take off');
      });

  });

  socket.on('land', () => {

    drone.land()
      .then(function() {
        console.log('did land!');
        socket.emit('logging', 'did land');
      });

  });

  socket.on('move', (direction) => {

    drone.move({ direction })
      .then(function() {
        console.log('done moving', direction);
        socket.emit('logging', 'move', direction);
      });

  });

  socket.on('turn', (direction) => {
    console.log('turn', direction);

    drone.turn({ direction })
      .then(function() {
        console.log('done rotating', direction);
        socket.emit('logging', 'turn', direction);
      })


  });

  socket.on('up', (direction) => {
    drone.move('up', direction)
      .then(function() {
        console.log('moved ', direction);
      })

  });

  socket.on('down', (direction) => {
    drone.move('down', direction)
      .then(function() {
        console.log('moved ', direction);
      })
  });

  socket.on('frontflip', () => {
    drone.frontflip()
      .then(function() {
        console.log('front flip');
      })
  });

  socket.on('emergency', () => {
    drone.emergency()
      .then(function() {
        console.log('emergency');
      })
  });


});
