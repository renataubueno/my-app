import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Pubsub from 'pubsub-js';

export default class Relatorio extends Component{
  constructor(props){
    super(props);
    this.state = {
      filas: []
    }
  }

  componentWillMount(){
      Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        console.log('Chegou : ', dadosDaFila.resposta);
        this.setState({filas: dadosDaFila.resposta});
        console.log('Conteúdo da fila: ', this.state.filas[0].id);
        //this.state.filas -> retorna os dois objetos
        //this.state.filas[0] -> retorna o primeiro objetos
        //this.state.filas[0].id -> retorna o id do primeiro objeto
     });
 }

  render(){
    return(
      <div color="primary">
        {
          this.state.filas.map(item => (
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
            </div>
          ))
        }
      </div>
    );
  }
}
