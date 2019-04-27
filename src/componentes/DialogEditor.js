import React, {Component} from 'react';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FilaUniformeDialog from './FilaUniformeDialog.js';

export default class DialogEditor extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
      tipoObjeto: '',
      objeto: {}
    }

    this._handleDoubleClickClose = this._handleDoubleClickClose.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('double-click', (topico, dados) => {
      console.log('Chegou double-click: ', dados);
      this.setState({open: true, tipoObjeto: dados.tipoObjeto, objeto: dados.objeto});
   });
  }

  _handleDoubleClickClose(event): void {
    this.setState({open: false});
  }

  /*handleChange = parametro => event => {
    console.log('State do DialogEditor', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
  };*/

  handleDelete = event => {
    console.log('Clicou no delete - fila');
  };

  handleFilaUniforme = () => {
    return (
      <FilaUniformeDialog objeto={this.state.objeto}/>
    );
  };

  handleDialog = () => {
    if(this.state.tipoObjeto === 'UNIFORME'){
      return(
        this.handleFilaUniforme()
      );
    }
    return(
      'avocado'
    );
  };

  render(){
    return(
      <Dialog open={this.state.open} onClose={this._handleDoubleClickClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros"}
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
    );
  }
}
