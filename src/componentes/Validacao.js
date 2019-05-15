import React, {Component} from 'react';
import Editor from './Editor.js';

export default class Validacao extends Component{

  //a fila pode ter N entradas e 1 saída
  //targetList só pode conter outra fila, um conector ou uma saida
  conexoesFila = () => {
  };

  //o conector pode ter 1 entrada e N saídas
  //targetList só pode conter uma fila ou uma saida
  conexoesConector = () => {
  };

  //só pode ter entrada pois este objeto representa a saída em si do sistema
  //targetList deve estar vazio
  conexoesSaida = () => {
  };

  //não pode estar na targetList de nenhum outro objeto
  //targetList só pode conter filas ou conectores
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
