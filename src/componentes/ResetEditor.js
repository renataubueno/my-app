import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Pubsub from 'pubsub-js';

/* Componente criado para mandar a ordem de limpeza do editor */
/* Executado no Editor.js */
export default class ResetEditor extends Component{
  handleClick = control => event =>{
    console.log('Vamos limpar o editor?');
    Pubsub.publish('retorno-limpar-editor', {
    });
  }

  render(){
    return(
      <div>
      <Button variant="contained" onClick={ this.handleClick('control') }>
        Limpar Editor
      </Button>
      </div>
    );
  }
}
