import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Pubsub from 'pubsub-js';
import fileDownload from 'react-file-download';

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

  handleClick = control => event =>{
    let body = {fila: this.state.filas};

    /*fetch(`${process.env.REACT_APP_API_URL}exportar`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: "GET",
    })
    .then(response => {
      if(response.ok){
        console.log('RESPONSE EXPORT: ', response.body);
      } else {
        console.log('RESPONSE EXPORT- DEU ERRO: ', response);
      }
    });*/

    fetch(`${process.env.REACT_APP_API_URL}exportar`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => {
      if(response.ok){
        response.blob().then(blob => {
          console.log('Renata - retorno:', blob);
          fileDownload(blob, 'exportSistema.json');
        });
      } else {
        console.log('RESPONSE EXPORT- DEU ERRO: ', response);
      }
    })
    .then(retorno => {
      console.log('RESPONSE EXPORT.JSON: ', retorno);
    })
    .catch(response => { console.log('Estou no catch do export', response) })
  }

  render(){
    return(
      <div>
      <Button variant="contained" onClick={this.handleClick('control')}>
        Exportar JSON
      </Button>
      </div>
    );
  }
}
