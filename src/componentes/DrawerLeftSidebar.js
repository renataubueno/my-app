import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import ExportJSON from './ExportJSON.js';
import ImportJSON from './ImportJSON.js';
import Associar from './Associar.js';
import Desassociar from './Desassociar.js';
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
      <div style={drawerheaderStyle}>
         <Typography align="center" variant="h6" color="primary" style={headertitleStyle} noWrap>
          PARÂMETROS
        </Typography>
        <IconButton color="primary" onClick={this.props.drawerlsb}>
          <NavigationIcon style={navigationStyle}/>
        </IconButton>
        </div>
        <Divider />
        <div>
        <Typography align="center" variant="h6" color="primary" noWrap>
          <Fila />
          <Conector /><br />
          <Saida /> <br />
          <Entrada />
        </Typography>
        </div>
        <div style={configsStyle}>
        <Divider />
        <MenuSeeder />
        <Divider />
        <MenuParada />
        <Divider />
        <MenuDistribuicao />
        <Divider />
        </div>
        <div style={actionButtonsStyle}>
        <Associar />
        <Desassociar />
        <Simulacao />
        <Divider />
        <ResetEditor />
        <Divider />
        <ExportJSON />
        <ImportJSON />
        </div>
      </div>
    );
  }
}

const navigationStyle = {
  transform: 'rotate(-90deg)',
}

const drawerheaderStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '7px 0 7px 0',
  justifyContent: 'flex-end'
}

const headertitleStyle = {
  paddingRight: '5px'
}

const actionButtonsStyle = {
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '15px',
  height: '190px'
}

const configsStyle = {
  backgroundColor: '#eaeaea'
}
