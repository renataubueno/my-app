import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';
import FilaImage from '../images/fila.png';
import FilaEditorExp from './FilaEditorExp.js';
import FilaEditorUnif from './FilaEditorUnif.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    position: 'relative',
    //width: '800px',
    //height: '450px',
    //alignItems: 'center',
    //marginLeft: '245px',
    //marginTop: '175px',
    //...theme.mixins.gutters(),
    //paddingTop: theme.spacing.unit * 4,
    //paddingBottom: theme.spacing.unit * 5,
  },
});

class ControllerFila extends Component{
  constructor(props){
    super(props);
    this.state = {
      idFila: 0,
      filaFilas: [],
      filaExp: [],
      filaUnif: [],
      open: false,
      value: '',
      showUniforme: false,
      showExponencial: false,
      servidores: 0,
      capacidade: 0
    };

  }

  componentWillMount(){
     Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        console.log('Chegou : ', dadosDaFila.resposta);
        if(this.state.value === 'Uniforme'){
          console.log('Estado inicial: UNIFORME');
          var itemsFila = [ ].concat(this.state.filaUnif);
          itemsFila.push(dadosDaFila.resposta);
          this.setState({filaUnif: itemsFila});
          console.log('Conteúdo da fila uniforme: ', this.state.filaUnif);
        } else if (this.state.value === 'Exponencial'){
          console.log('Estado inicial: EXPONENCIAL');
          var itemsFila = [ ].concat(this.state.filaExp);
          itemsFila.push(dadosDaFila.resposta);
          this.setState({filaExp: itemsFila});
          console.log('Conteúdo da fila exponencial: ', this.state.filaExp);
        } else {
          console.log('Estado inicial: SEM DISTRIBUIÇÃO');
          var itemsFila = [ ].concat(this.state.filaFilas);
          itemsFila.push(dadosDaFila.resposta);
          this.setState({filaFilas: itemsFila});
          console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
        }
     });

     Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
        this.setState({filaFilas: []});
    });

     Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
        this.setState({value: dadosDaDistribuicao.distribuicao});
        if(this.state.value === 'Uniforme'){
          this.setState( { showUniforme: true } )
          this.setState( { showExponencial: false } )
          this.setState({filaUnif: this.state.filaFilas});
          this.setState({filaExp: [ ]});
          this.setState({filaFilas: [ ]});
          console.log('Alterei para UNIFORME');
          console.log('valor da UNIFORME: ', this.state.filaUnif);
        } else if (this.state.value === 'Exponencial'){
          this.setState( { showUniforme: false } )
          this.setState( { showExponencial: true } )
          this.setState({filaExp: this.state.filaFilas});
          this.setState({filaFilas: [ ]});
          this.setState({filaUnif: [ ]});
          console.log('Alterei para EXPONENCIAL');
          console.log('valor da EXPONENCIAL: ', this.state.filaExp);
        } else {
          this.setState( { showUniforme: false } )
          this.setState( { showExponencial: false } )
          if(this.state.filaUnif != [ ]){
            this.setState({filaUnif: [ ]});
          }
          if(this.state.filaExp != [ ]) {
            this.setState({filaExp: [ ]});
          }
          console.log('Alterei para SEM DISTRIBUICAO');
          console.log('valor da SEM DISTRIBUICAO: ', this.state.filaFilas);
        }
    });

    Pubsub.subscribe('deletar-fila-exp', (topico, deletarFila) => {
       console.log('Valor recebido no deletar-fila de ID: ', deletarFila.id);
       for( var i = this.state.filaFilas.length; i--;){
         if ( this.state.filaFilas[i].idFila === deletarFila.id) {
           console.log('Achei a fila que queria deletar');
           this.state.filaFilas.splice(i, 1);
         }
       }
       var itemsFila = [ ].concat(this.state.filaFilas);
       this.setState({filaFilas: itemsFila});
   });

   Pubsub.subscribe('deletar-fila-unif', (topico, deletarFila) => {
      console.log('Valor recebido no deletar-fila de ID: ', deletarFila.id);
      for( var i = this.state.filaFilas.length; i--;){
        if ( this.state.filaFilas[i].idFila === deletarFila.id) {
          console.log('Achei a fila que queria deletar');
          this.state.filaFilas.splice(i, 1);
        }
      }
      var itemsFila = [ ].concat(this.state.filaFilas);
      this.setState({filaFilas: itemsFila});
    });
  }

  render(){
    const { classes } = this.props;
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
      <div className={classes.root}>
      {
        this.state.filaExp.map(item => (
          <FilaEditorExp idFila={item.idFila}/>
        ))
      }
      {
        this.state.filaUnif.map(item => (
          <FilaEditorUnif idFila={item.idFila}/>
        ))
      }
      {
        this.state.filaFilas.map(item => (
          <Draggable {...settings}>
            <img src={FilaImage} alt="Fila" idFila={item.idFila} height={item.height} width={item.width} capacidade={item.capacidade} servidores={item.servidores} />
          </Draggable>
        ))
      }
      </div>
    );
  }
}

ControllerFila.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ControllerFila);
