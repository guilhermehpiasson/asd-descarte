/*
 * Arquivo: clienteProdutosParaDescarte.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com implementação de um Client REST, que consome uma operação do modulo asdEstoque.
 * Data: 19/09/2017
 */
var restify = require('restify');
var clients = require('restify-clients');

function ProdutosParaDescarteClient(){
  this._cliente = clients.createJsonClient({
    url:'https://asd-estoque.herokuapp.com'
  });
}

ProdutosParaDescarteClient.prototype.consulta = function(callback){
  this._cliente.post('/estoque/listaProdutosParaDescarte', callback);
}

module.exports = function(){
  return ProdutosParaDescarteClient;
}
