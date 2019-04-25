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
import FilaImage from '../images/fila.png';
import ObjetoEditor from './ObjetoEditor.js';

const styles = theme => ({
  drawerHeader: {
  },root: {
    width: '750px',
    height: '420px',
    marginTop: '0px',
  },
});

class FilaEditorUnif extends ObjetoEditor{
  constructor(props){
    super(props);
    this.state = {
        idFila: 0,
        height: 60,
        width: 100,
        capacidade: 0,
        servidores: 0,
        minChegada: 0,
        maxChegada: 0,
        minServico: 0,
        maxServico: 0,
        value: '',
        showUniforme: false
    }
  }

  componentWillMount(){
    this.setState({ idFila: this.props.idFila});

    Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
       this.setState({value: dadosDaDistribuicao.distribuicao});
   });
  }

  _handleDoubleClickFilaOpen(event): void {
    this.setState({open: true});
  }

  _handleDoubleClickFilaClose(event): void {
    this.setState({open: false});
  }

  handleDeleteFila = event => {
    Pubsub.publish('deletar-fila-unif', {
      id: this.state.idFila
    });
  };

  handleDialog = () => {
    return (
      <DialogContent>
      <TextField
         id="standard-name"
         label="Servidores:"
         className={'chegada-text-field'}
         value={this.state.servidores}
         onChange={this.handleChange('servidores')}
         margin="normal"
       />
       <TextField
          id="standard-name"
          label="Capacidade:"
          className={'capacidade-text-field'}
          value={this.state.capacidade}
          onChange={this.handleChange('capacidade')}
          margin="normal"
        />
       <TextField
          id="standard-name"
          label="id da Fila"
          className={'idFila-text-field'}
          value={this.state.idFila}
          margin="normal"
        />
        <TextField
           id="standard-name"
           label="Número Mínimo de Chegadas"
           className={'condicao-min-chegada-text-field'}
           value={this.state.minChegada}
           onChange={this.handleChange('minChegada')}
           margin="normal"
         />
         <TextField
            id="standard-name"
            label="Número Máximo de Chegadas"
            className={'condicao-max-chegada-text-field'}
            value={this.state.maxChegada}
            onChange={this.handleChange('maxChegada')}
            margin="normal"
          />
          <TextField
             id="standard-name"
             label="Número Mínimo de Serviço"
             className={'condicao-min-servico-text-field'}
             value={this.state.minServico}
             onChange={this.handleChange('minServico')}
             margin="normal"
           />
           <TextField
              id="standard-name"
              label="Número Máximo de Serviço"
              className={'condicao-max-servico-text-field'}
              value={this.state.maxServico}
              onChange={this.handleChange('maxServico')}
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
        <img src={FilaImage} alt="Fila" idFila={this.props.idFila} height={this.state.height} width={this.state.width} capacidade={this.state.capacidade} servidores={this.state.servidores} onDoubleClick={this._handleDoubleClickOpen}/>
      </Draggable>
        <Dialog open={this.state.open} onClose={this._handleDoubleClickClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Parâmetros da Fila"}
          </DialogTitle>
          {this.handleDialog()}
          <DialogActions>
            <Button onClick={this._handleDoubleClickClose} color="primary">
              Ok
            </Button>
            <Button onClick={this.handleDeleteFila} color="primary">
              Deletar Objeto
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
    );
  }
}

FilaEditorUnif.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FilaEditorUnif);
