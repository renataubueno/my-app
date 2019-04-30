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

  handleChange = parametro => event => {
    console.log('State do ConectorDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
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
          label="id do Conector"
          className={'idConector-text-field'}
          value={this.state.objeto.id}
          margin="normal"
        />
      </DialogContent>
    );
  }
}
