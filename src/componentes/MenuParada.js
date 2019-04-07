import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormMenuParadaChegadas from './FormMenuParadaChegadas.js';
import FormMenuParadaTempo from './FormMenuParadaTempo.js';
import Button from '@material-ui/core/Button';

export default class MenuParada extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'Condição de parada',
      showChegadas: false,
      showTempo: false
    };

    this.opcoesParada = this.opcoesParada.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  opcoesParada(event) {
    this.setState({value: event.target.value});
  }

  showForm = () => {
        if(this.state.value === 'Número de Chegadas'){
          this.setState( { showChegadas : true } )
          this.setState( { showTempo : false } )
        } else if (this.state.value === 'Tempo'){
          this.setState( { showChegadas : false } )
          this.setState( { showTempo : true } )
        }
        else {
          this.setState( { showChegadas : false } )
          this.setState( { showTempo : false } )
        }
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
      <Button onClick={ this.showForm}>Ok</Button>
      { this.state.showChegadas && <FormMenuParadaChegadas/>}
      { this.state.showTempo && <FormMenuParadaTempo/>}
      </div>
    );
  }
}
