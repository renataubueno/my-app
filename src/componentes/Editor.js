import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pubsub from 'pubsub-js';
import Draggable from 'react-draggable';
import FilaImage from '../images/fila.png';
import ConectorImage from '../images/conector.png';
import SaidaImage from '../images/saida.png';
import EntradaImage from '../images/entrada.png';
import ControllerEntrada from './ControllerEntrada.js';
import ControllerSaida from './ControllerSaida.js';
import ControllerConector from './ControllerConector.js';
import ControllerFila from './ControllerFila.js';

import FilaNova from './FilaNova.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '800px',
    height: '450px',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '245px',
    marginTop: '175px',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 5,
  },
});

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filaFilas: [],
      filaConector: [],
      filaSaida: [],
      filaEntrada: []
    }

    this._handleDoubleClickFila = this._handleDoubleClickFila.bind(this);
    this._handleDoubleClickConector = this._handleDoubleClickConector.bind(this);
    this._handleDoubleClickSaida = this._handleDoubleClickSaida.bind(this);
  }

  componentWillMount(){
      Pubsub.subscribe('retorno-fila', (topico, dadosDaFila) => {
        console.log('Chegou : ', dadosDaFila.resposta);
        var itemsFila = [ ].concat(this.state.filaFilas);
        itemsFila.push(dadosDaFila.resposta);
        this.setState({filaFilas: itemsFila});
        console.log('Conteúdo da fila de filas: ', this.state.filaFilas);
     });

     Pubsub.subscribe('retorno-conector', (topico, dadosDoConector) => {
       console.log('Chegou : ', dadosDoConector.resposta);
       var itemsConector = [ ].concat(this.state.filaConector);
       itemsConector.push(dadosDoConector.resposta);
       this.setState({filaConector: itemsConector});
       console.log('Conteúdo da fila de conectores: ', this.state.filaConector);
    });

    Pubsub.subscribe('retorno-saida', (topico, dadosDaSaida) => {
      console.log('Chegou : ', dadosDaSaida.resposta);
      var itemsSaida = [ ].concat(this.state.filaSaida);
      itemsSaida.push(dadosDaSaida.resposta);
      this.setState({filaSaida: itemsSaida});
      console.log('Conteúdo da fila de saidas: ', this.state.filaSaida);
   });

    Pubsub.subscribe('retorno-entrada', (topico, dadosDaEntrada) => {
      console.log('Chegou : ', dadosDaEntrada.resposta);
      var itemsEntrada = [ ].concat(this.state.filaEntrada);
      itemsEntrada.push(dadosDaEntrada.resposta);
      this.setState({filaEntrada: itemsEntrada});
      console.log('Conteúdo da fila de entrada: ', this.state.filaEntrada);
    });

    Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
      console.log('Vamos');
      this.setState({filaFilas: []});
      this.setState({filaConector: []});
      this.setState({filaSaida: []});
      this.setState({filaEntrada: []});
    });
 }

  _handleDoubleClickFila(event): void {
   	alert('I got double-clicked - Fila!');
  }

  handleDoubleClick(event): void{
    console.log(event);
  }

  _handleDoubleClickConector(event): void {
    	alert('I got double-clicked! - Conector');
   }

  _handleDoubleClickSaida(event): void {
      alert('I got double-clicked! - Saida');
  }

  render(){
    const { classes } = this.props;
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position}

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={2}>
        {
          this.state.filaFilas.map(item => (
            <FilaNova objeto={item} />
          ))
        }
        {
          this.state.filaConector.map(item => (
            <Draggable {...settings}>
              <img src={ConectorImage} alt="Conector" key={this.state.filaConector[0].idConector} height={this.state.filaConector[0].height} width={this.state.filaConector[0].width} onDoubleClick={this.handleDoubleClick('CONECTOR')}/>
            </Draggable>
          ))
        }
        {
          this.state.filaSaida.map(item => (
            <Draggable {...settings}>
              <img src={SaidaImage} alt="TRIANGLE" key={this.state.filaSaida[0].idSaida} height={this.state.filaSaida[0].height} width={this.state.filaSaida[0].width} onDoubleClick={this.handleDoubleClick('SAIDA')} />
            </Draggable>
          ))
        }
        {
          this.state.filaEntrada.map(item => (
            <Draggable {...settings}>
              <img src={EntradaImage} alt="ARROW" key={this.state.filaEntrada[0].idEntrada} height={this.state.filaEntrada[0].height} width={this.state.filaEntrada[0].width} onDoubleClick={this.handleDoubleClick('ENTRADA')}/>
            </Draggable>
          ))
        }
      </Paper>
      </main>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
