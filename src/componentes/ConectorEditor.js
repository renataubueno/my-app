import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';

import ConectorImage from '../images/conector.png';

export default class ConectorEditor extends Objeto {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Draggable {...this.settings}>
        <img src={ConectorImage} alt="Conector" {...this.dadosDoObjeto} onDoubleClick={this.handleDoubleClick}/>
      </Draggable>
    );
  }
}