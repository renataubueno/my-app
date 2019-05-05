import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import FilaImage from '../images/fila.png';

export default class FilaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      fila: this.props.objeto,
      position: {}
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: this.state.fila.tipo,
      objeto: this.state.fila
    });
  }

  render(){
    let newPosition = {x: this.props.x, y: this.props.y};
    this.settings.position = newPosition;
    return(
      <Draggable {...this.settings} >
        <img src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>

    );
  }
}
