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
import TextField from '@material-ui/core/TextField';
import ConectorImage from '../images/conector.png';
import ConectorEditor from './ConectorEditor.js';

export default class DialogConector extends Component{
  constructor(props){
    super(props);
    this.state = {
      filaConector: [],
      open: false,
      probabilidade: 100
    };

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

    Pubsub.subscribe('deletar-conector', (topico, deletarConector) => {
       console.log('Valor recebido no deletar-conector de ID: ', deletarConector.id);
       for( var i = this.state.filaConector.length; i--;){
         if ( this.state.filaConector[i].idConector === deletarConector.id) {
           console.log('Achei o conector que queria deletar');
           this.state.filaConector.splice(i, 1);
         }
       }
       var itemsConector = [ ].concat(this.state.filaConector);
       this.setState({filaConector: itemsConector});
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
        this.state.filaConector.map(item => (
          <ConectorEditor idConector={item.idConector} />
        ))
      }
      </div>
    );
  }
}
