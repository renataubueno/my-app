import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class MenuDistribuicao extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'Condição de parada'
    };

    this.opcoesDistribuicao = this.opcoesDistribuicao.bind(this);
  }

  opcoesDistribuicao(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return(
      <div>
      <InputLabel htmlFor="type-helper">Tipo de Distribuição</InputLabel>
      <Select value={this.state.value} onChange={this.opcoesDistribuicao}>
        <MenuItem value="">
          <em>Tipo de Distribuição</em>
        </MenuItem>
        <MenuItem value={'Uniforme'}>Uniforme</MenuItem>
        <MenuItem value={'Exponencial'}>Exponencial</MenuItem>
        <MenuItem value={'Geométrica'}>Geométrica</MenuItem>
        <MenuItem value={'Binomial'}>Binomial</MenuItem>
      </Select>
      </div>
    );
  }
}

//1 para uniforme
//2 para exponencial
//3 para geométrica
//4 para binomial
