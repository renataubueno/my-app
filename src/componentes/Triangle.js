import React, {Component} from 'react';
import triangleImage from '../images/triangle.png';
import Pubsub from 'pubsub-js';

export default class Triangle extends Component{
  constructor(props){
    super(props);
    this.state = {
        idTriangle: 0,
        height: 45,
        width: 45
    }
  }

  handleClickTriangle = control => event => {
    console.log('Cliquei no Triângulo');
    this.setState({id: ++this.state.idTriangle});

    Pubsub.publish('retorno-triangulo', {
      id: this.state.idTriangle,
      resposta: this.state
    });
  };

  render(){
    return(
      <img src={triangleImage} alt="TRIANGLE" id={this.state.idTriangle} height={this.state.height} width={this.state.width} onClick={ this.handleClickTriangle('control') } />
    );
  }
}
