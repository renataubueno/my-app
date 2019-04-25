import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';

import EntradaImage from '../images/entrada.png';

export default class EntradaEditor extends Objeto {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={EntradaImage} alt="Entrada" {...this.dadosDoObjeto} onDoubleClick={this.handleDoubleClick}/>
      </Draggable>
    );
  }
}
