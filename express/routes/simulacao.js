var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
    id: 1,
    numChegadas: 2,
    numAtendimentos: 50,
    tempoOcupada: 10,
    taxaChegada: 3,
    vazao: 2,
    utilizacao: 1,
    tempoMedioServico: 1
  });
});

router.post('/', function(req, res, next) {
  res.send('ESTOU NO POST PLMDDS');
});

module.exports = router;
