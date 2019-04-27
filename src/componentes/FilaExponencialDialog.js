import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

export default class FilaExponencialDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      objeto: this.props.objeto
    }
  }

  handleChange = parametro => event => {
    console.log('State do FilaExponencialDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
  };

  handleChangeFloat = parametro => event => {
    console.log('State do FilaExponencialDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseFloat(event.target.value);
    this.setState({ objeto: objetoAlterado });
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
          label="id da Fila"
          className={'idFila-text-field'}
          value={this.state.objeto.id}
          margin="normal"
        />
        <TextField
           id="standard-name"
           label="Média"
           className={'condicao-media-text-field'}
           value={this.state.objeto.media}
           onChange={this.handleChangeFloat('media')}
           margin="normal"
         />
      </DialogContent>
    );
  }
}
