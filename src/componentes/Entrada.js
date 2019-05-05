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

  criaEntrada = () => {
    let entrada = {
      id: this.state.id,
      height: 40,
      width: 50,
      conexaoDir: 0,
      chegada: 0,
      tipo: 'ENTRADA'
    };

    return entrada;
  };


  handleClickEntrada = control => event => {
    console.log('Cliquei na Entrada');
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
