import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pubsub from 'pubsub-js';
import Draggable from 'react-draggable';
import circleImage from '../images/circle.png';
import squareImage from '../images/square.png';
import triangleImage from '../images/triangle.png';
import arrowImage from '../images/arrow.png';

const styles = theme => ({
  drawerHeader: {
    width: '300px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    padding: '100px 50px 75px 100px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },root: {
    width: '800px',
    height: '400px',
    alignItems: 'center',
    marginLeft: '245px',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 5,
  },
});

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filaCirculos: [],
      filaQuadrados: [],
      filaTriangulos: [],
      filaArrow: []
    }
  }

  componentWillMount(){
      Pubsub.subscribe('retorno-circulo', (topico, dadosDoCirculo) => {
        console.log('Chegou : ', dadosDoCirculo.resposta);
        var itemsCirculos = [ ].concat(this.state.filaCirculos);
        itemsCirculos.push(dadosDoCirculo.resposta);
        this.setState({filaCirculos: itemsCirculos});
        console.log('Conteúdo da fila de círculos: ', this.state.filaCirculos);
     });

     Pubsub.subscribe('retorno-quadrado', (topico, dadosDoQuadrado) => {
       console.log('Chegou : ', dadosDoQuadrado.resposta);
       var itemsQuadrados = [ ].concat(this.state.filaQuadrados);
       itemsQuadrados.push(dadosDoQuadrado.resposta);
       this.setState({filaQuadrados: itemsQuadrados});
       console.log('Conteúdo da fila de quadrados: ', this.state.filaQuadrados);
    });

    Pubsub.subscribe('retorno-triangulo', (topico, dadosDoTriangulo) => {
      console.log('Chegou : ', dadosDoTriangulo.resposta);
      var itemsTriangulo = [ ].concat(this.state.filaTriangulos);
      itemsTriangulo.push(dadosDoTriangulo.resposta);
      this.setState({filaTriangulos: itemsTriangulo});
      console.log('Conteúdo da fila de triangulos: ', this.state.filaTriangulos);
   });

    Pubsub.subscribe('retorno-arrow', (topico, dadosDaArrow) => {
      console.log('Chegou : ', dadosDaArrow.resposta);
      var itemsArrow = [ ].concat(this.state.filaArrow);
      itemsArrow.push(dadosDaArrow.resposta);
      this.setState({filaArrow: itemsArrow});
      console.log('Conteúdo da fila de arrows: ', this.state.filaArrow);
    });

    Pubsub.subscribe('retorno-limpar-editor', (topico, limparEditor) => {
      console.log('Vamos');
      this.setState({filaCirculos: []});
      this.setState({filaQuadrados: []});
      this.setState({filaTriangulos: []});
      this.setState({filaArrow: []});
    });
 }

  render(){
    const { classes } = this.props;

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={1}>
        {
          this.state.filaCirculos.map(item => (
            <Draggable
              bounds="parent"
              defaultPosition={{x: 0, y: 0}}
              >
              <img src={circleImage} alt="CIRCLE" key={this.state.filaCirculos[0].idCircle} height={this.state.filaCirculos[0].height} width={this.state.filaCirculos[0].width}/>
            </Draggable>
          ))
        }
        {
          this.state.filaQuadrados.map(item => (
            <Draggable
              bounds="parent"
              defaultPosition={{x: 0, y: 0}}
              >
              <img src={squareImage} alt="SQUARE" key={this.state.filaQuadrados[0].idSquare} height={this.state.filaQuadrados[0].height} width={this.state.filaQuadrados[0].width}/>
            </Draggable>
          ))
        }
        {
          this.state.filaTriangulos.map(item => (
            <Draggable
              bounds="parent"
              defaultPosition={{x: 0, y: 0}}
              >
            <img src={triangleImage} alt="TRIANGLE" key={this.state.filaTriangulos[0].idTriangle} height={this.state.filaTriangulos[0].height} width={this.state.filaTriangulos[0].width}/>
            </Draggable>
          ))
        }
        {
          this.state.filaArrow.map(item => (
            <Draggable
              bounds="parent"
              defaultPosition={{x: 0, y: 0}}>
              <img src={arrowImage} alt="ARROW" key={this.state.filaArrow[0].idArrow} height={this.state.filaArrow[0].height} width={this.state.filaArrow[0].width}/>
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
