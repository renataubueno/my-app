import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  drawerHeader: {
    width: '300px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    padding: '100px 50px 75px 100px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },root: {
    width: '800px',
    height: '400px',
    alignItems: 'center',
    marginLeft: '245px',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 5,
  },
});

class Editor extends React.Component{
  render(){
    const { classes } = this.props;

    return(
      <main>
        <div className={classes.drawerHeader} />
        <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          EDITOR
        </Typography>
        <Typography component="p">
        </Typography>
      </Paper>
      </main>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
