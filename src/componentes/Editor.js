import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pubsub from 'pubsub-js';

import FilaEditor from './FilaEditor.js';
import DialogEditor from './DialogEditor.js';
import ArrowDrawer from './ArrowDrawer.js'
import ReactDOM from "react-dom";

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
      todosObjetos: [],
      controlledPositions: [],
      paper: {x: 0, y: 0}  // Valores de inicialização, eles são atualizados após o mounting para encontrar o DOM do Paper e pegar suas coordenadas
    }
    this.paper = React.createRef();

  }

  componentWillMount(){
    console.log('Paper', this.paper)
    Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        var itemsFila = [ ].concat(this.state.filaFilas);
        var items = [].concat(this.state.todosObjetos);
        itemsFila.push(dadosDaFila.fila);
        items.push(dadosDaFila.fila);
        this.setState({filaFilas: itemsFila});
        this.setState({todosObjetos: items});
        console.log('TODOSOBJETOS: ', this.state.todosObjetos);
    });

    Pubsub.subscribe('import-json', (topico, importJson) => {
      console.log('IMPORT JSON: ', importJson);
      this.setState({filaFilas: importJson.filas});
      console.log('FILAS APÓS IMPORT JSON: ', this.state.filaFilas);
    });

    Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
      console.log('Vamos');
      this.setState({filaFilas: []});
    });

    Pubsub.subscribe('alteracoes', (topico, alteracoes) => {
      console.log('ALTERACOES RECEBIDAS: ', alteracoes);
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

    /* Remove associações pra evitar inconsistência dos dados */
    Pubsub.subscribe('deletar-fila', (topico, deletar) => {
      let filaParaDeletar = this.state.filaFilas.filter(item => item.id === deletar.id);
      console.log('FILA PARA DELETAR', filaParaDeletar);
      console.log('FILA PARA DELETAR - saidas', filaParaDeletar[0].saidas);

      /* Remover associações que a tenham como origem */
      for(let i = 0; i < filaParaDeletar[0].saidas.length; i++){
        let idDestino = filaParaDeletar[0].saidas[i].destino;

        for(let j = 0; j < this.state.filaFilas.length; j++){
          if(this.state.filaFilas[j].id === idDestino){
            for(let k = 0; k < this.state.filaFilas[j].chegadas.length; k++){
              if(this.state.filaFilas[j].chegadas[k].origem === deletar.id){
                this.state.filaFilas[j].chegadas.splice(k, 1);
              }
            }
          }
        }
      }

      /* Remover associações que a tenham como destino */
      for(let i = 0; i < filaParaDeletar[0].chegadas.length; i++){
        let idOrigem = filaParaDeletar[0].chegadas[i].origem;

        for(let j = 0; j < this.state.filaFilas.length; j++){
          if(this.state.filaFilas[j].id === idOrigem){
            for(let k = 0; k < this.state.filaFilas[j].saidas.length; k++){
              if(this.state.filaFilas[j].saidas[k].destino === deletar.id){
                this.state.filaFilas[j].saidas.splice(k, 1);
              }
            }
          }
        }
      }

      /* Remove a fila da UI - not working*/
      for(let i = 0; i < this.state.filaFilas.length; i++){
        if (this.state.filaFilas[i].id === deletar.id) {
          console.log('Achei a fila que queria deletar', this.state.filaFilas[i]);
          this.state.filaFilas.splice(i, 1);
          let itensFila = [].concat(this.state.filaFilas);
          console.log('ITEMS FILA APÓS DELEÇÃO: ', itensFila);
          console.log('NO FILA FILAS... ', this.state.filaFilas);
        }
      }
    });
 }

 onUpdateCoordinates = (x, y) => {
   this.setState()
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

   newControlledPosition.push(newPosition);

   this.setState({controlledPositions: newControlledPosition });
 }

  trataFilas = () => {
   return(
     this.state.filaFilas.map(item => (
       <FilaEditor objeto={item} onControlledDrag={this.onControlledDrag} paper={this.state.paper} onUpdateCoordinates={this.handleUpdatecoordinates}/>
     ))
   );
  };

  componentDidMount() {
    this.paperInsides = ReactDOM.findDOMNode(this.paper.current)
    this.setState({paper: {
      x: this.paperInsides.getBoundingClientRect().x,
      y: this.paperInsides.getBoundingClientRect().y,}
    })
    console.log(this.state.paper)
  }


  render(){
    const { classes } = this.props;

    Pubsub.publish('valores-simulacao', {
      filas: this.state.filaFilas,
    });

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={2} ref={this.paper}>
        { this.trataFilas() }
        {/* <Arrow/> */}
        <ArrowDrawer filas={this.state.filaFilas}/>
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
