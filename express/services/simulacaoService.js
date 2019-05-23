var random = require('random');
var seedrandom = require('seedrandom');

let escalonador = [];

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
  let fila = dados.objSimulacao.filter(item => item.tipo === 'UNIFORME');
  let entrada = dados.objSimulacao.filter(item => item.tipo === 'ENTRADA');
  let saida = dados.objSimulacao.filter(item => item.tipo === 'SAIDA');

  let numChegadasMax = dados.condParadaNumChegadas;
  let seed = dados.seeder;

  console.log('ANTES DE ENTRAR NA SIMULACAO');
  let resultado = simulacao(fila, entrada, numChegadasMax, seed);
  console.log('DEPOIS DE ENTRAR NA SIMULACAO');

  let numChegadas = resultado.numChegadas;
  let numAtendimentos = resultado.numAtendimentos;
  let tempoOcupada = resultado.tempoOcupada;
  let tempoTotal = resultado.tempoTotal;
  let probEstadosFila = resultado.probEstadosFila;
  let taxaChegada = calculaTaxaChegada(numChegadas, tempoTotal);
  let vazao = calculaVazao(tempoOcupada, tempoTotal);
  let utilizacao = calculaUtilizacao(numAtendimentos, tempoTotal);
  let tempoMedioServico = calculaTempoMedioServico(numAtendimentos, tempoOcupada);
  let probabilidadesEstadosFila = calculaProbabilidadesEstadosFila(tempoTotal, probEstadosFila)

  return {
      id: fila[0].id, //id da fila
      numChegadas: numChegadas,
      numAtendimentos: numAtendimentos,
      tempoOcupada: tempoOcupada,
      taxaChegada: taxaChegada,
      vazao: vazao,
      utilizacao: utilizacao,
      tempoMedioServico: tempoMedioServico,
      probabilidadesEstadosFila: probabilidadesEstadosFila
  };
}

function geraAleatorio(){
  let numAleatorio = random.float(min = 0, max = 1);
  random.next();

  return numAleatorio;
}

function simulacao(fila, entrada, numChegadasMax, seed){
  console.log('NA SIMULACAO');
  //aleatorio
  random.use(seedrandom(seed));
  let numAleatorio = geraAleatorio();
  let agendaChegada = 0;
  let agendaSaida = 0;
  let tempo = 0;
  //tenho que pegar todas as infos que preciso dos objetos e salvar em objetos locais
  let minChegada = fila[0].minChegada;
  let maxChegada = fila[0].maxChegada;
  let minServico = fila[0].minServico;
  let maxServico = fila[0].maxServico;
  let capacidade = fila[0].capacidade;
  let servidores = fila[0].servidores;
  let chegada = entrada[0].chegada;
  //criar variável de controle pra quantidade de usuários na fila e que já tenham sido atendidos (agendada a saida)
  let condicaoFila = 0;
  let probEstadosFila = Array(capacidade+1);
  let momentoAnterior = 0;
  let momentoAtual = 0;
  //criar o escalonador
  escalonador = [];
  escalonador.push({
    momento: chegada,
    tipo: 'CHEGADA'});
  //criar as variaveis de retorno: numChegadas, numAtendimentos e tempoOcupada
  let numChegadas = 0;
  let numAtendimentos = 0;
  //algoritmo

  while(escalonador.length !== 0 && numChegadas < numChegadasMax){

    console.log('ESCALONADOR', escalonador);
    //console.log('NUMCHEGADAS', numChegadas);
    //console.log('NUMATENDIMENTOS', numAtendimentos);

    let next = escalonador[0];
    escalonador.splice(0, 1);
    if(next.tipo === 'CHEGADA'){
      //verificar quanto tempo a fila ficou com capacidade = 0, 1, 2...
      if(probEstadosFila[condicaoFila] === undefined){
        momentoAtual = next.momento - momentoAnterior;
        momentoAnterior = next.momento;
        probEstadosFila[condicaoFila] = momentoAtual;
      } else {
        momentoAtual = next.momento - momentoAnterior;
        momentoAnterior = next.momento;
        probEstadosFila[condicaoFila] = probEstadosFila[condicaoFila] + momentoAtual;
      }


      numChegadas++;
      if(numChegadas === 5){
        break;
      }
      if(condicaoFila < capacidade){
        condicaoFila++;
        if(condicaoFila <= servidores){
          agendaSaida = next.momento + uniforme(minServico, maxServico);

          if(escalonador.length === 0){
            escalonador.push({
              momento: agendaSaida,
              tipo: 'SAIDA'
            });
          } else {
            for(let i = 0; i < escalonador.length; i++){
              if(escalonador.length === i+1 && escalonador[i].momento < agendaSaida){
                escalonador.push({
                  momento: agendaSaida,
                  tipo: 'SAIDA'
                });
                break;
              } else if(escalonador[i].momento > agendaSaida){
                escalonador.splice(i, 0, {momento: agendaSaida, tipo: 'SAIDA'});
                break;
              }
            }
          }
        };
      };

      agendaChegada =  next.momento + uniforme(minChegada, maxChegada);

      if(escalonador.length === 0){
        escalonador.push({
          momento: agendaChegada,
          tipo: 'CHEGADA'});
      } else {
        for(let i = 0; i < escalonador.length; i++){
          if(escalonador.length === i+1 && escalonador[i].momento < agendaChegada){
            escalonador.push({
              momento: agendaChegada,
              tipo: 'CHEGADA'});
            break;
          } else if(escalonador[i].momento > agendaChegada){
            escalonador.splice(i, 0, {momento: agendaChegada,tipo: 'CHEGADA'});
            break;
          }
        }
      }
    } else {
      if(probEstadosFila[condicaoFila] === undefined){
        momentoAtual = next.momento - momentoAnterior;
        momentoAnterior = next.momento;
        probEstadosFila[condicaoFila] = momentoAtual;
      } else {
        momentoAtual = next.momento - momentoAnterior;
        momentoAnterior = next.momento;
        probEstadosFila[condicaoFila] = probEstadosFila[condicaoFila] + momentoAtual;
      }

      numAtendimentos++;
      condicaoFila--;
      if(condicaoFila >= 1){
        agendaSaida = next.momento + uniforme(minServico, maxServico);

        if(escalonador.length === 0){
          escalonador.push({
            momento: agendaSaida,
            tipo: 'SAIDA'
          });
        } else {
          for(let i = 0; i < escalonador.length; i++){
            if(escalonador.length === i+1 && escalonador[i].momento < agendaSaida){
              escalonador.push({
                momento: agendaSaida,
                tipo: 'SAIDA'
              });
              break;
            } else if(escalonador[i].momento > agendaSaida){
              escalonador.splice(i, 0, {momento: agendaSaida, tipo: 'SAIDA'});
              break;
            }
          }
        }
      }
    }
  }

  let tempoTotal = momentoAnterior;
  let tempoOcupada = momentoAnterior - probEstadosFila[0];
  //console.log('TEMPO TOTAL: ', tempoTotal);
  //console.log('TEMPO OCUPADA: ', tempoOcupada);
  console.log('PROBABILIDADE DE ESTADOS DA FILA - FINAL: ', probEstadosFila);

  return {
    numChegadas: numChegadas,
    numAtendimentos: numAtendimentos,
    tempoOcupada: tempoOcupada,
    tempoTotal: tempoTotal,
    probEstadosFila: probEstadosFila
  };
}

function uniforme(min, max){
  let numAleatorio = geraAleatorio();
  //console.log('MIN RECEBIDO: ', min);
  //console.log('MAX RECEBIDO: ', max );
  //console.log('numAleatorio: ', numAleatorio);
  return (max - min) * numAleatorio + min;
}

function calculaTaxaChegada(numChegadas, tempoTotal){
  return numChegadas/tempoTotal;
}

function calculaUtilizacao(numAtendimentos, tempoTotal){
  return numAtendimentos/tempoTotal;
}

function calculaTempoMedioServico(numAtendimentos, tempoOcupada){
  return numAtendimentos/tempoOcupada;
}

function calculaVazao(tempoOcupada, tempoTotal){
  return tempoOcupada/tempoTotal;
}

function calculaProbabilidadesEstadosFila(tempoTotal, probEstadosFila){
  let probEstadosFilaTratado = [];
  let x = 0;

  for(let i = 0; i < probEstadosFila.length; i++){
    x = (probEstadosFila[i] * 100)/tempoTotal;
    probEstadosFilaTratado.push(x);
  }

  console.log('PROBABILIDADE ESTADO TRATADO', probEstadosFilaTratado);
  return probEstadosFilaTratado;
}
