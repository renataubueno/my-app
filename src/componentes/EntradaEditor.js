import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import EntradaImage from '../images/entrada.png';

export default class EntradaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      entrada: this.props.objeto,
      position: {}
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      if(desconectarObj.id === this.state.entrada.id){
        delete this.settings.position;
      }
    });

    Pubsub.subscribe('valores-simulacao', (topico, dados) => {
      console.log('Oi, recebi esses dados na EntradaEditor.js', dados);
      this.setState({filas: dados.filas});
      this.setState({conectores: dados.conectores});
      this.setState({entradas: dados.entradas});
      this.setState({saidas: dados.saidas});
      this.setState({controlledPositions: dados.controlledPositions});
    });
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: 'ENTRADA',
      objeto: this.state.entrada
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.targetList.length > 0 && position.targetList[0].id === this.state.entrada.id) {
            this.settings.position = {x: position.x, y: position.y};
        }
      });
    }
  }

  render(){
    this.connection();

    this.settings.onDrag = this.props.onControlledDrag;
    return(
      <Draggable {...this.settings}>
        <img src={EntradaImage} id={this.state.entrada.id} alt="Entrada" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
    );
  }
}
