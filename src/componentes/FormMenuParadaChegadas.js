import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Pubsub from 'pubsub-js';

export default class FormMenuParadaChegadas extends Component{
  constructor(props) {
    super(props);
    this.state = {
      condicao: 'valor inteiro'
    };
  }

  handleChange = condicao => event => {
    this.setState({ [condicao]: parseInt(event.target.value, 10) });
  };

  handleClick = condicao => event => {
    console.log('Este é o valor salvo no momento (número de chegadas): ' + this.state.condicao);

    Pubsub.publish('retorno-condicao-parada-num-chegadas', {
      condicao: this.state.condicao
    });
  }

  render(){
    return(
      <div>
      <TextField
         id="standard-name"
         label="Número de Chegadas"
         className={'condicao-text-field'}
         value={this.state.condicao}
         onChange={this.handleChange('condicao')}
         margin="normal"
       />
       <button onClick={ this.handleClick('condicao') }>Check</button>
      </div>
    );
  }
}
