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
      console.log('Os parâmetros de algum objeto foram alterados');
    });

    Pubsub.subscribe('controlled-positions', (topico, dados) => {
      console.log('Oi, recebi esses dados no Simulacao.js ', dados);
      this.setState({conexoes: dados});
      console.log('Valor do estado de Simulacao.js: ', this.state.conexoes);
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
      body: JSON.stringify({
        simulacao: [
        {
          id: 1,
          tipo: 'Entrada',
          targetList: [2, 3, 4, 5, 6]
        },
        {
          id: 2,
          tipo: 'Fila',
          targetList: [3, 4, 5, 6]
        },
        {
          id: 3,
          tipo: 'Conector',
          targetList: [4, 5, 6]
        },
        {
          id: 4,
          tipo: 'Saida',
          targetList: []
        },
        {
          id: 5,
          tipo: 'Fila',
          targetList: [6]
        },
        {
          id: 6,
          tipo: 'Saida',
          targetList: []
        }
      ]}
        //this.state.conexoes
      )
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
