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
    this.state = {
      fila: this.props.objeto
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'Fila',
      fila: this.state.fila
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
