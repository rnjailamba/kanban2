var exportedApp = require('../exporters/export_app');
var http = require("http");
var server = http.createServer(exportedApp.app);
var io = require("socket.io")(server);
server.listen(2000);

console.log("socket io client created");
// io.on('connection', function(socket){
//   console.log('a user connected original');
// });

var export_socketIO = require('../exporters/export_socketIO.js');
export_socketIO.setSocketIO(io);

var socketAPI = require('./api.js');