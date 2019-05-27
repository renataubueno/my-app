import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import './Button.css';

export default class FormMenuParadaTempo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      condicao: 'valor em segundos'
    };
  }

  handleChange = condicao => event => {
    this.setState({ [condicao]: parseInt(event.target.value, 10) });
  };

  handleClick = condicao => event => {
    console.log('Este é o valor salvo no momento (tempo de simulação): ' + this.state.condicao);
  }

  handleFocus = (event) => event.target.select();

  render(){
    return(
      <div>
      <TextField
         id="standard-name"
         label="Tempo da Simulação"
         className={'condicao-text-field'}
         value={this.state.condicao}
         onChange={this.handleChange('condicao')}
         margin="normal"
         onFocus={this.handleFocus}
       />
       <button className="save-button" onClick={ this.handleClick('condicao') }>Salvar</button>
      </div>
    );
  }
}
