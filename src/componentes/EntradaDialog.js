import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Pubsub from 'pubsub-js';

export default class EntradaDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      objeto: this.props.objeto
    }
  }

  handleChange = parametro => event => {
    console.log('State do EntradaDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
    });
  };

  handleFocus = (event) => event.target.select();

  render(){
    return(
      <DialogContent>
      <TextField
         id="standard-name"
         label="Momento da primeira chegada:"
         className={'chegada-text-field'}
         value={this.state.objeto.chegada}
         onChange={this.handleChange('chegada')}
         onFocus={this.handleFocus}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="id da Entrada"
          className={'idEntrada-text-field'}
          value={this.state.objeto.id}
          onFocus={this.handleFocus}
          margin="normal"
        />
      </DialogContent>
    );
  }
}
