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
    width: '800px',
    height: '450px',
    position: 'relative',
    //alignItems: 'center',
    //marginLeft: '245px',
    //marginTop: '175px',
    //...theme.mixins.gutters(),
    //paddingTop: theme.spacing.unit * 4,
    //paddingBottom: theme.spacing.unit * 5,
  },
});

class FilaEditorExp extends ObjetoEditor{
  constructor(props){
    super(props);
    this.state = {
        idFila: 0,
        height: 60,
        width: 100,
        capacidade: 0,
        servidores: 0,
        media: 0,
        value: '',
        showExponencial: false
    }
  }

  componentWillMount(){
    this.setState({ idFila: this.props.idFila});

    Pubsub.subscribe('retorno-tipo-distribuicao', (topico, dadosDaDistribuicao) => {
       this.setState({value: dadosDaDistribuicao.distribuicao});
   });
  }

  handleDeleteFila = event => {
    Pubsub.publish('deletar-fila-exp', {
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
           label="Média"
           className={'condicao-media-text-field'}
           value={this.state.media}
           onChange={this.handleChangeFloat('media')}
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
    );
  }
}

FilaEditorExp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FilaEditorExp);
