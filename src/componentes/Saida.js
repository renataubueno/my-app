import React, {Component} from 'react';
import SaidaImage from '../images/saida.png';
import Pubsub from 'pubsub-js';

export default class Saida extends Component{
  constructor(props){
    super(props);
    this.state = {
        idSaida: 0,
        height: 40,
        width: 50
    }
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-fila', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idSaida});
   });

    Pubsub.subscribe('retorno-incremento-id-conector', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idSaida});
   });

    Pubsub.subscribe('retorno-incremento-id-entrada', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idSaida});
   });
  }

  handleClickSaida = control => event => {
    console.log('Cliquei na Saida');
    this.setState({id: ++this.state.idSaida});

    Pubsub.publish('retorno-incremento-id-saida', {
    });

    Pubsub.publish('retorno-saida', {
      id: this.state.idSaida,
      resposta: this.state
    });
  };

  render(){
    return(
      <img src={SaidaImage} alt="SAIDA" id={this.state.idSaida} height={this.state.height} width={this.state.width} onClick={ this.handleClickSaida('control') } />
    );
  }
}
