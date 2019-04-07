import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormMenuDistribuicaoUniforme from './FormMenuDistribuicaoUniforme.js';
import FormMenuDistribuicaoExponencial from './FormMenuDistribuicaoExponencial.js'

export default class MenuDistribuicao extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'Condição de parada',
      showUniforme: false,
      showExponencial: false
    };

    this.opcoesDistribuicao = this.opcoesDistribuicao.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  opcoesDistribuicao(event) {
    this.setState({value: event.target.value});
  }

  showForm = () => {
        if(this.state.value === 'Uniforme'){
          this.setState( { showUniforme: true } )
          this.setState( { showExponencial: false } )
        } else if (this.state.value === 'Exponencial'){
          this.setState( { showUniforme: false } )
          this.setState( { showExponencial: true } )
        } else {
          this.setState( { showUniforme: false } )
          this.setState( { showExponencial: false } )
        }
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
      <Button onClick={ this.showForm}>Ok</Button>
      { this.state.showUniforme && <FormMenuDistribuicaoUniforme/>}
      { this.state.showExponencial && <FormMenuDistribuicaoExponencial/>}
      </div>
    );
  }
}

//1 para uniforme
//2 para exponencial
//3 para geométrica
//4 para binomial
