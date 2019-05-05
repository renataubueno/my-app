import React, {Component} from 'react';
import Pubsub from 'pubsub-js';

import ConectorImage from '../images/conector.png';

export default class Conector extends Component{
  constructor(props){
    super(props);
    this.state = {
        id: 0,
        height: 50,
        width: 100
    }
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-fila', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-entrada', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-saida', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });
  }

  criaConector = () => {
    let conector = {
      id: this.state.id,
      height: 50,
      width: 100,
      conexaoDir1: 0,
      conexaoDir2: 0,
      conexaoEsq: 0,
      probabilidade: 100,
      tipo: 'CONECTOR'
    };

    return conector;
  };

  handleClickConector = control => event => {
    console.log('Cliquei no Conector');
    this.setState({id: ++this.state.id});

    Pubsub.publish('retorno-incremento-id-conector', {
    });

    let conector = this.criaConector();

    Pubsub.publish('retorno-conector', {
      conector: conector
    });
  };

  render(){
    return(
      <img src={ConectorImage} alt="Conector" id={this.state.id} height={this.state.height} width={this.state.width} onClick={ this.handleClickConector('control') } />
    );
  }
}
