import React, {Component} from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';

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
      </div>
    );
  }
}
