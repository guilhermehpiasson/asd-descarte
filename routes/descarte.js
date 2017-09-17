module.exports = function(app){
  app.get('/descarte', function(req, res){
    console.log('Recebida requisicao de teste na porta 3001.')
    res.send('OK.');
  });

  app.post('/descarte/listaExecucoes', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.listaExecucoes(function(erro, resultado){
      if(erro){
        console.log('Erro ao consultar no banco:' + erro);
        //insere registro de erro de execucao
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
        console.log('Erro ao inserir no banco:' + erro);
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
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
      }
    });

  });


}
