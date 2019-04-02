import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

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
