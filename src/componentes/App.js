import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PersistentDrawerLeft from './LeftSidebar.js';
import Editor from './Editor.js';
import PersistentDrawerRight from './RightSidebar.js';
import Typography from '@material-ui/core/Typography';

export default class App extends React.Component {
  render(){
    return(
      <div>
      <AppBar position="fixed">
      <Typography align="center" variant="h6" color="inherit" noWrap>
        Queue Network Simulator
      </Typography>
        <PersistentDrawerLeft />
        <PersistentDrawerRight />
      </AppBar>
      <Editor />
      </div>
    );
  }
}
