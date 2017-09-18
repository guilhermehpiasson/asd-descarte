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
