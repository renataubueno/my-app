import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import FilaImage from '../images/fila.png';

export default class FilaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      fila: this.props.objeto
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      if(desconectarObj.id === this.state.fila.id){
        delete this.settings.position;
      }
    });

    Pubsub.subscribe('valores-simulacao', (topico, dados) => {
      console.log('Oi, recebi esses dados na FilaEditor.js', dados);
      this.setState({filas: dados.filas});
      this.setState({conectores: dados.conectores});
      this.setState({entradas: dados.entradas});
      this.setState({saidas: dados.saidas});
      this.setState({controlledPositions: dados.controlledPositions});
    });
  }

  _handleDoubleClickOpen(event): void {
    Pubsub.publish('double-click', {
      tipoObjeto: this.state.fila.tipo,
      objeto: this.state.fila
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.targetList.length > 0 && position.targetList[0].id === this.state.fila.id) {
          let numTotalFilas = this.state.filas.length;
          let numTotalConectores = this.state.conectores.length;
          let numTotalSaidas = this.state.saidas.length;
          let deslocamentoEntrada = 50 + (numTotalFilas * 100) + (numTotalConectores * 100) + (numTotalSaidas * 50);
          let deslocamentoConector = (numTotalFilas * 100) + 100;
          if(position.tipo === 'Entrada'){
            this.settings.position = {x: position.x + deslocamentoEntrada, y: position.y};
          } else if (position.tipo === 'Conector'){
            this.settings.position = {x: position.x + deslocamentoConector, y: position.y};
          } else if (position.tipo === 'Fila'){
            console.log('POSITION DA FILA', position);
            this.settings.position = {x: position.x + 200, y: position.y};
          } else {
            console.log('POSITION DEFAULT');
            this.settings.position = {x: position.x, y: position.y};
          }
        }
      });
    }
  }

  render(){
    this.connection();

    return(
      <Draggable {...this.settings} >
        <img id={this.state.fila.id} src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>

    );
  }
}
