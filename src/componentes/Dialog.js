import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Dialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: this.props.open
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };

  handleDeleteFila = () => {
    console.log('Deletar fila');
  };

  render(){
    return(
      <Dialog open={this.state.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros da Fila"}
        </DialogTitle>
        {/*{this.handleDialog()}*/}
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Ok
          </Button>
          <Button onClick={this.handleDeleteFila} color="primary">
            Deletar Objeto
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
