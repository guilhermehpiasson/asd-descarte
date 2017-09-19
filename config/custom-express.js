/*
 * Arquivo: custom-express.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo que carrega o express.
 *              Além disso o mesmo define porta, entre outras configurações.
 * Data: 19/09/2017
 */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');

module.exports = function(){
  var app = express();

  app.set('port', process.env.PORT || 3001);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/json' }));

  app.use(expressValidator());

  consign()
   .include('routes')
   .then('persistencia')
   .then('servicos')
   .then('tarefas')
   .then('filas')
   .into(app);

  return app;
}
