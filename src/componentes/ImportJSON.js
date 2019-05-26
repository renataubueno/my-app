import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/* Componente que trigga a janela para importar um arquivo JSON */
/* No momento: não-funcional */
export default class ImportJSON extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};
  }

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
        Importar JSON
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Escolher arquivo JSON para importar"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Procurar por arquivo JSON
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Fechar Janela
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Procurar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
