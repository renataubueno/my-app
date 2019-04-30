import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Pubsub from 'pubsub-js';

export default class Simulacao extends Component{
  componentWillMount(){
    Pubsub.subscribe('alteracoes', (topico, dados) => {
      console.log('Oi, recebi esses dados no Simulacao.js ', dados);
    });
  }

  /*handleClick = control => event =>{
   const requestInfo = {
     method: 'GET'
   }

   fetch('http://localhost:3000/fila', requestInfo)
     .then(response => {
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Não foi possível comentar');
      }
    })
    .then(fila => {
      console.log('Resposta: ', fila);

      Pubsub.publish('retorno-fila-backend', {
        id: fila[0].id,
        resposta: fila
      });
    });
 }*/

  render(){
    return(
      <div>
      <Button variant="contained" /*onClick={this.handleClick('control')}*/>
        Iniciar Simulação
      </Button>
      </div>
    );
  }
}
