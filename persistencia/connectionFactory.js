var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'mysql.liveb.com.br',
			user: 'liveb0101_add1',
			password: 'pucpoc2017',
			database: 'liveb01'
		});
}

module.exports = function() {
	return createDBConnection;
}
