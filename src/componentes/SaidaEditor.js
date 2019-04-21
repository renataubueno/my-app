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
import SaidaImage from '../images/saida.png';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '750px',
    height: '420px',
    marginTop: '0px',
  },
});

class SaidaEditor extends Component{
  constructor(props){
    super(props);
    this.state = {
        idSaida: 0,
        height: 40,
        width: 50,
        open: false
    }

    this._handleDoubleClickSaidaOpen = this._handleDoubleClickSaidaOpen.bind(this);
    this._handleDoubleClickSaidaClose = this._handleDoubleClickSaidaClose.bind(this);
    this._handleCheckParameters = this._handleCheckParameters.bind(this);
  }

  componentWillMount(){
    this.setState({ idSaida: this.props.idSaida});
    console.log('Valor do props: ', this.props.idSaida);
    console.log('Valor do meu id: ', this.state.idSaida);
  }

  _handleDoubleClickSaidaOpen(event): void {
    this.setState({open: true});
  }

  _handleDoubleClickSaidaClose(event): void {
    this.setState({open: false});
  }

  handleDeleteSaida = event => {
    Pubsub.publish('deletar-saida', {
      id: this.state.idSaida
    });
  };

  //método apenas para checar o valor do parametro no console
  _handleCheckParameters(event): void {
    console.log('Valor do props: ', this.props.idSaida);
    console.log('Valor do meu id: ', this.state.idSaida);
  }

  render(){
    const { classes } = this.props;
    const bound = "parent";
    const position = {x: 0, y: 0};
    const settings = {bounds: bound, defaultPosition: position};

    return(
    <main className={classes.drawerHeader}>
      <div className={classes.root}>
      <Draggable {...settings}>
        <img src={SaidaImage} alt="Saida" key={this.props.idSaida} height={this.state.height} width={this.state.width} onDoubleClick={this._handleDoubleClickSaidaOpen} />
      </Draggable>
      <Dialog open={this.state.open} onClose={this._handleDoubleClickSaidaClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Parâmetros da Saída"}
        </DialogTitle>
        <DialogContent>
        <TextField
           id="standard-name"
           label="id da Saída"
           className={'idSaida-text-field'}
           value={this.state.idSaida}
           margin="normal"
         />
        </DialogContent>
        <DialogActions>
          <Button onClick={this._handleDoubleClickSaidaClose} color="primary">
            Ok
          </Button>
          <Button onClick={this._handleCheckParameters} color="primary">
            Verificar Parâmetros
          </Button>
          <Button onClick={this.handleDeleteSaida} color="primary">
            Deletar Objeto
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </main>
    );
  }
}

SaidaEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SaidaEditor);
