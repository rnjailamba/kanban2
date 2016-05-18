var exportedApp = require('../exporters/export_app');
var http = require("http");
var server = http.Server(exportedApp.app);
var io = require("socket.io")(server);
// server.listen(2000);
server.listen(3002);


console.log("socket io client created");
io.on('connection', function(socket) {
  console.log('new connection');

  socket.on('add-customer', function(customer) {
    io.emit('notification', {
      message: 'new customer',
      customer: customer
    });
  });
});


var export_socketIO = require('../exporters/export_socketIO.js');
export_socketIO.setSocketIO(io);

var socketAPI = require('./api.js');
