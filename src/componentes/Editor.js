import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Pubsub from 'pubsub-js';
import Draggable from 'react-draggable'
import DialogFila from './DialogFila.js';
import DialogConector from './DialogConector.js';
import DialogSaida from './DialogSaida.js';
import DialogEntrada from './DialogEntrada.js';

const styles = theme => ({
  drawerHeader: {
  },rootEditor: {
    width: '800px',
    height: '450px',
    position: 'fixed',
    marginLeft: '245px',
    marginTop: '175px',
    //alignItems: 'center',
    //...theme.mixins.gutters(),
    //paddingTop: theme.spacing.unit * 4,
    //paddingBottom: theme.spacing.unit * 5,
  },
});

class Editor extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { classes } = this.props;
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position}

    return(
      <Paper className={classes.rootEditor} elevation={2}>
        <DialogFila />
        <DialogConector/>
        <DialogSaida/>
        <DialogEntrada/>
      </Paper>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
