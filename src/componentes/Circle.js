import React, {Component} from 'react';
import circleImage from '../images/circle.png';
import Pubsub from 'pubsub-js';

export default class Circle extends Component{
  constructor(props){
    super(props);
    this.state = {
        idCircle: 0,
        height: 60,
        width: 60
    }
  }

  handleClickCircle = control => event => {
    console.log('Estou no Circle com o id ', this.state.idCircle);
    this.setState({id: this.state.idCircle});

    Pubsub.publish('retorno-circulo', {
      id: this.state.idCircle,
      resposta: this.state
    });
  };

  render(){
    return(
      <div>
      <img src={circleImage} alt="CIRCLE" id={this.state.idCircle} height={this.state.height} width={this.state.width} onClick={ this.handleClickCircle('control') }/>
      </div>
    );
  }
}
