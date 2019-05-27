import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pubsub from 'pubsub-js';

import FilaEditor from './FilaEditor.js';
import ConectorEditor from './ConectorEditor.js';
import SaidaEditor from './SaidaEditor.js';
import EntradaEditor from './EntradaEditor.js';
import DialogEditor from './DialogEditor.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: 'auto',
    height: '600px',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '245px',
    marginRight: '245px',
    marginTop: '75px',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 5,
  },
});

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filaFilas: [],
      filaConector: [],
      filaSaida: [],
      filaEntrada: [],
      controlledPositions: []
    }

  }

  componentWillMount(){
    Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.fila);
        this.setState({filaFilas: itemsFila});
    });

    Pubsub.subscribe('retorno-conector', (topico, dadosDoConector) => {
       var itemsConector = [ ].concat(this.state.filaConector);
       itemsConector.push(dadosDoConector.conector);
       this.setState({filaConector: itemsConector});
    });

    Pubsub.subscribe('retorno-saida', (topico, dadosDaSaida) => {
      var itemsSaida = [ ].concat(this.state.filaSaida);
      itemsSaida.push(dadosDaSaida.saida);
      this.setState({filaSaida: itemsSaida});
    });

    Pubsub.subscribe('retorno-entrada', (topico, dadosDaEntrada) => {
      var itemsEntrada = [ ].concat(this.state.filaEntrada);
      itemsEntrada.push(dadosDaEntrada.entrada);
      this.setState({filaEntrada: itemsEntrada});
    });

    Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
      console.log('Vamos');
      this.setState({filaFilas: []});
      this.setState({filaConector: []});
      this.setState({filaSaida: []});
      this.setState({filaEntrada: []});
    });

    Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
       this.setState({value: dadosDaDistribuicao.distribuicao});
       if(this.state.value === 'Uniforme'){
         this.setState({filaFilas: [ ]});
         console.log('Alterei para UNIFORME');
       } else if (this.state.value === 'Exponencial'){
         this.setState({filaFilas: [ ]});
         console.log('Alterei para EXPONENCIAL');
       } else {
         this.setState({filaFilas: [ ]});
         console.log('Alterei para SEM DISTRIBUICAO');
       }
    });

    Pubsub.subscribe('desconectar', (topico, desconectarObj) => {
      console.log('RECEBI O REQUEST PARA DESCONECTAR O OBJETO DE ID ', desconectarObj.id);
      for(let i = 0; i < this.state.controlledPositions.length; i++){
        if(this.state.controlledPositions[i].targetList.length > 0){
          for(let j = 0; j < this.state.controlledPositions[i].targetList.length; j++){
            if(parseInt(this.state.controlledPositions[i].targetList[j].id) === parseInt(desconectarObj.id)){
              this.state.controlledPositions[i].targetList.splice(j, 1);
            }
          }
        }
      }
    });

    Pubsub.subscribe('deletar', (topico, deletar) => {
       console.log('Valor recebido no deletar - ID: ', deletar.id);
       console.log('Valor recebido no deletar - tipoObjeto: ', deletar.tipoObjeto);
       if(deletar.tipoObjeto === 'UNIFORME' || deletar.tipoObjeto === 'EXPONENCIAL'){
         for( var i = this.state.filaFilas.length; i--;){
           if ( this.state.filaFilas[i].id === deletar.id) {
             console.log('Achei a fila que queria deletar');
             this.state.filaFilas.splice(i, 1);
           }
         }
         var itemsFila = [ ].concat(this.state.filaFilas);
         this.setState({filaFilas: itemsFila});
       } else if(deletar.tipoObjeto === 'CONECTOR'){
         for( var i = this.state.filaConector.length; i--;){
           if ( this.state.filaConector[i].id === deletar.id) {
             console.log('Achei o conector que queria deletar');
             this.state.filaConector.splice(i, 1);
           }
         }
         var itemsConector = [ ].concat(this.state.filaConector);
         this.setState({filaConector: itemsConector});
       } else if(deletar.tipoObjeto === 'SAIDA'){
         for( var i = this.state.filaSaida.length; i--;){
           if ( this.state.filaSaida[i].id === deletar.id) {
             console.log('Achei a saida que queria deletar');
             this.state.filaSaida.splice(i, 1);
           }
         }
         var itemsSaida = [ ].concat(this.state.filaSaida);
         this.setState({filaSaida: itemsSaida});
       } else if(deletar.tipoObjeto === 'ENTRADA'){
         for( var i = this.state.filaEntrada.length; i--;){
           if ( this.state.filaEntrada[i].id === deletar.id) {
             console.log('Achei a entrada que queria deletar');
             this.state.filaEntrada.splice(i, 1);
           }
         }
         var itemsEntrada = [ ].concat(this.state.filaEntrada);
         this.setState({filaEntrada: itemsEntrada});
       }
    });
 }

 onControlledDrag = (e, position) => {
   let newControlledPosition = [].concat(this.state.controlledPositions);

   const {x, y} = position;

   let newPosition = {
     x: x,
     y: y,
     id: e.target.id,
     tipo: e.target.alt,
     targetList: []
   }

   let objetoColidido = this.verificarColisao(newPosition);

   if(newPosition.tipo === 'Fila' && objetoColidido && newPosition.id !== objetoColidido.id) {
     if(objetoColidido.targetList.length === 0){
       let target = {
         tipo: objetoColidido.tipo,
         id: parseInt(objetoColidido.id)
       };

       newPosition.targetList.push(target);
     }
     for(let i = 0; i < objetoColidido.targetList.length; i++){
       if(parseInt(newPosition.id) === parseInt(objetoColidido.targetList[i].id)){
       } else {
          let target = {
            tipo: objetoColidido.tipo,
            id: parseInt(objetoColidido.id)
          };

          newPosition.targetList.push(target);
       }
     }
   } else if (newPosition.tipo === 'Conector' && objetoColidido){
     //tratamento para evitar ocorrência do objeto em outra lista
     if(objetoColidido.targetList.length === 0){
       let target = {
         tipo: objetoColidido.tipo,
         id: parseInt(objetoColidido.id)
       };

       newPosition.targetList.push(target);
     } else {
       for(let i = 0; i < objetoColidido.targetList.length; i++){
         if(parseInt(newPosition.id) === parseInt(objetoColidido.targetList[i].id)){
         } else {
            let target = {
              tipo: objetoColidido.tipo,
              id: parseInt(objetoColidido.id)
            };

            //let novoTargetList = [].concat(newPosition.targetList);
            //novoTargetList.push(target);
            //newPosition.targetList = [].concat(novoTargetList);

            newPosition.targetList.push(target);//ao inveś de mandar objeto, mandar um array
         }
       }
     }
   } else if (newPosition.tipo === 'Entrada' && objetoColidido){
     let target = {
       tipo: objetoColidido.tipo,
       id: parseInt(objetoColidido.id)
     };
     newPosition.targetList.push(target);
   }

   let positionCurrent = (newControlledPosition.filter(pos => pos.id === newPosition.id))[0];

   if (positionCurrent) {
     if(positionCurrent.targetList.length > 0){
       if(objetoColidido && objetoColidido.targetList.length > 0){
         for(let i = 0; i < objetoColidido.targetList.length; i++){
           var containsTarget = positionCurrent.targetList.includes(objetoColidido.targetList[i]);

           if(containsTarget === false){
             positionCurrent.targetList.push(objetoColidido.targetList[i]);
           }
         }
       }

       let currentTarget = positionCurrent.targetList;
       newPosition.targetList = currentTarget;
     }

     let index = newControlledPosition.indexOf(positionCurrent);
     newControlledPosition.splice(index, 1);
   }

   newControlledPosition.push(newPosition);

   this.setState({controlledPositions: newControlledPosition });
   console.log('CONTROLLED POSITIONS: ', this.state.controlledPositions);
 }

 verificarColisao = (position) => {
   let objetosConectaveis = this.buscaArrayConectaveis(position);
   let rP = {x: position.x, y: position.y, width: 20, height: 20};

   let objetoColidido = objetosConectaveis.filter(obj => {
     let rO = {x: obj.x, y: obj.y, width: 20, height: 20};

     if (
       rP.x < rO.x + rO.width &&
       rP.x + rP.width > rO.x &&
       rP.y < rO.y + rO.height &&
       rP.y + rP.height > rO.y
     ) {
       return obj;
     }
   });

   if(objetoColidido.length > 0){
     for(let i = 0; i < objetoColidido.length; i++){
       return objetoColidido[i];
     }
   }

   return null;
 }

 buscaArrayConectaveis = (position) => {
   const relacao = {
     Fila: ['Conector', 'Saida', 'Fila'],
     Conector: ['Saida', 'Fila'],
     Entrada: ['Fila', 'Conector']
   }

   let tiposConectaveis = [];
   if(position.tipo === 'Fila'){
     tiposConectaveis = relacao.Fila;
   } else if (position.tipo === 'Conector'){
     tiposConectaveis = relacao.Conector;
   } else if (position.tipo === 'Entrada'){
     tiposConectaveis = relacao.Entrada;
   }

   return [].concat(this.state.controlledPositions.filter(pos => tiposConectaveis.includes(pos.tipo)));
 }

  trataFilas = () => {
   return(
     this.state.filaFilas.map(item => (
       <FilaEditor objeto={item} onControlledDrag={this.onControlledDrag} controlledPositions={this.state.controlledPositions}/>
     ))
   );
  };

  trataConector = () => {
   return(
     this.state.filaConector.map(item => (
       <ConectorEditor objeto={item} onControlledDrag={this.onControlledDrag} controlledPositions={this.state.controlledPositions} />
     ))
   );
 };

  trataSaida = () => {
   return(
     this.state.filaSaida.map(item => (
       <SaidaEditor objeto={item} onControlledDrag={this.onControlledDrag} controlledPositions={this.state.controlledPositions} />
     ))
   );
 };

  trataEntrada = () => {
   return(
     this.state.filaEntrada.map(item => (
       <EntradaEditor objeto={item} onControlledDrag={this.onControlledDrag} controlledPositions={this.state.controlledPositions} />
     ))
   );
 };

  render(){
    const { classes } = this.props;

    Pubsub.publish('valores-simulacao', {
      conectores: this.state.filaConector,
      filas: this.state.filaFilas,
      entradas: this.state.filaEntrada,
      saidas: this.state.filaSaida,
      controlledPositions: this.state.controlledPositions
    });

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={2}>
        { this.trataFilas() }
        { this.trataConector() }
        { this.trataSaida() }
        { this.trataEntrada() }
        <DialogEditor/>
      </Paper>
      </main>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
