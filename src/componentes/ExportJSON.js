import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Pubsub from 'pubsub-js';

export default class ExportJSON extends Component{
  constructor(props){
    super(props);
    this.state = {filas: []};
  };

  componentWillMount(){
    Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        var itemsFila = [ ].concat(this.state.filas);
        itemsFila.push(dadosDaFila.fila);
        this.setState({filas: itemsFila});
    });
  }

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
