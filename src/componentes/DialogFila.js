import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import FormMenuDistribuicaoExponencial from './FormMenuDistribuicaoExponencial.js';
import FormMenuDistribuicaoUniforme from './FormMenuDistribuicaoUniforme.js';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';
import FilaImage from '../images/fila.png';

export default class DialogFila extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaFilas: [],
      open: false,
      value: '',
      capacidade: 0,
      servidores: 0,
      showUniforme: false,
      showExponencial: false
    };

    this._handleDoubleClickFilaOpen = this._handleDoubleClickFilaOpen.bind(this);
    this._handleDoubleClickFilaClose = this._handleDoubleClickFilaClose.bind(this);
  }

  componentWillMount(){
     Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        console.log('Chegou : ', dadosDaFila.resposta);
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.resposta);
        this.setState({filaFilas: itemsFila});
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
     });

     Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
        this.setState({filaFilas: []});
    });

     Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
        this.setState({value: dadosDaDistribuicao.distribuicao});
    });
  }

  _handleDoubleClickFilaOpen(event): void {
    this.setState({open: true});
    if(this.state.value === 'Uniforme'){
      this.setState( { showUniforme: true } )
      this.setState( { showExponencial: false } )
    } else if (this.state.value === 'Exponencial'){
      this.setState( { showUniforme: false } )
      this.setState( { showExponencial: true } )
    } else {
      this.setState( { showUniforme: false } )
      this.setState( { showExponencial: false } )
    }
  }

  _handleDoubleClickFilaClose(event): void {
    this.setState({open: false});
  }

  handleChangeCapacidade = capacidade => event => {
    this.setState({ capacidade: parseInt(event.target.value, 10) });
    console.log('Entrei aqui e meu valor da capacidade agora é: ', this.state.capacidade)
  };

  handleChangeServidores = servidores => event => {
    this.setState({ servidores: parseInt(event.target.value, 10) });
    console.log('Entrei aqui e meu valor de servidores agora é: ', this.state.servidores)
  };

  render(){
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
      <div>
      {
        this.state.filaFilas.map(item => (
          <Draggable {...settings}>
            <img src={FilaImage} alt="Fila" key={this.state.filaFilas[0].idFila} height={this.state.filaFilas[0].height} width={this.state.filaFilas[0].width} onDoubleClick={this._handleDoubleClickFilaOpen}/>
          </Draggable>
        ))
      }
      <Dialog open={this.state.open} onClose={this._handleDoubleClickFilaClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros da Fila"}
        </DialogTitle>
        <DialogContent>
        <TextField
           id="standard-name"
           label="Capacidade"
           className={'capacidade-text-field'}
           value={this.state.capacidade}
           onChange={this.handleChangeCapacidade('capacidade')}
           margin="normal"
         />
         <TextField
            id="standard-name"
            label="Número de Servidores"
            className={'servidores-text-field'}
            value={this.state.servidores}
            onChange={this.handleChangeServidores('servidores')}
            margin="normal"
          />
        { this.state.showExponencial && <FormMenuDistribuicaoExponencial/> }
        { this.state.showUniforme && <FormMenuDistribuicaoUniforme />}
        </DialogContent>
        <DialogActions>
          <Button onClick={this._handleDoubleClickFilaClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
