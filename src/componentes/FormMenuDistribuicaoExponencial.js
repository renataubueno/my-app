import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

export default class FormMenuDistribuicaoExponencial extends Component{
  constructor(props) {
    super(props);
    this.state = {
      media: 'média'
    };
  }

  handleChange = media => event => {
    this.setState({ [media]: parseFloat(event.target.value, 10) });
  };

  render(){
    return(
      <div>
      <TextField
         id="standard-name"
         label="Média"
         className={'condicao-media-text-field'}
         value={this.state.media}
         onChange={this.handleChange('media')}
         margin="normal"
       />
      </div>
    );
  }
}
