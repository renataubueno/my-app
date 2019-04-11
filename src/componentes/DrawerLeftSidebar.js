import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import ExportJSON from './ExportJSON.js';
import ImportJSON from './ImportJSON.js';
import Simulacao from './Simulacao.js';
import Typography from '@material-ui/core/Typography';
import MenuDistribuicao from './MenuDistribuicao.js';
import MenuParada from './MenuParada.js';
import circleImage from '../images/circle.png';
import squareImage from '../images/square.png';
import triangleImage from '../images/triangle.png';
import arrowImage from '../images/arrow.png';

export default class DrawerLeftSidebar extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};
  }

  handleClickCircle = control => event => {
    console.log('Cliquei no Círculo');
  };

  handleClickSquare = control => event => {
    console.log('Cliquei no Quadrado');
  };

  handleClickTriangle = control => event => {
    console.log('Cliquei no Triângulo');
  };

  handleClickArrow = control => event => {
    console.log('Cliquei na Flecha');
  };

  render(){return(
      <div className={'left-drawer-header'}>
        <IconButton color="primary" onClick={this.props.drawerlsb}>
          <NavigationIcon/>
        </IconButton>
        <Divider />
        <div>
        <Typography align="center" variant="h6" color="primary" noWrap>
          <img src={circleImage} alt="CIRCLE" height="60" width="60" onClick={ this.handleClickCircle('control') }/> &nbsp; &nbsp; &nbsp; &nbsp;
          <img src={squareImage} alt="SQUARE" height="45" width="45" onClick={ this.handleClickSquare('control') } /> <br />
          <img src={triangleImage} alt="TRIANGLE" height="45" width="45" onClick={ this.handleClickTriangle('control') } /> &nbsp; &nbsp; &nbsp; &nbsp;
          <img src={arrowImage} alt="ARROW" height="45" width="45" onClick={ this.handleClickArrow('control') } />
        </Typography>
        </div>
        <Divider />
        <MenuParada />
        <Divider />
        <MenuDistribuicao />
        <Divider />
        <Simulacao />
        <Divider />
        <ExportJSON />
        <ImportJSON />
      </div>
    );
  }
}
