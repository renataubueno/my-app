import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import ConectorImage from '../images/conector.png';

export default class ConectorEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      conector: this.props.objeto
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'CONECTOR',
      objeto: this.state.conector
    });
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={ConectorImage} alt="Conector" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
    );
  }
}
