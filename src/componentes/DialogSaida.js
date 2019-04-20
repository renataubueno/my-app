import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import SaidaImage from '../images/saida.png';

export default class DialogSaida extends Component{
  constructor(props){
    super(props);
    this.state = {
            filaSaida: [],
      open: false
    };

    this._handleDoubleClickSaidaOpen = this._handleDoubleClickSaidaOpen.bind(this);
    this._handleDoubleClickSaidaClose = this._handleDoubleClickSaidaClose.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-saida', (topico, dadosDaSaida) => {
      console.log('Chegou : ', dadosDaSaida.resposta);
      var itemsSaida = [ ].concat(this.state.filaSaida);
      itemsSaida.push(dadosDaSaida.resposta);
      this.setState({filaSaida: itemsSaida});
      console.log('Conteúdo da fila de saidas: ', this.state.filaSaida);
   });

     Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
        this.setState({filaSaida: []});
    });
  }

  _handleDoubleClickSaidaOpen(event): void {
    this.setState({open: true});
    console.log('Valor do open: ', this.state.open);
  }

  _handleDoubleClickSaidaClose(event): void {
    this.setState({open: false});
  }

  render(){
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
      <div>
      {
        this.state.filaSaida.map(item => (
          <Draggable {...settings}>
          <img src={SaidaImage} alt="TRIANGLE" key={this.state.filaSaida[0].idTriangle} height={this.state.filaSaida[0].height} width={this.state.filaSaida[0].width} onDoubleClick={this._handleDoubleClickSaidaOpen} />
          </Draggable>
        ))
      }
      <Dialog open={this.state.open} onClose={this._handleDoubleClickSaidaClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros da Saída"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={this._handleDoubleClickSaidaClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
