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

class DialogFila extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaFilas: [],
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
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.resposta);
        this.setState({filaFilas: itemsFila});
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
     });

     Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
        this.setState({filaFilas: []});
    });

     Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
        this.setState({value: dadosDaDistribuicao.distribuicao});
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

    return(
      <div className={classes.root}>
      {
        this.state.filaFilas.map(item => (
          <FilaEditorExp idFila={item.idFila}/>
          //{this.state.showExponencial && <FilaEditorExp idFila={item.idFila}/>}
          //{this.state.showUniforme && <FilaEditorUnif idFila={item.idFila}/>}
        ))
      }
      </div>
    );
  }
}

DialogFila.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DialogFila);
