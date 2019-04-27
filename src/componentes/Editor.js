import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pubsub from 'pubsub-js';
import Draggable from 'react-draggable';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
      openDialogEditor: false,
      open: false,
      id: 0,
      capacidade: 0,
      servidores: 0,
      minChegada: 0,
      maxChegada: 0,
      minServico: 0,
      maxServico: 0,
    }

    //this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
    //this._handleDoubleClickClose = this._handleDoubleClickClose.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        console.log('Chegou : ', dadosDaFila.resposta);
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.resposta);
        this.setState({filaFilas: itemsFila});
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
    });

    Pubsub.subscribe('retorno-conector', (topico, dadosDoConector) => {
       console.log('Chegou : ', dadosDoConector.resposta);
       var itemsConector = [ ].concat(this.state.filaConector);
       itemsConector.push(dadosDoConector.resposta);
       this.setState({filaConector: itemsConector});
       console.log('Conteúdo da fila de conectores: ', this.state.filaConector);
    });

    Pubsub.subscribe('retorno-saida', (topico, dadosDaSaida) => {
      console.log('Chegou : ', dadosDaSaida.resposta);
      var itemsSaida = [ ].concat(this.state.filaSaida);
      itemsSaida.push(dadosDaSaida.resposta);
      this.setState({filaSaida: itemsSaida});
      console.log('Conteúdo da fila de saidas: ', this.state.filaSaida);
    });

    Pubsub.subscribe('retorno-entrada', (topico, dadosDaEntrada) => {
      console.log('Chegou : ', dadosDaEntrada.resposta);
      var itemsEntrada = [ ].concat(this.state.filaEntrada);
      itemsEntrada.push(dadosDaEntrada.resposta);
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

    /*Pubsub.subscribe('double-click', (topico, dados) => {
      console.log('Chegou double-click: ', dados);
      this.setState({openDialogEditor: true});
    });*/
 }

  trataFilas = () => {
   return(
     this.state.filaFilas.map(item => (
       <FilaEditor objeto={item} />
     ))
   );
  };

  trataConector = () => {
   return(
     this.state.filaConector.map(item => (
       <ConectorEditor objeto={item} />
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

  /*
   _handleDoubleClickOpen(event): void {
     this.setState({open: true});
   }

   _handleDoubleClickClose(event): void {
     this.setState({open: false});
   }

   handleChange = parametro => event => {
     this.setState({ [parametro]: parseInt(event.target.value) });
   };

   handleDelete = event => {
     Pubsub.publish('deletar-fila-unif', {
       id: 'this.props.objeto.id'
     });
   };

   handleDialog = () => {
     return (
       <DialogContent>
       <TextField
          id="standard-name"
          label="Servidores:"
          className={'chegada-text-field'}
          value={this.state.servidores}
          onChange={this.handleChange('servidores')}
          margin="normal"
        />
        <TextField
           id="standard-name"
           label="Capacidade:"
           className={'capacidade-text-field'}
           value={this.state.capacidade}
           onChange={this.handleChange('capacidade')}
           margin="normal"
         />
        <TextField
           id="standard-name"
           label="id da Fila"
           className={'idFila-text-field'}
           value={this.state.id}
           margin="normal"
         />
         <TextField
            id="standard-name"
            label="Número Mínimo de Chegadas"
            className={'condicao-min-chegada-text-field'}
            value={this.state.minChegada}
            onChange={this.handleChange('minChegada')}
            margin="normal"
          />
          <TextField
             id="standard-name"
             label="Número Máximo de Chegadas"
             className={'condicao-max-chegada-text-field'}
             value={this.state.maxChegada}
             onChange={this.handleChange('maxChegada')}
             margin="normal"
           />
           <TextField
              id="standard-name"
              label="Número Mínimo de Serviço"
              className={'condicao-min-servico-text-field'}
              value={this.state.minServico}
              onChange={this.handleChange('minServico')}
              margin="normal"
            />
            <TextField
               id="standard-name"
               label="Número Máximo de Serviço"
               className={'condicao-max-servico-text-field'}
               value={this.state.maxServico}
               onChange={this.handleChange('maxServico')}
               margin="normal"
             />
       </DialogContent>
     );
   };
 */
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
        {/*<Dialog open={this.state.open} onClose={this._handleDoubleClickClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Parâmetros da Fila"}
          </DialogTitle>
          {this.handleDialog()}
          <DialogActions>
            <Button onClick={this._handleDoubleClickClose} color="primary">
              Ok
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Deletar Objeto
            </Button>
          </DialogActions>
        </Dialog>
        */}
      </Paper>
      </main>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
