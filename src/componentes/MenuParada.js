import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class MenuParada extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'Condição de parada'
    };

    this.opcoesParada = this.opcoesParada.bind(this);
  }

  opcoesParada(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return(
      <div>
      <InputLabel htmlFor="stop-helper">Condição de Parada</InputLabel>
      <Select value={this.state.value} onChange={this.opcoesParada}>
        <MenuItem value="">
          <em>Condição de Parada</em>
        </MenuItem>
        <MenuItem value={'Tempo'}>Tempo de Simulação</MenuItem>
        <MenuItem value={'Número de Chegadas'}>Número de Chegadas</MenuItem>
      </Select>
      </div>
    );
  }
}
