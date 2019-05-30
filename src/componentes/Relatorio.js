import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Pubsub from 'pubsub-js';
import { PieChart } from 'react-charts-d3';

export default class Relatorio extends Component{
  constructor(props){
    super(props);
    this.state = {
      retorno: [],
      retornoProb: []
    }
  }

  componentWillMount(){
     Pubsub.subscribe('post-retorno', (topico, data) => {
       this.setState({retorno: []});
       this.setState({retorno: data.retorno});
       console.log('STATUS DO ESTADO: ', this.state);
       let auxProbEstadosFila = [];
       for(let i = 0; i < this.state.retorno.length; i++){
         auxProbEstadosFila.push(this.state.retorno[i].probabilidadesEstadosFila);
       }
       console.log('O QUE TEM NO AUX? ', auxProbEstadosFila);
       this.setState({retornoProb: auxProbEstadosFila});
       console.log('retornoProb: ', this.state.retornoProb);
    });
 }

 probGraph = () => {
  let data = [];

  for(let i = 0; i < this.state.retornoProb.length; i++){
    let arrayAtual = this.state.retornoProb[i];
    for(let j = 0; j < arrayAtual.length; j++){
        let estadoAtual = j.toString();
        let valorAtual = arrayAtual[j];
        console.log('ESTADO ATUAL DO RETORNO PROB - graph: ', estadoAtual);
        console.log('VALOR ATUAL DO RETORNO PROB - graph: ', valorAtual);
        if(valorAtual !== 0){
          let obj = {label: estadoAtual, value: valorAtual};
          data.push(obj);
        };
    }  
  }

  return <div> <PieChart data={data} /> /> </div>
 }

  render(){
    return(
      <div color="primary">
        {
          this.state.retorno.map(item => (
            <div>
              <Typography key={item.id} align="center" variant="subtitle1" color="primary" noWrap >
                Fila {item.id}
              </Typography>
              <Typography key={item.numChegadas + item.id} align="center" variant="body1" color="primary" noWrap>
                Número de Chegadas: {item.numChegadas}
              </Typography>
              <Typography key={item.numAtendimentos + item.id} align="center" variant="body1" color="primary" noWrap>
                Número de Atendimentos: {item.numAtendimentos}
              </Typography>
              <Typography key={item.tempoOcupada + item.id} align="center" variant="body1" color="primary" noWrap>
                Tempo Ocupada: {item.tempoOcupada.toFixed(2)}
              </Typography>
              <Typography key={item.taxaChegada + item.id} align="center" variant="body1" color="primary" noWrap>
                Taxa de Chegada: {item.taxaChegada.toFixed(2)}
              </Typography>
              <Typography key={item.vazao + item.id}  align="center" variant="body1" color="primary" noWrap>
                Vazão: {item.vazao.toFixed(2)}
              </Typography>
              <Typography key={item.utilizacao + item.id} align="center" variant="body1" color="primary" noWrap>
                Utilização: {item.utilizacao.toFixed(2)}
              </Typography>
              <Typography key={item.tempoMedioServico + item.id} align="center" variant="body1" color="primary" noWrap>
                Tempo Médio de Serviço: {item.tempoMedioServico.toFixed(2)}
              </Typography>
              <Divider />
              <Typography key={item.id + 10} align="center" variant="subtitle1" color="primary" noWrap >
                Probabilidades da Fila {item.id}
              </Typography>
              { this.probGraph() }
            </div>
          ))
        }
      </div>
    );
  }
}
