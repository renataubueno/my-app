import React, {Component} from 'react';
import Pubsub from 'pubsub-js';

import EntradaImage from '../images/entrada.png';

export default class Entrada extends Component{
  constructor(props){
    super(props);
    this.state = {
        id: 0,
        height: 40,
        width: 50,
    }
  }

  /* Estes métodos de subscribe são realizados para controlar o id global */
  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-fila', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-conector', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-saida', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });
  }

  /* Cria uma entrada no editor, com o id global, altura e tamanho fixos, chegada default e o seu tipo */
  /* O tipo é utilizado para verificações posteriores - conexões, deleções, ... */
  criaEntrada = () => {
    let entrada = {
      id: this.state.id,
      idConectado: 0,
      height: 40,
      width: 50,
      chegada: 0,
      tipo: 'ENTRADA'
    };

    return entrada;
  };

  /* Quando clico na entrada, na barra lateral à esquerda, este evento é triggado */
  /* O id local é incrementado e avisa-se aos outros objetos, através do publish, para incrementarem seus valores locais também */
  /* Publica, no editor, uma cópia da entrada, utilizando o método criaEntrada() */
  handleClickEntrada = control => event => {
    this.setState({id: ++this.state.id});

    Pubsub.publish('retorno-incremento-id-entrada', {
    });

    let entrada = this.criaEntrada();

    Pubsub.publish('retorno-entrada', {
      entrada: entrada
    });
  };

  render(){
    return(
      <img src={EntradaImage} alt="Entrada" id={this.state.id} height={this.state.height} width={this.state.width} onClick={ this.handleClickEntrada('control') } />
    );
  }
}
