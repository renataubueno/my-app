import React, {Component} from 'react';
import Pubsub from 'pubsub-js';

import FilaImage from '../images/fila.png';

export default class Fila extends Component{
  constructor(props){
    super(props);
    this.state = {
        id: 0,
        height: 60,
        width: 100,
        value: 'SEM DISTRIBUICAO'
    }
  }
  /* Estes métodos de subscribe são realizados para controlar o id global, bem como o tipo de distribuição */
  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-conector', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-entrada', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-saida', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

   Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
      this.setState({value: dadosDaDistribuicao.distribuicao});
  });
  }

  /* Cria uma fila no editor, com o id global, altura e tamanho fixos, bem como valores default e o seu tipo */
  /* O tipo é utilizado para verificações posteriores - conexões, deleções, ... */
  /* É feita uma verificação do valor da fila, pois dependendo se é uniforme, exponencial, ... ela tem parâmetros diferentes */
  criaFila = () => {
    if (this.state.value === 'Uniforme'){
      let filaUniforme = {
        id: this.state.id,
        capacidade: 0,
        servidores: 0,
        minChegada: 0,
        maxChegada: 0,
        minServico: 0,
        maxServico: 0,
        targetList: [],
        chegadas: [],
        saidas: [],
        height: 60,
        width: 100,
        tipo: 'UNIFORME'
      };

      return filaUniforme;
    } else {
        let fila = 0;
        alert('INSERIR TIPO DE DISTRIBUIÇÃO');

        return fila;
    }
  }

  /* Quando clico na fila, na barra lateral à esquerda, este evento é triggado */
  /* O id local é incrementado e avisa-se aos outros objetos, através do publish, para incrementarem seus valores locais também */
  /* Publica, no editor, uma cópia da fila, utilizando o método criaFila() */
  /* Se a fila não tem um tipo definido - uniforme ou exponencial - ela não é adicionada no editor */
  handleClickFila = control => event => {
    this.setState({id: ++this.state.id});

    Pubsub.publish('retorno-incremento-id-fila', {
    });

    let fila = this.criaFila();

    if (fila !== 0){
      Pubsub.publish('retorno-fila', {
        fila: fila
      });
    }
  };

  render(){
    return(
      <div>
        <img src={FilaImage} alt="Fila" id={this.state.id} height={this.state.height} width={this.state.width} onClick={ this.handleClickFila('control') }/>
      </div>
    );
  }
}
