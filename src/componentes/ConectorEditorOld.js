import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';
import ConectorImage from '../images/conector.png';
import ObjetoEditor from './ObjetoEditor.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '750px',
    height: '420px',
    marginTop: '0px',
  },
});

class ConectorEditor extends ObjetoEditor{
  constructor(props){
    super(props);
    this.state = {
        idConector: 0,
        height: 50,
        width: 100,
        probabilidade: 100,
    }
  }

  componentWillMount(){
    this.setState({ idConector: this.props.idConector});
  }

  handleDeleteConector = event => {
    Pubsub.publish('deletar-conector', {
      id: this.state.idConector
    });
  };

  handleDialog = () => {
    return (
      <DialogContent>
      <TextField
         id="standard-name"
         label="Probabilidade aplicada ao canal superior (em porcentagem)"
         className={'probabilidade-text-field'}
         value={this.state.probabilidade}
         onChange={this.handleChange('probabilidade')}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="id do Conector"
          className={'idConector-text-field'}
          value={this.state.idConector}
          margin="normal"
        />
      </DialogContent>
    );
  };

  render(){
    const { classes } = this.props;
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
    <main className={classes.drawerHeader}>
      <div className={classes.root}>
      <Draggable {...settings}>
        <img src={ConectorImage} alt="Conector" key={this.state.idConector} height={this.state.height} width={this.state.width} probabilidade={this.state.probabilidade} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
      <Dialog open={this.state.open} onClose={this._handleDoubleClickClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros do Conector"}
        </DialogTitle>
        {this.handleDialog()}
        <DialogActions>
          <Button onClick={this._handleDoubleClickClose} color="primary">
            Ok
          </Button>
          <Button onClick={this.handleDeleteConector} color="primary">
            Deletar Objeto
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </main>
    );
  }
}

ConectorEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ConectorEditor);
