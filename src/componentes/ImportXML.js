import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AlertImportXML from './AlertImportXML.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ImportXML extends Component{
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
    return(
      <div>
      <Button variant="contained" onClick={this.handleClickOpen} /*className={classes.button}*/>
        Importar XML
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Escolher arquivo XML para importar"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Procurar por arquivo XML
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Procurar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
