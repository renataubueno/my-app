import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default class Relatorio extends Component{
  constructor(props){
    super(props);
    this.state = {
      feed: [
        {idFila: 1, numChegadas: 10, numAtendimentos: 120, tempoOcupada: 122, taxaChegada: 14, vazao: 52, utilizacao: 42,   tempoMedioServico: 13},
        {idFila: 2, numChegadas: 15, numAtendimentos: 66, tempoOcupada: 19, taxaChegada: 1, vazao: 13, utilizacao: 24,   tempoMedioServico: 55}
      ]
    }
  }

  render(){
    return(
      <div color="primary">
        {
          this.state.feed.map(item => (
            <div>
              <Typography key={item.idFila} align="center" variant="subtitle1" color="primary" noWrap >
                Fila {item.idFila}
              </Typography>
              <Typography key={item.numChegadas + item.idFila} align="center" variant="body1" color="primary" noWrap>
                Número de Chegadas: {item.numChegadas}
              </Typography>
              <Typography key={item.numAtendimentos + item.idFila} align="center" variant="body1" color="primary" noWrap>
                Número de Atendimentos: {item.numAtendimentos}
              </Typography>
              <Typography key={item.tempoOcupada + item.idFila} align="center" variant="body1" color="primary" noWrap>
                Tempo Ocupada: {item.tempoOcupada}
              </Typography>
              <Typography key={item.taxaChegada + item.idFila} align="center" variant="body1" color="primary" noWrap>
                Taxa de Chegada: {item.taxaChegada}
              </Typography>
              <Typography key={item.vazao + item.idFila}  align="center" variant="body1" color="primary" noWrap>
                Vazão: {item.vazao}
              </Typography>
              <Typography key={item.utilizacao + item.idFila} align="center" variant="body1" color="primary" noWrap>
                Utilização: {item.utilizacao}
              </Typography>
              <Typography key={item.tempoMedioServico + item.idFila} align="center" variant="body1" color="primary" noWrap>
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
