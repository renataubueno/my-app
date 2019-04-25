import React, {Component} from 'react';
import Draggable from 'react-draggable';

export default class ObjetoEditor extends Component{
  constructor(props){
    super(props);

    this.dadosDoObjeto = {
      key: this.props.objeto.id,
      height: this.props.objeto.height,
      width: this.props.objeto.width
    };
  }

  render(){
    return(
      <div>
      </div>
    );
  }
}
