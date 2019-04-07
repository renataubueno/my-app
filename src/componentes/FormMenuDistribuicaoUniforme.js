import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

export default class FormMenuDistribuicaoUniforme extends Component{
  constructor(props) {
    super(props);
    this.state = {
      minChegada: 'valor inteiro',
      maxChegada: 'valor inteiro',
      minServico: 'valor inteiro',
      maxServico: 'valor inteiro'
    };
  }

  handleChangeMinChegada = minChegada => event => {
    this.setState({ [minChegada]: parseInt(event.target.value, 10) });
  };

  handleChangeMaxChegada = maxChegada => event => {
    this.setState({ [maxChegada]: parseInt(event.target.value, 10) });
  };

  handleChangeMinServico = minServico => event => {
    this.setState({ [minServico]: parseInt(event.target.value, 10) });
  };

  handleChangeMaxServico = maxServico => event => {
    this.setState({ [maxServico]: parseInt(event.target.value, 10) });
  };

  render(){
    return(
      <div>
      <TextField
         id="standard-name"
         label="Número Mínimo de Chegadas"
         className={'condicao-min-chegada-text-field'}
         value={this.state.minChegada}
         onChange={this.handleChangeMinChegada('minChegada')}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="Número Máximo de Chegadas"
          className={'condicao-max-chegada-text-field'}
          value={this.state.maxChegada}
          onChange={this.handleChangeMaxChegada('maxChegada')}
          margin="normal"
        />
        <TextField
           id="standard-name"
           label="Número Mínimo de Serviço"
           className={'condicao-min-servico-text-field'}
           value={this.state.minServico}
           onChange={this.handleChangeMinServico('minServico')}
           margin="normal"
         />
         <TextField
            id="standard-name"
            label="Número Máximo de Serviço"
            className={'condicao-max-servico-text-field'}
            value={this.state.maxServico}
            onChange={this.handleChangeMaxServico('maxServico')}
            margin="normal"
          />
      </div>
    );
  }
}
