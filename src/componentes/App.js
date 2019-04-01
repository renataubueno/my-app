import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import PersistentDrawerLeft from './LeftSidebar.js';
import Editor from './Editor.js';
import PersistentDrawerRight from './RightSidebar.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      <AppBar position="fixed">
      <Typography align="center" variant="h6" color="inherit" noWrap>
        Queue Network Simulator
      </Typography>
      <Button onClick={this.PersistentDrawerLeft}>PARÂMETROS</Button>
      <Button>RELATÓRIOS</Button>
        <PersistentDrawerLeft />
        <PersistentDrawerRight />
      </AppBar>
      <Editor />
      </div>
    );
  }
}
