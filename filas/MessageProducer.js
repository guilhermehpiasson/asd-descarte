var Stomp = require('stomp-client');

function MessageProducer(){
};

MessageProducer.prototype.enviaSolicitacaoDescarte = function(destination, endereco, porta, user, senha, msg){

  var client = new Stomp(endereco, porta, user, senha);

  client.connect(function(sessionId) {
      client.publish(destination, msg);
  });
};

module.exports = function(){
  return MessageProducer;
};
