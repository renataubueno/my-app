import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import FilaImage from '../images/fila.png';

export default class FilaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      fila: this.props.objeto
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: this.state.fila.tipo,
      objeto: this.state.fila
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.target && position.target.id === this.state.fila.id) {
          if(position.tipo === 'Entrada'){
            this.settings.position = {x: position.x + 150, y: position.y};
          } else if (position.tipo === 'Conector'){
            this.settings.position = {x: position.x + 200, y: position.y};
          } else {
            this.settings.position = {x: position.x, y: position.y};
          }
        }
      });
    }
  }

  render(){
    this.connection();

    return(
      <Draggable {...this.settings} >
        <img id={this.state.fila.id} src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>

    );
  }
}
