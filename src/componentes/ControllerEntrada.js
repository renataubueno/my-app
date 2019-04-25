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
import EntradaImage from '../images/entrada.png';
import EntradaEditor from './EntradaEditor.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '750px',
    height: '420px',
    marginTop: '0px',
  },
});

class ControllerEntrada extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaEntrada: [],
      open: false,
      chegada: 0
    };
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-entrada', (topico, dadosDaEntrada) => {
      console.log('Chegou : ', dadosDaEntrada.resposta);
      var itemsEntrada = [ ].concat(this.state.filaEntrada);
      itemsEntrada.push(dadosDaEntrada.resposta);
      this.setState({filaEntrada: itemsEntrada});
      console.log('Conteúdo da fila de entrada: ', this.state.filaEntrada);
    });

     Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
        this.setState({filaEntrada: []});
    });

    Pubsub.subscribe('deletar-entrada', (topico, deletarEntrada) => {
       console.log('Valor recebido no deletar-entrada de ID: ', deletarEntrada.id);
       for( var i = this.state.filaEntrada.length; i--;){
         if ( this.state.filaEntrada[i].idEntrada === deletarEntrada.id) {
           console.log('Achei a entrada que queria deletar');
           this.state.filaEntrada.splice(i, 1);
         }
       }
       var itemsEntrada = [ ].concat(this.state.filaEntrada);
       this.setState({filaEntrada: itemsEntrada});
   });
  }

  render(){
    const { classes } = this.props;

    return(
      <div className={classes.root}>
      {
        this.state.filaEntrada.map(item => {
            return <EntradaEditor idEntrada={item.idEntrada}/>
        })
      }

      </div>
    );
  }
}

ControllerEntrada.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ControllerEntrada);
