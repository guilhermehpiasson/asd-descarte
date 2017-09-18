var cron = require('node-schedule');
var date = require('date-and-time');

module.exports = function(app){

	var rule = new cron.RecurrenceRule();
  //0 1 * * *
  // */2 * * * *
  cron.scheduleJob('0 1 * * *', function(){
      console.log("NOVA DATA 1", date.format(new Date(), 'DD/MM/YYYY HH:mm:ss'));
      disparoDeExecucao();
  });

  function disparoDeExecucao(){

      var connection = app.persistencia.connectionFactory();
      var DescarteDao = new app.persistencia.DescarteDao(connection);

      DescarteDao.insereRegistroExecucao(new Date(), function(erro, resultado){
        if(erro){
          console.log('Erro ao inserir no banco:' + erro);
          // res.status(500).send(erro);
        } else {
          consultaDeProdutosParaDescarte(resultado.insertId);
        }
      });
  };

  function consultaDeProdutosParaDescarte(idExecucao){

    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    var clienteProdutos = new app.servicos.clienteProdutosParaDescarte();

    clienteProdutos.consulta(function(exception, request, response, retorno){
          if(exception){
            console.log(exception);
            // res.status(400).send(exception);
            return;
          }

          if (retorno.length >= 1) {
            populaJsonComProdutos(idExecucao, retorno);
          }
    });

  };

  function populaJsonComProdutos(idExecucao,retorno){
      var notificacao = new Object();

      notificacao.EXECUCOES_ID = idExecucao;
      for (var i = 0; i < retorno.length; i++) {
        notificacao.NOTIFICACAO_JSON_VALORES = JSON.stringify(retorno[i]);
      }
      notificacao.NOTIFICACAO_POSTADA = "F";

      insereNotificacao(notificacao);
  }


  function insereNotificacao(notificacao){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.insereRegistroNotificacoes(notificacao, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco 1: ' + erro);
        // res.status(500).send(erro);
      } else {
        postaMensagemNaFila(notificacao, resultado.insertId);
      }
    });
  }

  function postaMensagemNaFila(notificacao, idNotificacao){
		var msgNotificacao = JSON.parse(notificacao.NOTIFICACAO_JSON_VALORES);

		if(msgNotificacao.FORNECEDOR_ID == '1'){
			var destination = 'https://sqs.sa-east-1.amazonaws.com/210111500613/ManahSolicitacaoDescarteQueue';
	    var msg = JSON.stringify(notificacao.NOTIFICACAO_JSON_VALORES);

	    var filas = new app.filas.MessageProducer();
	    filas.enviaSolicitacaoDescarte(destination, msg);

	    alteraStatusPostagemNotificacaoNaFila(idNotificacao);
		}else {
			console.log('FORNECEDOR '+msgNotificacao.FORNECEDOR_ID);
		}
  }

  function alteraStatusPostagemNotificacaoNaFila(idNotificacao){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.alteraFlagPostagemNotificacao(idNotificacao, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco: 2 ' + erro);
        // res.status(500).send(erro);
      } else {
        //sucesso;
      }
    });

  }

}
