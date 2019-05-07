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

    this.dadosDaSimulacao = {
      fila: [],
      conector: [],
      saida: [],
      entrada: [],
      simulacao: [
        {
          id: 1,
          conexaoDir: 3
        },
        {
          id: 2,
          conexaoDir: 4
        },
        {
          id: 3,
          conexaoEsq: 1,
          conexaoDir: 6
        },
        {
          id: 4,
          conexaoEsq: 2,
          conexaoDir: 7
        },
        {
          id: 5,
          conexaoEsq: 6,
          conexaoEsq: 7,
          conexaoDir: 10
        },
        {
          id: 6,
          conexaoEsq: 3,
          conexaoDir: 5,
          conexaoDir: 8
        },
        {
          id: 7,
          conexaoEsq: 4,
          conexaoDir: 5,
          conexaoDir: 9
        },
        {
          id: 8,
          conexaoEsq: 6
        },
        {
          id: 9,
          conexaoEsq: 7
        },
        {
          id: 10,
          conexaoEsq: 5
        }
      ]
    }
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        console.log('Chegou : ', dadosDaFila);
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.fila);
        this.setState({filaFilas: itemsFila});
        this.dadosDaSimulacao.fila.push(dadosDaFila.fila);
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
        console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)
        Pubsub.publish('alteracoes', {
          dados: dadosDaFila
        });
    });

    Pubsub.subscribe('retorno-conector', (topico, dadosDoConector) => {
       console.log('Chegou : ', dadosDoConector);
       var itemsConector = [ ].concat(this.state.filaConector);
       itemsConector.push(dadosDoConector.conector);
       this.setState({filaConector: itemsConector});
       this.dadosDaSimulacao.conector.push(dadosDoConector.conector);
       console.log('Conteúdo da fila de conectores: ', this.state.filaConector);
       console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)
       Pubsub.publish('alteracoes', {
         dados: dadosDoConector
       });
    });

    Pubsub.subscribe('retorno-saida', (topico, dadosDaSaida) => {
      console.log('Chegou : ', dadosDaSaida);
      var itemsSaida = [ ].concat(this.state.filaSaida);
      itemsSaida.push(dadosDaSaida.saida);
      this.setState({filaSaida: itemsSaida});
      this.dadosDaSimulacao.saida.push(dadosDaSaida.saida);
      console.log('Conteúdo da fila de saidas: ', this.state.filaSaida);
      console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)
      Pubsub.publish('alteracoes', {
        dados: dadosDaSaida
      });
    });

    Pubsub.subscribe('retorno-entrada', (topico, dadosDaEntrada) => {
      console.log('Chegou : ', dadosDaEntrada);
      var itemsEntrada = [ ].concat(this.state.filaEntrada);
      itemsEntrada.push(dadosDaEntrada.entrada);
      this.setState({filaEntrada: itemsEntrada});
      this.dadosDaSimulacao.entrada.push(dadosDaEntrada.entrada);
      console.log('Conteúdo da fila de entrada: ', this.state.filaEntrada);
      console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)
      Pubsub.publish('alteracoes', {
        dados: this.dadosDaSimulacao
      });
    });

    Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
      console.log('Vamos');
      this.setState({filaFilas: []});
      this.setState({filaConector: []});
      this.setState({filaSaida: []});
      this.setState({filaEntrada: []});
      console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)
      Pubsub.publish('alteracoes', {

      });
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
       Pubsub.publish('alteracoes', {
         dados: dadosDaDistribuicao
       });
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
         console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)

         Pubsub.publish('alteracoes', {
         });
       } else if(deletar.tipoObjeto === 'CONECTOR'){
         for( var i = this.state.filaConector.length; i--;){
           if ( this.state.filaConector[i].id === deletar.id) {
             console.log('Achei o conector que queria deletar');
             this.state.filaConector.splice(i, 1);
           }
         }
         var itemsConector = [ ].concat(this.state.filaConector);
         this.setState({filaConector: itemsConector});
         console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)

         Pubsub.publish('alteracoes', {
         });
       } else if(deletar.tipoObjeto === 'SAIDA'){
         for( var i = this.state.filaSaida.length; i--;){
           if ( this.state.filaSaida[i].id === deletar.id) {
             console.log('Achei a saida que queria deletar');
             this.state.filaSaida.splice(i, 1);
           }
         }
         var itemsSaida = [ ].concat(this.state.filaSaida);
         this.setState({filaSaida: itemsSaida});
         console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)

         Pubsub.publish('alteracoes', {
         });
       } else if(deletar.tipoObjeto === 'ENTRADA'){
         for( var i = this.state.filaEntrada.length; i--;){
           if ( this.state.filaEntrada[i].id === deletar.id) {
             console.log('Achei a entrada que queria deletar');
             this.state.filaEntrada.splice(i, 1);
           }
         }
         var itemsEntrada = [ ].concat(this.state.filaEntrada);
         this.setState({filaEntrada: itemsEntrada});
         console.log('Conteúdo do dadosDaSimulacao: ', this.dadosDaSimulacao)

         Pubsub.publish('alteracoes', {
         });
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
   if(newPosition.tipo === 'Entrada') {
     newPosition.target = {
       tipo: 'Fila',
       id: 2
     };
     if(newPosition.target.tipo === 'Fila'){
          newPosition.nextTarget = {
            tipo: 'Conector',
            id: 3
          }
          if(newPosition.nextTarget.tipo === 'Conector'){
            newPosition.nextNextTarget = {
              tipo: ['Saida', 'Fila'],
              id: [4, 5]
            }
          };
     };
   }



   let positionCurrent = (newControlledPosition.filter(pos => pos.id === newPosition.id))[0];

   if (positionCurrent) {
     let index = newControlledPosition.indexOf(positionCurrent);
     newControlledPosition.splice(index, 1);
   }

   newControlledPosition.push(newPosition);
   this.setState({controlledPositions: newControlledPosition });
  }

  trataFilas = () => {
   return(
     this.state.filaFilas.map(item => (
       <FilaEditor objeto={item} onControlledDrag={this.onControlledDrag} controlledPositions={this.state.controlledPositions} />
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

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={2}>
        { this.trataEntrada() }
        { this.trataFilas() }
        { this.trataConector() }
        { this.trataSaida() }
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
