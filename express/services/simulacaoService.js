var random = require('random');
var seedrandom = require('seedrandom');

exports.simulacaoGET = function () {
  return {
      id: 1,
      numChegadas: "Abacate",
      numAtendimentos: "B",
      tempoOcupada: "C",
      taxaChegada: "A/T",
      vazao: "C/T",
      Utilizacao: "B/T",
      tempoMedioServico: "B/C"
  };
}

exports.simulacaoPOST = function (dados) {
  random.use(seedrandom(dados.seeder));
  let numAleatorio = geraAleatorio();

  let fila = dados.objSimulacao.filter(item => item.tipo === 'UNIFORME');
  let entrada = dados.objSimulacao.filter(item => item.tipo === 'ENTRADA');
  let saida = dados.objSimulacao.filter(item => item.tipo === 'SAIDA');

  let numChegadasMax = dados.condParadaNumChegadas;

  let resultado = simulacao(fila, entrada);

  let numChegadas = resultado.numChegadas;
  let numAtendimentos = resultado.numAtendimentos;
  let tempoOcupada = resultado.tempoOcupada;
  let taxaChegada = calculaTaxaChegada(numChegadas);
  let vazao = calculaVazao(tempoOcupada);
  let utilizacao = calculaUtilizacao(numAtendimentos);
  let tempoMedioServico = calculaTempoMedioServico(numAtendimentos, tempoOcupada);

  return {
      id: fila.id, //id da fila
      numChegadas: numChegadas,
      numAtendimentos: numAtendimentos,
      tempoOcupada: tempoOcupada,
      taxaChegada: taxaChegada,
      vazao: vazao,
      Utilizacao: utilizacao,
      tempoMedioServico: tempoMedioServico
  };

  /*
  { objSimulacao:
   [ { id: 2,
       tipo: 'UNIFORME',
       capacidade: 3,
       servidores: 3,
       minChegada: 3,
       maxChegada: 3,
       minServico: 3,
       maxServico: 3,
       targetList: [Array] },
     { id: 3, tipo: 'ENTRADA', chegada: 3, targetList: [Array] },
     { id: 1, tipo: 'SAIDA', targetList: [] } ],
  seeder: 0,
  condParadaNumChegadas: 0 }
  */
  /*let sistemaOk = true;

  for(let i = 0; i < dados.simulacao.length; i++){
    console.log('Tipo do dado ', dados.simulacao[i].tipo);

    //saida não tem nenhuma conexão na sua targetList
    if(dados.simulacao[i].tipo === 'Saida' && dados.simulacao[i].targetList.length !== 0){
      console.log('A SAIDA NÃO ESTÁ TERMINANDO O SISTEMA');
      sistemaOk = false;
      break;
    }
  }

  if(sistemaOk){
    return dados;
  } else {
    return 'O sistema está incorreto';
  }*/
}

function geraAleatorio(){
  let numAleatorio = random.float(min = 0, max = 1);
  random.next();

  return numAleatorio;
}

function calculaTaxaChegada(numChegadas){
  return 10;
}

function calculaUtilizacao(numAtendimentos){
  return 11;
}

function calculaTempoMedioServico(numAtendimentos, tempoOcupada){
  return 12;
}

function calculaVazao(tempoOcupada){
  return 13;
}

function simulacao(fila, entrada){
  return {
    numChegadas: 100,
    numAtendimentos: 200,
    tempoOcupada: 300
  };
}
