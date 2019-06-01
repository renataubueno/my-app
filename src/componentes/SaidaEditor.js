import React from 'react';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';

import SaidaImage from '../images/saida.png';

export default class SaidaEditor extends Objeto {
  constructor(props){
    super(props);
    this.state = {
      saida: this.props.objeto,
      position: {}
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      if(desconectarObj.id === this.state.saida.id){
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
      tipoObjeto: 'SAIDA',
      objeto: this.state.saida
    });
  }

  connection(){
    this.settings.onDrag = this.props.onControlledDrag;
    console.log('POSITION DA SAIDA: ', this.settings.position);
    if (this.props.controlledPositions) {
      this.props.controlledPositions.filter(position => {
        if (position.targetList.length > 0) {
          for(let i = 0; i < position.targetList.length; i++){
            if(position.targetList[i].id === this.state.saida.id){
              let numTotalFilas = this.state.filas.length;
              let numTotalConectores = this.state.conectores.length;
              let numTotalEntradas = this.state.entradas.length;
              let deslocamentoFila = (numTotalFilas * 100) + (numTotalConectores * 100) - 100;
              let deslocamentoConector = 100;
              if(position.tipo === 'Fila'){
                console.log('DESLOCAMENTO SAIDAEDITOR - FILA', deslocamentoFila);
                this.settings.position = {x: position.x - deslocamentoFila, y: position.y};
              } else if (position.tipo === 'Conector'){
                console.log('DESLOCAMENTO SAIDAEDITOR - CONECTOR', deslocamentoConector);
                this.settings.position = {x: position.x - deslocamentoConector, y: position.y};
              } else {
                console.log('DESLOCAMENTO SAIDAEDITOR - ELSE');
                this.settings.position = {x: position.x + 200, y: position.y};
              }
            }
          }
        }
      });
    }
  }

  render(){
    this.connection();

    return(
      <Draggable {...this.settings}>
        <img src={SaidaImage} id={this.state.saida.id} alt="Saida" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen} />
      </Draggable>
    );
  }
}
