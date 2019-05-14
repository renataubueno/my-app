import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Pubsub from 'pubsub-js';

export default class Simulacao extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    Pubsub.subscribe('alteracoes', (topico, dados) => {
      console.log('Oi, recebi esses dados no Simulacao.js ', dados);
      this.setState({state: dados});
      console.log('Valor do estado de Simulacao.js: ', this.state);
    });
  }

  handleClick = control => event =>{
    //GET
    fetch('http://localhost:3001/simulacao')
    .then(response => {
      if(response.ok){
        return response.json();
      }else{
        throw new Error('Não foi possível acessar simulacao');
      }
    })
    .then(simulacao => {
      console.log('Resposta: ', simulacao);
    });

    //POST
    fetch('http://localhost:3001/simulacao', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({a: 1, b: 2})
    })
    .then(function(res){ console.log('Estou no then: ', res) })
    .catch(function(res){ console.log('Estou no catch', res) })
 }

  render(){
    return(
      <div>
      <Button variant="contained" onClick={this.handleClick('control')}>
        Iniciar Simulação
      </Button>
      </div>
    );
  }
}
