var restify = require('restify');
var clients = require('restify-clients');

function ProdutosParaDescarteClient(){
  this._cliente = clients.createJsonClient({
    url:'http://localhost:3002'
  });
}

ProdutosParaDescarteClient.prototype.consulta = function(callback){
  this._cliente.post('/estoque/listaProdutosParaDescarte', callback);
}

module.exports = function(){
  return ProdutosParaDescarteClient;
}
