import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Pubsub from 'pubsub-js';

export default class FilaUniformeDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      objeto: this.props.objeto,
    }
  }

  componentWillMount(){
    Pubsub.subscribe('id-invalido', (topico, id) => {
      this.state.objeto.idConectado = id.id;
    });
  }

  handleChange = parametro => event => {
    console.log('State do FilaUniformeDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
    });
  };

  handleChangeConexao = parametro => event => {
    console.log('State do FilaUniformeDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
        id: parseInt(event.target.value),
        objeto: this.state.objeto
    });
  };

  render(){
    return(
      <DialogContent>
      <TextField
         id="standard-name"
         label="Servidores:"
         className={'chegada-text-field'}
         value={this.state.objeto.servidores}
         onChange={this.handleChange('servidores')}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="Capacidade:"
          className={'capacidade-text-field'}
          value={this.state.objeto.capacidade}
          onChange={this.handleChange('capacidade')}
          margin="normal"
        />
       <TextField
          id="standard-name"
          label="Id da Fila"
          className={'idFila-text-field'}
          value={this.state.objeto.id}
          margin="normal"
        />
        <TextField
           id="standard-name"
           label="Id do objeto conectado"
           className={'id-conectado-text-field'}
           value={this.state.objeto.idConectado}
           onChange={this.handleChangeConexao('idConectado')}
           margin="normal"
         />
        <TextField
           id="standard-name"
           label="Número Mínimo de Chegadas"
           className={'condicao-min-chegada-text-field'}
           value={this.state.objeto.minChegada}
           onChange={this.handleChange('minChegada')}
           margin="normal"
         />
         <TextField
            id="standard-name"
            label="Número Máximo de Chegadas"
            className={'condicao-max-chegada-text-field'}
            value={this.state.objeto.maxChegada}
            onChange={this.handleChange('maxChegada')}
            margin="normal"
          />
          <TextField
             id="standard-name"
             label="Número Mínimo de Serviço"
             className={'condicao-min-servico-text-field'}
             value={this.state.objeto.minServico}
             onChange={this.handleChange('minServico')}
             margin="normal"
           />
           <TextField
              id="standard-name"
              label="Número Máximo de Serviço"
              className={'condicao-max-servico-text-field'}
              value={this.state.objeto.maxServico}
              onChange={this.handleChange('maxServico')}
              margin="normal"
            />
      </DialogContent>
    );
  }
}
