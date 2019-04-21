import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import SaidaImage from '../images/saida.png';
import SaidaEditor from './SaidaEditor.js';

export default class DialogSaida extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaSaida: [],
      open: false
    };
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

    Pubsub.subscribe('deletar-saida', (topico, deletarSaida) => {
       console.log('Valor recebido no deletar-saida de ID: ', deletarSaida.id);
       for( var i = this.state.filaSaida.length; i--;){
         if ( this.state.filaSaida[i].idSaida === deletarSaida.id) {
           console.log('Achei a saida que queria deletar');
           this.state.filaSaida.splice(i, 1);
         }
       }
       var itemsSaida = [ ].concat(this.state.filaSaida);
       this.setState({filaSaida: itemsSaida});
   });
  }

  render(){
    const { classes } = this.props;
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
      <div>
      {
        this.state.filaSaida.map(item => (
          <SaidaEditor idSaida={item.idSaida}/>
        ))
      }
      </div>
    );
  }
}
