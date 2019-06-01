import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export default class ButtonRightSidebar extends Component{
  render(){
    return(
      <div>
        <CssBaseline />
        <IconButton
          color="default"
          aria-label="Open drawer"
          style={iconStyle}
          onClick={this.props.buttonrsbopen}
          className={'button-right-sidebar'}
        >
        <Typography variant="button" color="inherit" noWrap>
          Relatório
        </Typography>
        </IconButton>
      </div>
    );
  }
}

const iconStyle = {
  color: 'white',
}
