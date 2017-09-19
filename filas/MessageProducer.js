/*
 * Arquivo: MessageProducer.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com a implementação do mecanismo de postagem de mensagens em fila MQ SQS da AWS.
 *							Nesse arquivo estão setadas as credenciais de acesso.
 * Data: 19/09/2017
 */
var logger = require('../servicos/logger.js');
var aws = require('aws-sdk');
var sqs = new aws.SQS({"accessKeyId":"AKIAJPVYUA3GT5OZFJCA", "secretAccessKey": "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", "region": "sa-east-1"});

function MessageProducer(){
};

MessageProducer.prototype.enviaSolicitacaoDescarte = function(destination, msg){

  var params = {
    MessageBody: msg,
    QueueUrl: destination,
    MessageAttributes: {
      someKey: { DataType: 'String', StringValue: "string"}
    }
  };
  sqs.sendMessage(params, function(err, data) {
    if (err){logger.error('MessageProducer.js/enviaSolicitacaoDescarte - : ' + err);}
  });
};

module.exports = function(){
  return MessageProducer;
};
