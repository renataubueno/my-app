import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Pubsub from 'pubsub-js';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class Desassociar extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      filaFilas: [],
      valueOrigem: 'Valor',
      valueDestino: 'Valor',
    };

    this.filaSelecionadaOrigem = this.filaSelecionadaOrigem.bind(this);
    this.filaSelecionadaDestino = this.filaSelecionadaDestino.bind(this);
  }

  filaSelecionadaOrigem(event) {
    this.setState({valueOrigem: event.target.value});
  }

  filaSelecionadaDestino(event) {
    this.setState({valueDestino: event.target.value});
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.fila);
        this.setState({filaFilas: itemsFila});
        console.log('RETORNO DA FILA NA DESASSOCIACAO: ', this.state.filaFilas);
    });
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleCloseSalvar = () => {
    Pubsub.publish('dessassociar', {
        origem: this.state.valueOrigem,
        destino: this.state.valueDestino
    });

    for(let i = 0; i < this.state.filaFilas.length; i++){
      if(this.state.filaFilas[i].id === this.state.valueOrigem){
        for(let j = 0; j < this.state.filaFilas[i].saidas.length; j++){
          if(this.state.filaFilas[i].saidas[j].destino === this.state.valueDestino){
            this.state.filaFilas[i].saidas.splice(j, 1);
          }
        }
      }

      if(this.state.filaFilas[i].id === this.state.valueDestino){
        for(let k = 0; k < this.state.filaFilas[i].chegadas.length; k++){
          if(this.state.filaFilas[i].chegadas[k].origem === this.state.valueOrigem){
            this.state.filaFilas[i].chegadas.splice(k, 1);
          }
        }
      }
    }

    this.setState({valueOrigem: 'Valor',});
    this.setState({valueDestino: 'Valor',});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
    return(
      <div>
      <Button variant="contained" onClick={this.handleClickOpen} /*className={classes.button}*/>
        Desassociar Filas
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Desassociação de Filas"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Origem:
          </DialogContentText>
          <Select value={this.state.valueOrigem} onChange={this.filaSelecionadaOrigem}>
            <MenuItem value="">
              <em>Origem</em>
            </MenuItem>
            <MenuItem value={'Entrada'}>Entrada</MenuItem>
            {this.state.filaFilas.map(item => (
              <MenuItem value={item.id}>{item.id}</MenuItem>
            ))}
          </Select>
           <DialogContentText id="alert-dialog-description">
             Destino:
           </DialogContentText>
           <Select value={this.state.valueDestino} onChange={this.filaSelecionadaDestino}>
             <MenuItem value="">
               <em>Destino</em>
             </MenuItem>
             <MenuItem value={'Saída'}>Saída</MenuItem>
             {this.state.filaFilas.map(item => (
               <MenuItem value={item.id}>{item.id}</MenuItem>
             ))}
           </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseSalvar} color="primary">
            Salvar Mudanças
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Fechar Janela
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
