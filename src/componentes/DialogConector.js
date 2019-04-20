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
import ConectorImage from '../images/conector.png';

export default class DialogConector extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaConector: [],
      open: false,
      probabilidade: 100
    };

    this._handleDoubleClickConectorOpen = this._handleDoubleClickConectorOpen.bind(this);
    this._handleDoubleClickConectorClose = this._handleDoubleClickConectorClose.bind(this);
  }

  componentWillMount(){
    Pubsub.subscribe('retorno-conector', (topico, dadosDoConector) => {
      console.log('Chegou : ', dadosDoConector.resposta);
      var itemsConector = [ ].concat(this.state.filaConector);
      itemsConector.push(dadosDoConector.resposta);
      this.setState({filaConector: itemsConector});
      console.log('Conteúdo da fila de conectores: ', this.state.filaConector);
   });

     Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
        this.setState({filaConector: []});
    });
  }

  _handleDoubleClickConectorOpen(event): void {
    this.setState({open: true});
  }

  _handleDoubleClickConectorClose(event): void {
    this.setState({open: false});
  }

  handleChange = probabilidade => event => {
    this.setState({ [probabilidade]: parseInt(event.target.value) });
  };

  render(){
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
      <div>
      {
        this.state.filaConector.map(item => (
          <Draggable {...settings}>
            <img src={ConectorImage} alt="Conector" key={this.state.filaConector[0].idConector} height={this.state.filaConector[0].height} width={this.state.filaConector[0].width} onDoubleClick={this._handleDoubleClickConectorOpen}/>
          </Draggable>
        ))
      }
      <Dialog open={this.state.open} onClose={this._handleDoubleClickConectorClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros do Conector"}
        </DialogTitle>
        <DialogContent>
        <TextField
           id="standard-name"
           label="Probabilidade aplicada ao canal superior (em porcentagem)"
           className={'probabilidade-text-field'}
           value={this.state.probabilidade}
           onChange={this.handleChange('probabilidade')}
           margin="normal"
         />
        </DialogContent>
        <DialogActions>
          <Button onClick={this._handleDoubleClickConectorClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
