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

    var destination = '/queue/ManahSolicitacaoDescarteQueue';
    var endereco = '127.0.0.1';
    var porta = '61613';
    var user = 'admin';
    var senha = 'admin';
    var msg = JSON.stringify(notificacao.NOTIFICACAO_JSON_VALORES);

    var filas = new app.filas.MessageProducer();
    filas.enviaSolicitacaoDescarte(destination, endereco, porta, user, senha, msg);

    alteraStatusPostagemNotificacaoNaFila(idNotificacao);

    //
    // console.log('POSTOU');
    // console.log(JSON.stringify(notificacao.NOTIFICACAO_JSON_VALORES));

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

//http://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/



// aqui eh o certo
  //rule.second = 10;
  // cron.scheduleJob(rule, function(){


  //0 */3 * * *
  //Cron a cada 5 minutos: 0-59/5  * * * *
  //Cron todo dia a meia noite: 0 0 * * *
  //Cron todo minuto: * * * * *
