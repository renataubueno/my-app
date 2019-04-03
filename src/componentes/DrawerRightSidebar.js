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
        <IconButton color="primary" onClick={this.props.buttonrsbclose}>
          <NavigationIcon/>
        </IconButton>
        <Divider />
        <Typography align="center" variant="h6" color="primary" noWrap>
          RELATÓRIO
        </Typography>
        <Divider />
        <Relatorio />
      </div>
    );
  }
}
