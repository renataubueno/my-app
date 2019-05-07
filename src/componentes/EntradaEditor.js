import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import EntradaImage from '../images/entrada.png';

export default class EntradaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      entrada: this.props.objeto
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'ENTRADA',
      objeto: this.state.entrada
    });
  }

  render(){
    this.settings.onDrag = this.props.onControlledDrag;
    return(
      <Draggable {...this.settings}>
        <img src={EntradaImage} id={this.state.entrada.id} alt="Entrada" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
    );
  }
}
