var app = require('./config/custom-express')();
var logger = require('./servicos/logger.js');

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
  logger.info('Express server listening on port ' + app.get('port'));
});
