var mongoose = require('mongoose');

module.exports = function configuration(app) {

	var server_port = process.env.PORT || 5000;

	var connection_string = process.env.DATABASE || 'mongodb://localhost/examsSchedule';
	mongoose.connect(connection_string);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('we\'re connected!');
	});

	app.set('port', server_port);
}