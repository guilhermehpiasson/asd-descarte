function DescarteDao(connection) {
    this._connection = connection;
}

DescarteDao.prototype.listaExecucoes = function(callback) {
    this._connection.query('SELECT * FROM EXECUCOES',callback);
}

DescarteDao.prototype.listaExecucoesNoDiaDeHoje = function(callback) {
    this._connection.query('SELECT DISTINCT(EXECUCAO_ID) FROM EXECUCOES WHERE EXECUCAO_DATA = CURDATE()',callback);
}

DescarteDao.prototype.insereRegistroExecucao = function (dataAtual, callback) {
    this._connection.query('INSERT INTO EXECUCOES (`EXECUCAO_DATA`) VALUES (?) ', [dataAtual], callback);
}

DescarteDao.prototype.insereRegistroNotificacoes = function (notificacao, callback) {
    this._connection.query('INSERT INTO NOTIFICACOES SET ? ', notificacao, callback);
}

DescarteDao.prototype.alteraFlagPostagemNotificacao = function (idNotificacao, callback) {
    this._connection.query('UPDATE NOTIFICACOES SET NOTIFICACAO_POSTADA = ? WHERE NOTIFICACAO_ID = ? ', ['S', idNotificacao], callback);
}

DescarteDao.prototype.consultaErrosDeExecucao = function (callback) {
    this._connection.query('SELECT * FROM ERRO_EXECUCOES', callback);
}

DescarteDao.prototype.listaNotificacoes = function (callback) {
    this._connection.query('SELECT * FROM NOTIFICACOES', callback);
}

DescarteDao.prototype.registraErroExecucao = function (callback) {
    this._connection.query('', callback);
}

module.exports = function(){
    return DescarteDao;
};
