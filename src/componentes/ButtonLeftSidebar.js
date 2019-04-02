import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

export default class ButtonLeftSidebar extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};
  }

  render(){
    const { open } = this.state;

    return(
      <div>
      <CssBaseline />
        <Toolbar disableGutters={!open}>
          <IconButton
            color="default"
            aria-label="Open drawer"
            onClick={this.props.buttonlsb}
            className={'button-left-sidebar'}
          >
          <Typography variant="button" color="inherit" noWrap>
            Parâmetros
          </Typography>
          </IconButton>
        </Toolbar>
      </div>
    );
  }
}
