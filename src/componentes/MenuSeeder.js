import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Pubsub from 'pubsub-js';

export default class MenuSeeder extends Component{
  constructor(props) {
    super(props);
    this.state = {
      seeder: 'valor inteiro'
    };
  }

  handleChange = seeder => event => {
    this.setState({ [seeder]: parseInt(event.target.value, 10) });
  };

  handleClick = seeder => event => {
    console.log('Este é o valor salvo no momento (seeder): ' + this.state.seeder);

    Pubsub.publish('retorno-seeder', {
      seeder: this.state.seeder
    });
  }

  render(){
    return(
      <div style={seederStyle}>
        <TextField
           id="standard-name"
           label="Seed"
           className={'seeder-text-field'}
           value={this.state.seeder}
           onChange={this.handleChange('seeder')}
           margin="normal"
         />
       <button onClick={ this.handleClick('seeder') }>Salvar</button>
      </div>
    );
  }
}

const seederStyle = {
  padding: '0 15px 15px 15px'
}
