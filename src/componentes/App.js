import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PersistentDrawerLeft from './LeftSidebar.js';
import Editor from './Editor.js';
import PersistentDrawerRight from './RightSidebar.js';
import Typography from '@material-ui/core/Typography';

/* Componente inicial, que renderiza os demais */
export default class App extends React.Component {
  render(){
    return(
      <div>
      <AppBar style={appbarStyle} position="fixed">
        <PersistentDrawerLeft style={leftmenuStyle}/>
        <Typography align="center" variant="h6" color="inherit" noWrap style={typographyStyle}>
          Queue Network Simulator
        </Typography>
          <PersistentDrawerRight style={rightmenuStyle} />
      </AppBar>
      <Editor />
      </div>
    );
  }
}

const appbarStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const leftmenuStyle = {
  flex: '1',
}

const rightmenuStyle = {
  flex: '1',
}

const typographyStyle = {
  flex: '3',
}
