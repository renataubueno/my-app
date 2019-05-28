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

export default class Associar extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      filaFilas: [],
      valueOrigem: 'Valor',
      valueDestino: 'Valor',
      valuePorcentagem: 0
    };

    this.filaSelecionadaOrigem = this.filaSelecionadaOrigem.bind(this);
    this.filaSelecionadaDestino = this.filaSelecionadaDestino.bind(this);
  }

  filaSelecionadaOrigem(event) {
    if(event.target.value === 'Entrada'){
      console.log('PRECISO ABRIR UM CAMPO PRA ADICIONAR A OPÇÃO DE COLOCAR O VALOR PRA ENTRADA');
    }

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
        console.log('RETORNO DA FILA NA ASSOCIACAO: ', this.state.filaFilas);
    });
  }

  handleChange = parametro => event => {
    console.log('State da Associação', this.state);
    console.log('event.target.value da associação', event.target.value);
    this.setState({valuePorcentagem: event.target.value});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleCloseSalvar = () => {
    console.log('FILAS FILAS ASSOCIACAO: ', this.state.filaFilas);
    console.log('valueOrigem ASSOCIACAO: ', this.state.valueOrigem);
    console.log('valueDestino ASSOCIACAO: ', this.state.valueDestino);
    console.log('valuePorcentagem ASSOCIACAO: ', this.state.valuePorcentagem);

    let chegada = {
      origem: this.state.valueOrigem,
      porcentagem: this.state.valuePorcentagem
    };

    let saida = {
      destino: this.state.valueDestino,
      porcentagem: this.state.valuePorcentagem
    };

    let filaOrigem = this.state.filaFilas.filter(item => item.id === this.state.valueOrigem);
    let filaDestino = this.state.filaFilas.filter(item => item.id === this.state.valueDestino);

    console.log('filaorigem ASSOCIACAO: ', filaOrigem);
    console.log('filadestino ASSOCIACAO: ', filaDestino);

    /* Se tiver alguma fila de origem, ela deve ter uma saída, apontando para que saída e a probabilidade */
    if(filaOrigem.length > 0){
      filaOrigem[0].saidas.push(saida);
    }

    /* Se tiver alguma fila de destino, ela deve ter uma chegada, apontando para que chegada e a probabilidade */
    if(filaDestino.length > 0){
      filaDestino[0].chegadas.push(chegada);
    }

    Pubsub.publish('associacoes-feitas', {
        filasAssociadas: this.state.filaFilas
    });

    this.setState({valueOrigem: 'Valor',});
    this.setState({valueDestino: 'Valor',});
    this.setState({valuePorcentagem: 0});
    this.setState({open: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
    return(
      <div>
      <Button variant="contained" onClick={this.handleClickOpen} /*className={classes.button}*/>
        Associar Filas
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Associação de Filas"}
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
           <DialogContentText id="alert-dialog-description">
             Porcentagem:
           </DialogContentText>
           <TextField
              id="standard-name"
              className={'porcentagem-text-field'}
              porcentagem={this.state.valuePorcentagem}
              onChange={this.handleChange('porcentagem')}
              margin="normal"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseSalvar} color="primary">
            Salvar Associação
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
