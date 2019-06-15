import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pubsub from 'pubsub-js';

/* Componente que trigga a janela para importar um arquivo JSON */
export default class ImportJSON extends Component{
  constructor(props){
    super(props);
    this.state = {open: false};
  };

  onChange = (event) => {
    //console.log(event.target.files);

    let files = [];
    let jsonFile = null;
    let reader = new FileReader();

    if (event.target.files) {
      files = event.target.files;
      reader.readAsText(files[0]);

      let file = null;
      reader.onload = (ev) => {
        //console.log(ev.target.result);
        file = ev.target.result;

        if (file) {
          //console.log(file);
          //console.log(typeof(file));

          try {
            jsonFile = JSON.parse(file);
          } catch(error) {
            console.log('Erro ao ler arquivo', error);
          }

          console.log(jsonFile);
          console.log(typeof(jsonFile));
          console.log(JSON.stringify(jsonFile));

          Pubsub.publish('import-json', {
            filas: jsonFile.fila,
          });
        }
      };
    }

  };
  //função para popular tópicos -> publish tudo que o editor precisa

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
          <div>
            <input type='file' name='file' onChange={(event) => this.onChange(event)}/>
          </div>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
