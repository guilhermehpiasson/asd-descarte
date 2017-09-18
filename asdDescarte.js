var app = require('./config/custom-express')();

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
