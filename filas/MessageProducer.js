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
    if (err) common.logError(err, err.stack);
    else     common.log(data);
  });
};

module.exports = function(){
  return MessageProducer;
};
