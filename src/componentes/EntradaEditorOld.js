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
import EntradaImage from '../images/entrada.png';
import ObjetoEditor from './ObjetoEditor.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '750px',
    height: '420px',
    marginTop: '0px',
  },
});

class EntradaEditor extends ObjetoEditor {
  constructor(props){
    super(props);
    this.state = {
        idEntrada: 0,
        height: 40,
        width: 50,
        chegada: 0,
    }
  }

  componentWillMount(){
    this.setState({ idEntrada: this.props.idEntrada});
  }

  handleDeleteEntrada = event => {
    Pubsub.publish('deletar-entrada', {
      id: this.state.idEntrada
    });
  };

  handleDialog = () => {
    return (
      <DialogContent>
      <TextField
         id="standard-name"
         label="Momento da primeira chegada:"
         className={'chegada-text-field'}
         value={this.state.chegada}
         onChange={this.handleChange('chegada')}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="id da Entrada"
          className={'idEntrada-text-field'}
          value={this.state.idEntrada}
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
    <div>
      <Draggable {...settings} onDrag={this.handleDrag} >
        <img src={EntradaImage} alt="Entrada" idEntrada={this.props.idEntrada} height={this.state.height} width={this.state.width} chegada={this.state.chegada} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
        <Dialog open={this.state.open} onClose={this._handleDoubleClickClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Parâmetros da Entrada"}
          </DialogTitle>
          {this.handleDialog()}
          <DialogActions>
            <Button onClick={this._handleDoubleClickClose} color="primary">
              Ok
            </Button>
            <Button onClick={this.handleDeleteEntrada} color="primary">
              Deletar Objeto
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    );
  }
}

EntradaEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EntradaEditor);
