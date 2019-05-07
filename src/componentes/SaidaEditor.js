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

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'SAIDA',
      objeto: this.state.saida
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.target && position.target.id === this.state.saida.id) {
            this.settings.position = {x: position.x, y: position.y};
            //console.log('this.settings.position -saida', this.settings.position);
        } else if (position.nextNextTarget) {
          console.log(position);
          for(let i = 0; i <= position.nextNextTarget.id.length; i++){
            if(position.nextNextTarget.id[i] === this.state.saida.id){
              console.log('position.nextNextTarget.id[i]', position.nextNextTarget.id[i]);
              this.settings.position = {x: position.x - 100, y: position.y};
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
