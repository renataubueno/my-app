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

  /* This is the order that must be used. First, set the seed (only one time), then for each time a random
  number is needed, call the float and then the next function
  random.use(seedrandom(10))
  random.float(min = 0, max = 1)
  random.next();
  */

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
