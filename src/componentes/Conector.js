import React, {Component} from 'react';
import ConectorImage from '../images/conector.png';
import Pubsub from 'pubsub-js';

export default class Conector extends Component{
  constructor(props){
    super(props);
    this.state = {
        idConector: 0,
        height: 50,
        width: 100
    }
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-incremento-id-fila', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idConector});
   });

    Pubsub.subscribe('retorno-incremento-id-entrada', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idConector});
   });

    Pubsub.subscribe('retorno-incremento-id-saida', (topico, dadosDoID) => {
      this.setState({id: ++this.state.idConector});
   });
  }

  handleClickConector = control => event => {
    console.log('Cliquei no Conector');
    this.setState({id: ++this.state.idConector});

    Pubsub.publish('retorno-incremento-id-conector', {
    });

    Pubsub.publish('retorno-conector', {
      id: this.state.idConector,
      resposta: this.state
    });
  };

  render(){
    return(
      <img src={ConectorImage} alt="Conector" id={this.state.idConector} height={this.state.height} width={this.state.width} onClick={ this.handleClickConector('control') } />
    );
  }
}
