import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import SaidaImage from '../images/saida.png';

export default class SaidaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      saida: this.props.objeto
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'SAIDA',
      objeto: this.state.saida
    });
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={SaidaImage} alt="Saida" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen} />
      </Draggable>
    );
  }
}
