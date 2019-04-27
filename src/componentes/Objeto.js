import React, {Component} from 'react';
import Draggable from 'react-draggable';

export default class Objeto extends Component{
  constructor(props){
    super(props);

    this.dadosDoObjeto = {
      key: this.props.objeto.id,
      height: this.props.objeto.height,
      width: this.props.objeto.width
    };

    this.bound = "parent";
    this.position = {x: 0, y: 0};
    this.settings = {
      bounds: this.bound,
      defaultPosition: this.position
    };

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick(event): void{
    console.log(this.props.objeto.id);
    this.setState({dialogOpen: true});
  }

  render(){
    return(
      <div>
      </div>
    );
  }
}
