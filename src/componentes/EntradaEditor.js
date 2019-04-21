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

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '750px',
    height: '420px',
    marginTop: '0px',
  },
});

class EntradaEditor extends Component{
  constructor(props){
    super(props);
    this.state = {
        idEntrada: 0,
        height: 40,
        width: 50,
        chegada: 0,
        open: false
    }

    this._handleDoubleClickEntradaOpen = this._handleDoubleClickEntradaOpen.bind(this);
    this._handleDoubleClickEntradaClose = this._handleDoubleClickEntradaClose.bind(this);
    this._handleCheckParameters = this._handleCheckParameters.bind(this);
  }

  componentWillMount(){
    this.setState({ idEntrada: this.props.idEntrada});
    console.log('Valor do props: ', this.props.idEntrada);
    console.log('Valor do meu id: ', this.state.idEntrada);
  }

  _handleDoubleClickEntradaOpen(event): void {
    this.setState({open: true});
  }

  _handleDoubleClickEntradaClose(event): void {
    this.setState({open: false});
  }

  handleChange = chegada => event => {
    this.setState({ [chegada]: parseInt(event.target.value) });
  };

  handleDeleteEntrada = event => {
    Pubsub.publish('deletar-entrada', {
      id: this.state.idEntrada
    });
  };

  //método apenas para checar o valor do parametro no console
  _handleCheckParameters(event): void {
    console.log('Valor do props: ', this.props.idEntrada);
    console.log('Valor do meu id: ', this.state.idEntrada);
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
        <img src={EntradaImage} alt="Entrada" idEntrada={this.props.idEntrada} height={this.state.height} width={this.state.width} chegada={this.state.chegada} onDoubleClick={this._handleDoubleClickEntradaOpen}/>
      </Draggable>
        <Dialog open={this.state.open} onClose={this._handleDoubleClickEntradaClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Parâmetros da Entrada"}
          </DialogTitle>
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
          <DialogActions>
            <Button onClick={this._handleDoubleClickEntradaClose} color="primary">
              Ok
            </Button>
            <Button onClick={this._handleCheckParameters} color="primary">
              Verificar Parâmetros
            </Button>
            <Button onClick={this.handleDeleteEntrada} color="primary">
              Deletar Objeto
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
    );
  }
}

EntradaEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EntradaEditor);
