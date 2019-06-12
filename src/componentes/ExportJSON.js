import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

//dar subscribe no retorno-fila - posso guardar no state

export default class ExportJSON extends Component{
  render(){
    return(
      <div>
      <Button variant="contained" /*className={classes.button}*/>
        Exportar JSON
      </Button>
      </div>
    );
  }
}
