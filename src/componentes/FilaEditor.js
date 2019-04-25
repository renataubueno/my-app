import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';

import FilaImage from '../images/fila.png';

export default class FilaEditor extends Objeto {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this.handleDoubleClick}/>
      </Draggable>
    );
  }
}
