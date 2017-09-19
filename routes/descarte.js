/*
 * Arquivo: estoque.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com a implmentação das rotas disponiveis desse modulo.
 *              Atente para o fato de que as rotas /descarte/listaExecucoes, /descarte/consultaErrosDeExecucao
 *              e /descarte/listaNotificacoes, são consumidas por um Clientes REST do modulo AsdView.
  *							Em caso de erros, podem ser gerados registros de logs e também persistidos no datasource.
 * Data: 19/09/2017
 */
var logger = require('../servicos/logger.js');

module.exports = function(app){
  app.get('/descarte', function(req, res){
    logger.info('/descarte - Acessou');
    res.send('OK.');
  });

  app.post('/descarte/listaExecucoes', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.listaExecucoes(function(erro, resultado){
      if(erro){
        logger.error('Descarte/listaExecucoes - DescarteDao.listaExecucoes: ' + erro);
        persisteErro('1', 'Descarte/listaExecucoes - ' + erro);
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
      }
    });
  });

  app.post('/descarte/consultaErrosDeExecucao', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.consultaErrosDeExecucao(function(erro, resultado){
      if(erro){
        logger.error('Descarte/consultaErrosDeExecucao - DescarteDao.consultaErrosDeExecucao: ' + erro);
        persisteErro('1', 'Descarte/consultaErrosDeExecucao - ' + erro);
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
      }
    });
  });

  app.post('/descarte/listaNotificacoes', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.listaNotificacoes(function(erro, resultado){
      if(erro){
        logger.error('Descarte/listaNotificacoes - DescarteDao.listaNotificacoes: ' + erro);
        persisteErro('1', 'Descarte/listaNotificacoes - ' + erro);
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
      }
    });
  });

  function persisteErro(idExecucao, msg){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);
    DescarteDao.registraErroExecucao(idExecucao, new Date(), msg, function(erro, resultado){
      if(erro){
        logger.error('descarte.Js/persisteErro: ' + erro);
      }
    });
  }

}
