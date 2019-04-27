import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';

import FilaImage from '../images/fila.png';

export default class FilaEditor extends Objeto {
  constructor(props){
    super(props);

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'Fila',
      id: this.dadosDoObjeto.key
    });
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>

    );
  }
}
