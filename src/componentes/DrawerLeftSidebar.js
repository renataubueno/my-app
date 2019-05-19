import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import ExportJSON from './ExportJSON.js';
import ImportJSON from './ImportJSON.js';
import Simulacao from './Simulacao.js';
import ResetEditor from './ResetEditor.js';
import Typography from '@material-ui/core/Typography';
import MenuDistribuicao from './MenuDistribuicao.js';
import MenuParada from './MenuParada.js';
import MenuSeeder from './MenuSeeder.js';
import Fila from './Fila.js';
import Conector from './Conector.js';
import Saida from './Saida.js';
import Entrada from './Entrada.js';

export default class DrawerLeftSidebar extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};
  }

  render(){return(
      <div className={'left-drawer-header'}>
        <IconButton color="primary" onClick={this.props.drawerlsb}>
          <NavigationIcon/>
        </IconButton>
        <Divider />
        <div>
        <Typography align="center" variant="h6" color="primary" noWrap>
          <Fila /> <br />
          <Conector /> <br />
          <Saida /> <br />
          <Entrada />
        </Typography>
        </div>
        <Divider />
        <MenuSeeder />
        <Divider />
        <MenuParada />
        <Divider />
        <MenuDistribuicao />
        <Divider />
        <Simulacao />
        <Divider />
        <ResetEditor />
        <Divider />
        <ExportJSON />
        <ImportJSON />
      </div>
    );
  }
}
