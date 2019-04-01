import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

export default class Simulacao extends Component{
  render(){
    return(
      <div>
      <Button variant="contained" /*className={classes.button}*/>
        Iniciar Simulação
      </Button>
      </div>
    );
  }
}
