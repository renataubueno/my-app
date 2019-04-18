import React, {Component} from 'react';
import FilaImage from '../images/fila.png';
import Pubsub from 'pubsub-js';

export default class Fila extends Component{
  constructor(props){
    super(props);
    this.state = {
        idFila: 0,
        height: 60,
        width: 100
    }
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-conector', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idFila});
   });

    Pubsub.subscribe('retorno-incremento-id-entrada', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idFila});
   });

    Pubsub.subscribe('retorno-incremento-id-saida', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idFila});
   });
  }

  handleClickFila = control => event => {
    console.log('Estou na Fila com o id ', this.state.idFila);
    this.setState({id: ++this.state.idFila});

    Pubsub.publish('retorno-incremento-id-fila', {
    });

    Pubsub.publish('retorno-fila', {
      id: this.state.idFila,
      resposta: this.state
    });
  };

  render(){
    return(
      <div>
      <img src={FilaImage} alt="Fila" id={this.state.idFila} height={this.state.height} width={this.state.width} onClick={ this.handleClickFila('control') }/>
      </div>
    );
  }
}
