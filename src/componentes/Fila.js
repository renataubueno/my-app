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
        height: 60,
        width: 100,
        tipo: 'UNIFORME'
      };

      return filaUniforme;
    } else if (this.state.value === 'Exponencial'){
      let filaExponencial = {
        id: this.state.id,
        capacidade: 0,
        servidores: 0,
        media: 0.0,
        height: 60,
        width: 100,
        tipo: 'EXPONENCIAL'
      };

      return filaExponencial;
    } else {
        let fila = 0;
        alert('INSERIR TIPO DE DISTRIBUIÇÃO');

        return fila;
    }
  }

  handleClickFila = control => event => {
    console.log('Estou na Fila com o id ', this.state.id);
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
