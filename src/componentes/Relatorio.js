import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Pubsub from 'pubsub-js';

export default class Relatorio extends Component{
  constructor(props){
    super(props);
    this.state = {
      retorno: [],
      retornoProb: []
    }
  }

  componentWillMount(){
     Pubsub.subscribe('post-retorno', (topico, retorno) => {
       console.log('O QUE TEM NO RETORNO DO RELATÕRIO?' , retorno);
       this.setState({retorno: []});
       this.setState({retornoProb: []});
       var itemsRetorno = [ ].concat(this.state.retorno);
       itemsRetorno.push(retorno.retorno);
       var itemsRetornoProb = [ ].concat(this.state.retornoProb);
       itemsRetornoProb.push(retorno.retorno.probabilidadesEstadosFila);
       this.setState({retorno: itemsRetorno});
       this.setState({retornoProb: itemsRetornoProb});
       console.log(this.state.retornoProb);
    });
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
                Tempo Ocupada: {item.tempoOcupada}
              </Typography>
              <Typography key={item.taxaChegada + item.id} align="center" variant="body1" color="primary" noWrap>
                Taxa de Chegada: {item.taxaChegada}
              </Typography>
              <Typography key={item.vazao + item.id}  align="center" variant="body1" color="primary" noWrap>
                Vazão: {item.vazao}
              </Typography>
              <Typography key={item.utilizacao + item.id} align="center" variant="body1" color="primary" noWrap>
                Utilização: {item.utilizacao}
              </Typography>
              <Typography key={item.tempoMedioServico + item.id} align="center" variant="body1" color="primary" noWrap>
                Tempo Médio de Serviço: {item.tempoMedioServico}
              </Typography>
              <Divider />
                <Typography key={item.id + 10} align="center" variant="subtitle1" color="primary" noWrap >
                  Probabilidade da Fila {item.id}
                </Typography>
            </div>
          ))
        }
        {
          this.state.retornoProb.map(val => (
            <Typography key={val}  align="center" variant="body1" color="primary" noWrap>
              {val}
            </Typography>
          ))
        }
      </div>
    );
  }
}
