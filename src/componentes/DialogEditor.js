import React, {Component} from 'react';
import Pubsub from 'pubsub-js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FilaUniformeDialog from './FilaUniformeDialog.js';
import FilaExponencialDialog from './FilaExponencialDialog.js';
import ConectorDialog from './ConectorDialog.js';
import SaidaDialog from './SaidaDialog.js';
import EntradaDialog from './EntradaDialog.js';

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

  handleDelete = event => {
    /*Pubsub.publish('deletar', {
      id: this.state.objeto.id,
      tipoObjeto: this.state.tipoObjeto
    });*/

    Pubsub.publish('deletar-fila', {
      id: this.state.objeto.id
    });
  };

  handleDesconectar = event => {
    Pubsub.publish('desconectar', {
      id: this.state.objeto.id
    });
  };

  handleFilaUniforme = () => {
    return (
      <FilaUniformeDialog objeto={this.state.objeto}/>
    );
  };

  handleFilaExponencial = () => {
    return (
      <FilaExponencialDialog objeto={this.state.objeto}/>
    );
  }

  handleConector = () => {
    return (
      <ConectorDialog objeto={this.state.objeto}/>
    );
  };

  handleSaida = () => {
    return (
      <SaidaDialog objeto={this.state.objeto}/>
    );
  };

  handleEntrada = () => {
    return (
      <EntradaDialog objeto={this.state.objeto}/>
    );
  };

  handleDialog = () => {
    if (this.state.tipoObjeto === 'UNIFORME'){
      return(
        this.handleFilaUniforme()
      );
    } else if (this.state.tipoObjeto === 'EXPONENCIAL'){
      return(
        this.handleFilaExponencial()
      );
    } else if (this.state.tipoObjeto === 'CONECTOR'){
      return(
        this.handleConector()
      );
    } else if (this.state.tipoObjeto === 'SAIDA'){
      return(
        this.handleSaida()
      );
    } else if (this.state.tipoObjeto === 'ENTRADA'){
      return(
        this.handleEntrada()
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
          <Button onClick={this.handleDesconectar} color="primary">
            Desconectar Objeto
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
