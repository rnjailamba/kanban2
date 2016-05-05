var io = require('../exporters/export_socketIO').io;

io.on('connection', function (socket) {
	console.log("connected");
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});


