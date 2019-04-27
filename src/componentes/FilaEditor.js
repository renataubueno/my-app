import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Objeto from './Objeto.js';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';

import FilaImage from '../images/fila.png';

export default class FilaEditor extends Objeto {
  constructor(props){
    super(props);

    this.state = {
      capacidade: 0,
      servidores: 0,
      minChegada: 0,
      maxChegada: 0,
      minServico: 0,
      maxServico: 0,
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
    this._handleDoubleClickClose = this._handleDoubleClickClose.bind(this);
  }

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
      id: this.props.objeto.id
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
          value={this.props.objeto.id}
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

  render(){
    return(
    <div>
      <Draggable {...this.settings}>
        <img src={FilaImage} alt="Fila" {...this.dadosDoObjeto} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
      <Dialog open={this.state.open} onClose={this._handleDoubleClickClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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
    </div>
    );
  }
}
