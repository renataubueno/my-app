import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Pubsub from 'pubsub-js';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class ListaAssociacao extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      todasAssociacoes: []
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
    Pubsub.subscribe('associacoes-feitas', (topico, dados) => {
      console.log('Associações recebidas no ListaASsociacoes.js: ', dados);
      this.setState({todasAssociacoes: dados.associacoes});
      console.log('Associações após a criação de uma nova: ', this.state.todasAssociacoes);
    });

    Pubsub.subscribe('dessassociar', (topico, dados) => {
      console.log('Desassociar no ListaASsociacoes.js: ', dados);

      for(let i = 0; i < this.state.todasAssociacoes.length; i++){
        if(this.state.todasAssociacoes[i].origem === dados.origem && this.state.todasAssociacoes[i].destino === dados.destino){
          this.state.todasAssociacoes.splice(i, 1);
          console.log('TODAS ASSOCIAÇÕES APÓS DESASSOCIAR: ', this.state.todasAssociacoes);
        }
      }
    });

    Pubsub.subscribe('deletar-fila', (topico, dados) => {
      console.log('Deletar no ListaASsociacoes.js: ', dados);

      for(let i = 0; i < this.state.todasAssociacoes.length; i++){
        if(this.state.todasAssociacoes[i].origem === dados.id || this.state.todasAssociacoes[i].destino === dados.id){
          this.state.todasAssociacoes.splice(i, 1);
          i--;
          console.log('TODAS ASSOCIAÇÕES APÓS DELETAR: ', this.state.todasAssociacoes);
        }
      }
    });
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
    return(
      <div>
      <Button variant="contained" onClick={this.handleClickOpen} /*className={classes.button}*/>
        Todas Associações Existentes
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Todas Associações Existentes"}
        </DialogTitle>
        <DialogContent>
          {
            this.state.todasAssociacoes.map(item => (
              <Typography key={item}  align="center" variant="body1" color="primary" noWrap>
                ORIGEM: {item.origem}   DESTINO: {item.destino}
              </Typography>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Fechar Janela
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
