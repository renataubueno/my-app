import React from 'react';
import ObjetoEditorNovo from './ObjetoEditorNovo.js';
import Draggable from 'react-draggable';

import FilaImage from '../images/fila.png';

export default class FilaNova extends ObjetoEditorNovo {
  constructor(props){
    super(props);

    this.bound = "parent";
    this.position = {x: 0, y: 0};
    this.settings = {
      bounds: this.bound,
      defaultPosition: this.position
    };
  }

  handleDoubleClick(event): void{
    console.log(event);
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this.handleDoubleClick('FILA')}/>
      </Draggable>
    );
  }
}
