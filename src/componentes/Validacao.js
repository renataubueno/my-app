import React, {Component} from 'react';

export default class Validacao extends Component{

  //a fila deve ter N entradas e 1 saída
  //entrada: pode ser uma fila, uma entrada ou um conector
  //saida: uma fila, um conector ou uma saida
  conexoesFila = () => {
  };

  //o conector deve ter 1 entrada e N saídas
  //entrada: uma fila ou uma entrada
  //saida: uma fila ou uma saída
  conexoesConector = () => {
  };

  //só tem entrada pois este objeto representa a saída em si do sistema
  //entrada: uma fila, um conector ou uma entrada
  conexoesSaida = () => {
  };

  //só tem saída pois este objeto representa a entrada em si no sistema
  //saída: uma fila, um conector ou uma saída
  conexoesEntrada = () => {
  };

  //verificar se há algum tipo de distribuição sendo aplicado à fila
  //talvez esse não seja necessário pq eu não consigo criar filas sem que elas tenham uma distribuição
  distribuicaoFila = () => {
  };

  //a probabilidade total de um conector não pode ultrapassar 100%
  probabilidadeConector = () => {
  };

  //a chegada deve ser um valor maior do que zero
  chegadaEntrada = () => {
  };

  //verificar se alguma condição de parada foi escolhida
  condicaoDeParada = () => {
  };

  render(){
    return(
      <div>
      </div>
    );
  }
}
