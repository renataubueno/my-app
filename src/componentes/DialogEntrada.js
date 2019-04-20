import React, {Component} from 'react';
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

export default class DialogEntrada extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaEntrada: [],
      open: false,
      chegada: 0
    };

    this._handleDoubleClickEntradaOpen = this._handleDoubleClickEntradaOpen.bind(this);
    this._handleDoubleClickEntradaClose = this._handleDoubleClickEntradaClose.bind(this);
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
  }

  _handleDoubleClickEntradaOpen(event): void {
    this.setState({open: true});
    console.log('Valor do open: ', this.state.open);
  }

  _handleDoubleClickEntradaClose(event): void {
    this.setState({open: false});
  }

  handleChange = chegada => event => {
    this.setState({ [chegada]: parseInt(event.target.value) });
  };

  render(){
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
      <div>
      {
        this.state.filaEntrada.map(item => (
          <Draggable {...settings}>
            <img src={EntradaImage} alt="Entrada" key={this.state.filaEntrada[0].idArrow} height={this.state.filaEntrada[0].height} width={this.state.filaEntrada[0].width} onDoubleClick={this._handleDoubleClickEntradaOpen}/>
          </Draggable>
        ))
      }
      <Dialog open={this.state.open} onClose={this._handleDoubleClickEntradaClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros da Entrada"}
        </DialogTitle>
        <DialogContent>
        <TextField
           id="standard-name"
           label="Momento da primeira chegada:"
           className={'chegada-text-field'}
           value={this.state.chegada}
           onChange={this.handleChange('chegada')}
           margin="normal"
         />
        </DialogContent>
        <DialogActions>
          <Button onClick={this._handleDoubleClickEntradaClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
