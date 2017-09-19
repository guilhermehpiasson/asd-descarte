/*
 * Arquivo: connectionFactory.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com a implementação de uma fabrica de conexões, a qual encapsula parte da complexidade
 *							dos trechos que necessitam de acesso ao datasource.
 * Data: 19/09/2017
 */
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
