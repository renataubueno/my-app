import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Pubsub from 'pubsub-js';

export default class ConectorDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      objeto: this.props.objeto
    }
  }

  componentWillMount(){
    Pubsub.subscribe('id-invalido', (topico, id) => {
      this.state.objeto.idConectado = id.id;
    });
  }

  handleChange = parametro => event => {
    console.log('State do ConectorDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
    });
  };

  handleChangeConexao = parametro => event => {
    console.log('State do Conector', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
        objeto: parseInt(event.target.value)
    });
  };

  render(){
    return(
      <DialogContent>
      <TextField
         id="standard-name"
         label="Probabilidade do canal superior (em porcentagem)"
         className={'probabilidade-text-field'}
         value={this.state.objeto.probabilidade}
         onChange={this.handleChange('probabilidade')}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="Id do Conector"
          className={'idConector-text-field'}
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
      </DialogContent>
    );
  }
}
