import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Pubsub from 'pubsub-js';
import Validador from '../service/validador.js';

export default class Simulacao extends Component{
  constructor(props){
    super(props);
    this.state = {
      filas: [],
      conectores: [],
      entradas: [],
      saidas: [],
      controlledPositions: [],
      objSimulacao: []
    }
  }

  componentWillMount(){
    Pubsub.subscribe('alteracoes', (topico, dados) => {
      console.log('Os parâmetros de algum objeto foram alterados');
    });

    Pubsub.subscribe('valores-simulacao', (topico, dados) => {
      console.log('Oi, recebi esses dados no Simulacao.js', dados);
      this.setState({filas: dados.filas});
      this.setState({conectores: dados.conectores});
      this.setState({entradas: dados.entradas});
      this.setState({saidas: dados.saidas});
      this.setState({controlledPositions: dados.controlledPositions});
      console.log('VALOR DO MEU STATE NO SIMULACAO DO FRONT: ', this.state);
    });
  }

  tratamentoDadosSimulacao(){
    this.state.objSimulacao = [];

    for(let i = 0; i < this.state.filas.length; i++){
      let id = this.state.filas[i].id;
      let tipo = this.state.filas[i].tipo;
      let capacidade = this.state.filas[i].capacidade;
      let servidores = this.state.filas[i].servidores;
      let minChegada = this.state.filas[i].minChegada;
      let maxChegada = this.state.filas[i].maxChegada;
      let minServico = this.state.filas[i].minServico;
      let maxServico = this.state.filas[i].maxServico;
      let targetList;

      this.state.controlledPositions.filter(function(item){
          if(parseInt(item.id) === parseInt(id)){
            targetList = item.targetList;
            return item.targetList;
          }
      });

      let objTratado = {
        id: id,
        tipo: tipo,
        capacidade: capacidade,
        servidores: servidores,
        minChegada: minChegada,
        maxChegada: maxChegada,
        minServico: minServico,
        maxServico: maxServico,
        targetList: targetList
      };

      this.state.objSimulacao.push(objTratado);
    }

    for(let i = 0; i < this.state.conectores.length; i++){
      let id = this.state.conectores[i].id;
      let tipo = this.state.conectores[i].tipo;
      let probabilidade = this.state.conectores[i].probabilidade;
      let targetList;

      this.state.controlledPositions.filter(function(item){
          if(parseInt(item.id) === parseInt(id)){
            targetList = item.targetList;
            return item.targetList;
          }
      });

      let objTratado = {
        id: id,
        tipo: tipo,
        probabilidade: probabilidade,
        targetList: targetList
      };

      this.state.objSimulacao.push(objTratado);
    }

    for(let i = 0; i < this.state.entradas.length; i++){
      let id = this.state.entradas[i].id;
      let tipo = this.state.entradas[i].tipo;
      let chegada = this.state.entradas[i].chegada;
      let targetList; //não seria o caso de deixar ele iniciar vazio e ~auto-popular?

      this.state.controlledPositions.filter(function(item){
          if(parseInt(item.id) === parseInt(id)){
            targetList = item.targetList;
            return item.targetList;
          }
      });

      let objTratado = {
        id: id,
        tipo: tipo,
        chegada: chegada,
        targetList: targetList
      };

      this.state.objSimulacao.push(objTratado);
    }

    for(let i = 0; i < this.state.saidas.length; i++){
      let id = this.state.saidas[i].id;
      let tipo = this.state.saidas[i].tipo;
      let targetList;

      this.state.controlledPositions.filter(function(item){
          if(parseInt(item.id) === parseInt(id)){
            targetList = item.targetList;
            return item.targetList;
          }
      });

      let objTratado = {
        id: id,
        tipo: tipo,
        targetList: targetList
      };

      this.state.objSimulacao.push(objTratado);
    }
  }

  handleClick = control => event =>{
    this.tratamentoDadosSimulacao();

    let body = this.state.objSimulacao;
    console.log('O QUE TEM NO BODY? ', body);

    if(Validador.validar(body)){
      //POST
      fetch('http://localhost:3001/simulacao', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(body)
      })
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          console.log('RESPONSE - DEU ERRO: ', response);
        }
      })
      .then(retorno => {
        console.log('RESPONSE.JSON: ', retorno);
        Pubsub.publish('post-retorno', {
          retorno: retorno
        });
        this.setState({retorno: retorno});
      })
      .catch(response => { console.log('Estou no catch', response) })
    } else {
      console.log('NÃO DEU POST');
    }
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
