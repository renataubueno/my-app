import React, {Component} from 'react';
import squareImage from '../images/square.png';
import Pubsub from 'pubsub-js';

export default class Square extends Component{
  constructor(props){
    super(props);
    this.state = {
        idSquare: 0,
        height: 60,
        width: 60
    }
  }

  handleClickSquare = control => event => {
    console.log('Cliquei no Quadrado');
    this.setState({id: ++this.state.idSquare});

    Pubsub.publish('retorno-quadrado', {
      id: this.state.idSquare,
      resposta: this.state
    });
  };

  render(){
    return(
      <img src={squareImage} alt="SQUARE" id={this.state.idSquare} height={this.state.height} width={this.state.width} onClick={ this.handleClickSquare('control') } />
    );
  }
}
