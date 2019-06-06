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

  componentWillMount(){
    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      if(desconectarObj.id === this.state.fila.id){
        delete this.settings.position;
      }
    });

    Pubsub.subscribe('valores-simulacao', (topico, dados) => {
      this.setState({filas: dados.filas});
    });
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: this.state.fila.tipo,
      objeto: this.state.fila,
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
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
