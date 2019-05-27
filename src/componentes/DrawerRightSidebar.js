import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import Relatorio from './Relatorio.js';

export default class DrawerRightSidebar extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};
  }

  render(){
    return(
      <div className={'right-drawer-header'}>
        <div style={drawerheaderStyle}>
        <IconButton color="primary" onClick={this.props.buttonrsbclose}>
          <NavigationIcon style={navigationStyle}/>
        </IconButton>
        <Typography align="center" variant="h6" color="primary" style={headertitleStyle} noWrap>
          RELATÓRIO
        </Typography>
        </div>
        <Divider />

        <Divider />
        <Relatorio />
      </div>
    );
  }
}

const navigationStyle = {
  transform: 'rotate(90deg)',
}

const drawerheaderStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '7px 0 7px 0',
}

const headertitleStyle = {
  paddingLeft: '5px'
}