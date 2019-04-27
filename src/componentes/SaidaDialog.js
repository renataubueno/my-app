import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

export default class SaidaDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      objeto: this.props.objeto
    }
  }

  render(){
    return(
      <DialogContent>
      <TextField
         id="standard-name"
         label="id da Saída"
         className={'idSaida-text-field'}
         value={this.state.objeto.id}
         margin="normal"
       />
      </DialogContent>
    );
  }
}
