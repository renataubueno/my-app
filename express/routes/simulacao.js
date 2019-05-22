var express = require('express');
var random = require('random');
var seedrandom = require('seedrandom');
var serviceSimulacao = require('../services/simulacaoService');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200);
  res.send(serviceSimulacao.simulacaoGET());
});

router.post('/', function(req, res, next) {
  let body = req.body;

  if(validar(body)){
    console.log('BODY: ', body);
    let retorno = serviceSimulacao.simulacaoPOST(body);
    console.log('RETORNO: ', retorno);
    res.send(retorno);
  } else {
    console.log('DEU ERRO');
    res.status(400);
    res.jsonp('Erro na validação do back end');
  }
});

function validar(dado){
  console.log('VALIDANDO DADO NO BACK END: ', dado);
  return true;
}

module.exports = router;
