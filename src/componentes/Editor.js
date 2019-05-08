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
    width: '800px',
    height: '450px',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '245px',
    marginTop: '175px',
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
        console.log('Chegou : ', dadosDaFila);
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.fila);
        this.setState({filaFilas: itemsFila});
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas[0]);
    });

    Pubsub.subscribe('retorno-conector', (topico, dadosDoConector) => {
       console.log('Chegou : ', dadosDoConector);
       var itemsConector = [ ].concat(this.state.filaConector);
       itemsConector.push(dadosDoConector.conector);
       this.setState({filaConector: itemsConector});
       console.log('Conteúdo da fila de conectores: ', this.state.filaConector);
    });

    Pubsub.subscribe('retorno-saida', (topico, dadosDaSaida) => {
      console.log('Chegou : ', dadosDaSaida);
      var itemsSaida = [ ].concat(this.state.filaSaida);
      itemsSaida.push(dadosDaSaida.saida);
      this.setState({filaSaida: itemsSaida});
      console.log('Conteúdo da fila de saidas: ', this.state.filaSaida);
    });

    Pubsub.subscribe('retorno-entrada', (topico, dadosDaEntrada) => {
      console.log('Chegou : ', dadosDaEntrada);
      var itemsEntrada = [ ].concat(this.state.filaEntrada);
      itemsEntrada.push(dadosDaEntrada.entrada);
      this.setState({filaEntrada: itemsEntrada});
      console.log('Conteúdo da fila de entrada: ', this.state.filaEntrada);
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
     tipo: e.target.alt
   }

   //TODO: criar um script que trate colisão e valide se os objetos são conectáveis
   let objetoColidido = this.verificarColisao(newPosition);

   if(newPosition.tipo === 'Fila' && objetoColidido) {

     newPosition.target = {
       tipo: objetoColidido.tipo,
       id: parseInt(objetoColidido.id)
     }
   }

   let positionCurrent = (newControlledPosition.filter(pos => pos.id === newPosition.id))[0];

   if (positionCurrent) {
     if (positionCurrent.target) {
       let target = positionCurrent.target;
       newPosition.target = target;
     }

     let index = newControlledPosition.indexOf(positionCurrent);
     newControlledPosition.splice(index, 1);
   }

   newControlledPosition.push(newPosition);
   this.setState({controlledPositions: newControlledPosition });
 }

 verificarColisao = (position) => {
   let objetosConectaveis = this.buscaArrayConectaveis(position);
   let rP = {x: position.x, y: position.y, width: 4, height: 4}

   let objetoColidido = objetosConectaveis.filter(obj => {
     let rO = {x: obj.x, y: obj.y, width: 4, height: 4};

     if (
       rP.x < rO.x + rO.width &&
       rP.x + rP.width > rO.x &&
       rP.y < rO.y + rO.height &&
       rP.y + rP.height > rO.y
     ) {
       console.log("rP.x e rO.x e rO.width", rP.x, rO.x, rO.width);
       console.log("rP.x e rP.width e rO.x", rP.x, rP.width, rO.x);
       console.log("rP.y e rO.y e rO.height", rP.y, rO.y, rO.height);
       console.log("rP.y e rP.height e rO.y", rP.y, rP.height, rO.y);
       return obj;
     }
   });
   // Se tiver mais que um, objetoColidido será um array

   if(objetoColidido.length > 0){
     console.log('Objeto colidido: ', objetoColidido[0]);
     return objetoColidido[0]; // Gambi para poder tratar somente um e não se preocupar com o problema da linha 212
   }
   return null;
 }

 buscaArrayConectaveis = (position) => {
   const relacao = {
     Fila: ['Conector', 'Saida'],
     Conector: ['Saida', 'Fila']
   }

   let tiposConectaveis = position.tipo === 'Fila' ? relacao.Fila : relacao.Conector;

   return [].concat(this.state.controlledPositions.filter(pos => tiposConectaveis.includes(pos.tipo)));
 }

  trataFilas = () => {
   return(
     this.state.filaFilas.map(item => (
       <FilaEditor objeto={item} onControlledDrag={this.onControlledDrag} />
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
       <SaidaEditor objeto={item} />
     ))
   );
 };

  trataEntrada = () => {
   return(
     this.state.filaEntrada.map(item => (
       <EntradaEditor objeto={item} />
     ))
   );
 };

  render(){
    const { classes } = this.props;

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
