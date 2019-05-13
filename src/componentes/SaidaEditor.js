import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import SaidaImage from '../images/saida.png';

export default class SaidaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      saida: this.props.objeto,
      position: {}
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      if(desconectarObj.id === this.state.saida.id){
        delete this.settings.position;
      }
    });
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'SAIDA',
      objeto: this.state.saida
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    console.log('POSITION DA SAIDA: ', this.settings.position);
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.targetList.length > 0) {
          for(let i = 0; i < position.targetList.length; i++){
            if(position.targetList[i].id === this.state.saida.id){
              this.settings.position = {x: position.x, y: position.y};
            }
          }
        }
      });
    }
  }

  render(){
    this.connection();

    return(
      <Draggable {...this.settings}>
        <img src={SaidaImage} id={this.state.saida.id} alt="Saida" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen} />
      </Draggable>
    );
  }
}
