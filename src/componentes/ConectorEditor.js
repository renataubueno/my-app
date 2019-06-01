import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import ConectorImage from '../images/conector.png';

export default class ConectorEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      conector: this.props.objeto,
      position: {}
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      if(desconectarObj.id === this.state.conector.id){
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
      tipoObjeto: 'CONECTOR',
      objeto: this.state.conector
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.targetList.length > 0 && position.targetList[0].id === this.state.conector.id) {
          let numTotalFilas = this.state.filas.length;
          let numTotalConectores = this.state.conectores.length;
          let deslocamentoEntrada = 50 + numTotalFilas + (numTotalConectores * 100);
          let deslocamentoFila = (numTotalFilas * 100) - 100;
          if(position.tipo === 'Entrada'){
            this.settings.position = {x: position.x + deslocamentoEntrada, y: position.y};
          } else if (position.tipo === 'Fila'){
            this.settings.position = {x: position.x - deslocamentoFila, y: position.y};
          } else {
            this.settings.position = {x: position.x, y: position.y};
          }
        }
      });
    }
  }

  render(){
    this.connection();

    return (
      <Draggable {...this.settings} >
        <img id={this.state.conector.id} src={ConectorImage} alt="Conector" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
    );
  }
}
