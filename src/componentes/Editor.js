import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    height: '100px',
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
        this.setState({filaCirculos: [dadosDoCirculo.resposta]});
        console.log('Conteúdo da fila de círculos: ', this.state.filaCirculos);
        console.log('Id do objeto 1: ', this.state.filaCirculos[0].idCircle);
        console.log('Height do objeto 1: ', this.state.filaCirculos[0].height);
        console.log('Width do objeto 1: ', this.state.filaCirculos[0].width);
     });

     Pubsub.subscribe('retorno-quadrado', (topico, dadosDoQuadrado) => {
       console.log('Chegou : ', dadosDoQuadrado.resposta);
       this.setState({filaQuadrados: [dadosDoQuadrado.resposta]});
       console.log('Conteúdo da fila de quadrados: ', this.state.filaQuadrados);
       console.log('Id do objeto 1: ', this.state.filaQuadrados[0].idSquare);
       console.log('Height do objeto 1: ', this.state.filaQuadrados[0].height);
       console.log('Width do objeto 1: ', this.state.filaQuadrados[0].width);
    });

    Pubsub.subscribe('retorno-triangulo', (topico, dadosDoTriangulo) => {
      console.log('Chegou : ', dadosDoTriangulo.resposta);
      this.setState({filaTriangulos: [dadosDoTriangulo.resposta]});
      console.log('Conteúdo da fila de triangulos: ', this.state.filaTriangulos);
      console.log('Id do objeto 1: ', this.state.filaTriangulos[0].idTriangle);
      console.log('Height do objeto 1: ', this.state.filaTriangulos[0].height);
      console.log('Width do objeto 1: ', this.state.filaTriangulos[0].width);
   });

    Pubsub.subscribe('retorno-arrow', (topico, dadosDaArrow) => {
      console.log('Chegou : ', dadosDaArrow.resposta);
      this.setState({filaArrow: [dadosDaArrow.resposta]});
      console.log('Conteúdo da fila de arrows: ', this.state.filaArrow);
      console.log('Id do objeto 1: ', this.state.filaArrow[0].idArrow);
      console.log('Height do objeto 1: ', this.state.filaArrow[0].height);
      console.log('Width do objeto 1: ', this.state.filaArrow[0].width);
    });
 }

  render(){
    const { classes } = this.props;

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          EDITOR <br />
        </Typography>
        {
          this.state.filaCirculos.map(item => (
            <div>
            <Draggable
              axis="both"
              bounds={{left:0, top: -50, right: 700, bottom: 250}}
              defaultPosition={{x: 0, y: 0}}
              position={null}
              grid={[1, 1]}
              scale={1}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}>
              <div>
                <img src={circleImage} alt="CIRCLE" key={this.state.filaCirculos[0].idCircle} height={this.state.filaCirculos[0].height} width={this.state.filaCirculos[0].width}/>
              </div>
            </Draggable>
            </div>
          ))
        }
        {
          this.state.filaQuadrados.map(item => (
            <div>
            <Draggable
              axis="both"
              bounds={{left:0, top: -50, right: 700, bottom: 250}}
              defaultPosition={{x: 0, y: 0}}
              position={null}
              grid={[1, 1]}
              scale={1}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}>
              <div>
                <img src={squareImage} alt="SQUARE" key={this.state.filaQuadrados[0].idSquare} height={this.state.filaQuadrados[0].height} width={this.state.filaQuadrados[0].width}/>
              </div>
            </Draggable>
            </div>
          ))
        }
        {
          this.state.filaTriangulos.map(item => (
            <div>
            <Draggable
              axis="both"
              bounds={{left:0, top: -50, right: 700, bottom: 250}}
              defaultPosition={{x: 0, y: 0}}
              position={null}
              grid={[1, 1]}
              scale={1}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}>
              <div>
                <img src={triangleImage} alt="TRIANGLE" key={this.state.filaTriangulos[0].idTriangle} height={this.state.filaTriangulos[0].height} width={this.state.filaTriangulos[0].width}/>
              </div>
            </Draggable>
            </div>
          ))
        }
        {
          this.state.filaArrow.map(item => (
            <div>
            <Draggable
              axis="both"
              bounds={{left:0, top: -50, right: 700, bottom: 250}}
              defaultPosition={{x: 0, y: 0}}
              position={null}
              grid={[1, 1]}
              scale={1}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}>
              <div>
                <img src={arrowImage} alt="ARROW" key={this.state.filaArrow[0].idArrow} height={this.state.filaArrow[0].height} width={this.state.filaArrow[0].width}/>
              </div>
            </Draggable>
            </div>
          ))
        }
        <Typography component="p">
        </Typography>
      </Paper>
      </main>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
