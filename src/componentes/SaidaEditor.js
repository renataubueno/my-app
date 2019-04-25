import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';

import SaidaImage from '../images/saida.png';

export default class SaidaEditor extends Objeto {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={SaidaImage} alt="Saida" {...this.dadosDoObjeto} onDoubleClick={this.handleDoubleClick} />
      </Draggable>
    );
  }
}
