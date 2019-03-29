import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

class Editor extends React.Component{
  render(){
    const { classes } = this.props;

    return(
      <main>
        <div className={classes.drawerHeader} />
        EDITOR
      </main>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Editor);
