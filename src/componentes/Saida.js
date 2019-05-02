import React, {Component} from 'react';
import Pubsub from 'pubsub-js';

import SaidaImage from '../images/saida.png';

export default class Saida extends Component{
  constructor(props){
    super(props);
    this.state = {
        id: 0,
        height: 40,
        width: 50
    }
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-fila', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-conector', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });

    Pubsub.subscribe('retorno-incremento-id-entrada', (topico, dadosDoID) => {
      this.setState({id: ++this.state.id});
   });
  }

  criaSaida = () => {
    let saida = {
      id: this.state.id,
      height: 40,
      width: 50,
      conexaoEsq: 0
    };

    return saida;
  };

  handleClickSaida = control => event => {
    console.log('Cliquei na Saida');
    this.setState({id: ++this.state.id});

    Pubsub.publish('retorno-incremento-id-saida', {
    });

    let saida = this.criaSaida();

    Pubsub.publish('retorno-saida', {
      saida: saida
    });
  };

  render(){
    return(
      <img src={SaidaImage} alt="SAIDA" id={this.state.id} height={this.state.height} width={this.state.width} onClick={ this.handleClickSaida('control') } />
    );
  }
}
