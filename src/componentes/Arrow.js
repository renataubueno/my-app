import React, {Component} from 'react';
import Pubsub from 'pubsub-js';
import arrowImage from '../images/arrow.png';

export default class Arrow extends Component{
  constructor(props){
    super(props);
    this.state = {
        idArrow: 0,
        height: 60,
        width: 60
    }
  }

  handleClickArrow = control => event => {
    console.log('Cliquei na Flecha');
    this.setState({id: this.state.idArrow});

    Pubsub.publish('retorno-arrow', {
      id: this.state.idArrow,
      resposta: this.state
    });
  };

  render(){
    return(
      <img src={arrowImage} alt="ARROW" id={this.state.idArrow} height={this.state.height} width={this.state.width} onClick={ this.handleClickArrow('control') } />
    );
  }
}
