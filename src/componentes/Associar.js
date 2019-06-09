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
      todasAssociacoes: [],
      valueOrigem: 'Valor',
      valueDestino: 'Valor',
      valuePorcentagem: 0,
      valueChegada: 0
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
        console.log('RETORNO DA FILA NA ASSOCIACAO: ', this.state.filaFilas);
    });

    Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
      console.log('Vamos');
      this.setState({todasAssociacoes: []});
      this.setState({filaFilas: []});
    });
  }

  handleChangePorcentagem = parametro => event => {
    console.log('State da Associação', this.state);
    console.log('event.target.value da associação', event.target.value);
    this.setState({valuePorcentagem: event.target.value});
  };

  handleChangeChegada = parametro => event => {
    console.log('State da Associação', this.state);
    console.log('event.target.value da associação', event.target.value);
    this.setState({valueChegada: event.target.value});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleCloseSalvar = () => {
    console.log('FILAS FILAS ASSOCIACAO: ', this.state.filaFilas);
    console.log('valueOrigem ASSOCIACAO: ', this.state.valueOrigem);
    console.log('valueDestino ASSOCIACAO: ', this.state.valueDestino);
    console.log('valuePorcentagem ASSOCIACAO: ', this.state.valuePorcentagem);
    console.log('valueChegada ASSOCIACAO: ', this.state.valueChegada);

    let jaExiste = false;

    for(let i = 0; i < this.state.todasAssociacoes.length; i++){
    	if(this.state.todasAssociacoes[i].origem === this.state.valueOrigem && this.state.todasAssociacoes[i].destino === this.state.valueDestino){
    		jaExiste = true;
    		break;
    	}
    };

    if(jaExiste){
	     alert('Associação inserida já existe');
    } else {
      let associacao = {
        origem: this.state.valueOrigem,
        destino: this.state.valueDestino
      }

      this.state.todasAssociacoes.push(associacao);


      if(this.state.valueOrigem === 'Entrada'){
        let chegada = {
          origem: this.state.valueOrigem,
          porcentagem: this.state.valuePorcentagem,
          chegada: this.state.valueChegada
        };

        let filaDestino = this.state.filaFilas.filter(item => item.id === this.state.valueDestino);

        /* Se tiver alguma fila de destino, ela deve ter uma chegada, apontando para que chegada e a probabilidade */
        if(filaDestino.length > 0){
          filaDestino[0].chegadas.push(chegada);
        }
      } else {
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
      }

      Pubsub.publish('associacoes-feitas', {
          filas: this.state.filaFilas,
          associacoes: this.state.todasAssociacoes
      });

      Pubsub.publish('atualizar-coordenadas', {
      });

      Pubsub.publish('lista-conexoes', {
      });

      Pubsub.publish('atualizar-flechas', {
      });
    }

    Pubsub.publish('atualizar-coordenadas', {
    });

    Pubsub.publish('lista-conexoes', {
    });

    Pubsub.publish('atualizar-flechas', {
    });


    this.setState({valueOrigem: 'Valor',});
    this.setState({valueDestino: 'Valor',});
    this.setState({valuePorcentagem: 0});
    this.setState({valueChegada: 0});

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
            Valor da Entrada (se necessário):
          </DialogContentText>
          <TextField
             id="standard-name"
             className={'chegada-text-field'}
             chegada={this.state.valueChegada}
             onChange={this.handleChangeChegada('chegada')}
             margin="normal"
           />
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
              onChange={this.handleChangePorcentagem('porcentagem')}
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
