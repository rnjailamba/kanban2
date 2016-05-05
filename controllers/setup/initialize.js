var exportedApp = require('../../helpers/exporters/export_app');
var index = require('../index.js');
var blog = require('../blog.js');
var users = require('../users.js');

exportedApp.app.use('/', index.router);
exportedApp.app.use('/blog', blog.router);
exportedApp.app.use('/users', users.router);

