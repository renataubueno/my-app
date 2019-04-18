import React, {Component} from 'react';
import Pubsub from 'pubsub-js';
import EntradaImage from '../images/entrada.png';

export default class Entrada extends Component{
  constructor(props){
    super(props);
    this.state = {
        idEntrada: 0,
        height: 40,
        width: 50
    }
  }

  handleClickEntrada = control => event => {
    console.log('Cliquei na Entrada');
    this.setState({id: ++this.state.idEntrada});

    Pubsub.publish('retorno-entrada', {
      id: this.state.idEntrada,
      resposta: this.state
    });
  };

  render(){
    return(
      <img src={EntradaImage} alt="Entrada" id={this.state.idEntrada} height={this.state.height} width={this.state.width} onClick={ this.handleClickEntrada('control') } />
    );
  }
}
