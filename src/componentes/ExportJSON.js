import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

/* Componente para exportar o conteúdo do editor para um arquivo JSON */
/* No momento: não-funcional */
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
