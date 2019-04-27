import React, {Component} from 'react';
import Pubsub from 'pubsub-js';
//import FilaUniforme from '../model/Filas.js';

import FilaImage from '../images/fila.png';

export default class Fila extends Component{
  constructor(props){
    super(props);
    this.state = {
        id: 0,
        height: 60,
        width: 100,
    }
  }

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
  }

  criaFilaUniforme = () => {
    let filaUniforme = {
      id: this.state.id,
      capacidade: 0,
      servidores: 0,
      minChegada: 0,
      maxChegada: 0,
      minServico: 0,
      maxServico: 0,
      height: 60,
      width: 100,
      tipo: 'UNIFORME'
    };

    return filaUniforme;
  };

  handleClickFila = control => event => {
    console.log('Estou na Fila com o id ', this.state.id);
    this.setState({id: ++this.state.id});

    Pubsub.publish('retorno-incremento-id-fila', {
    });

    let filaUniforme = this.criaFilaUniforme();

    Pubsub.publish('retorno-fila', {
      fila: filaUniforme
    });
  };

  render(){
    return(
      <div>
        <img src={FilaImage} alt="Fila" id={this.state.id} height={this.state.height} width={this.state.width} onClick={ this.handleClickFila('control') }/>
      </div>
    );
  }
}
