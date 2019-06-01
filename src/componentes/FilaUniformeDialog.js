import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Pubsub from 'pubsub-js';

export default class FilaUniformeDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      objeto: this.props.objeto,
    }
    this.servidoresInput = React.createRef();
    this.capacidadeInput = React.createRef();
    this.minChegadasInput = React.createRef();
    this.maxChegadasInput = React.createRef();
    this.minServicosInput = React.createRef();
    this.maxServicosInput = React.createRef();
    this.idInput = React.createRef();
  }

  handleChange = parametro => event => {
    console.log('State do FilaUniformeDialog', this.state);
    let objetoAlterado = this.state.objeto;
    objetoAlterado[parametro] = parseInt(event.target.value);
    this.setState({ objeto: objetoAlterado });
    Pubsub.publish('alteracoes', {
    });
  };

  handleFocus = (event) => event.target.select();

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.handleNextFocus(event)
    }
  }

  handleNextFocus(event) {
    if(event.target.id === 'servidores') {
      this.capacidadeInput.current.focus();
    }
    else if(event.target.id === 'capacidade') {
      this.minChegadasInput.current.focus();
    }
    else if(event.target.id === 'minimo-chegadas') {
      this.maxChegadasInput.current.focus();
    }
    else if(event.target.id === 'maximo-chegadas') {
      this.minServicosInput.current.focus();
    }
    else if(event.target.id === 'minimo-servico') {
      this.maxServicosInput.current.focus();
    }
    else if(event.target.id === 'maximo-servico') {
      this.idInput.current.focus()
    }
    else if(event.target.id === 'id') {
      this.props.onOKSelection()
    }
    
  }


  render(){
    return(
      <DialogContent>
      <TextField
         id="servidores"
         label="Servidores:"
         className={'chegada-text-field'}
         value={this.state.objeto.servidores}
         onChange={this.handleChange('servidores')}
         margin="normal"
         onFocus={this.handleFocus}
         onKeyPress={this.handleKeyPress}
         inputRef={this.servidoresInput}
       />
       <TextField
          id="capacidade"
          label="Capacidade:"
          className={'capacidade-text-field'}
          value={this.state.objeto.capacidade}
          onChange={this.handleChange('capacidade')}
          margin="normal"
          onFocus={this.handleFocus}
          onKeyPress={this.handleKeyPress}
          inputRef={this.capacidadeInput}
        />
        <TextField
           id="minimo-chegadas"
           label="Número Mínimo de Chegadas"
           className={'condicao-min-chegada-text-field'}
           value={this.state.objeto.minChegada}
           onChange={this.handleChange('minChegada')}
           margin="normal"
           onFocus={this.handleFocus}
           onKeyPress={this.handleKeyPress}
           inputRef={this.minChegadasInput}
         />
         <TextField
            id="maximo-chegadas"
            label="Número Máximo de Chegadas"
            className={'condicao-max-chegada-text-field'}
            value={this.state.objeto.maxChegada}
            onChange={this.handleChange('maxChegada')}
            margin="normal"
            onFocus={this.handleFocus}
            onKeyPress={this.handleKeyPress}
            inputRef={this.maxChegadasInput}
          />
          <TextField
             id="minimo-servico"
             label="Número Mínimo de Serviço"
             className={'condicao-min-servico-text-field'}
             value={this.state.objeto.minServico}
             onChange={this.handleChange('minServico')}
             margin="normal"
             onFocus={this.handleFocus}
             onKeyPress={this.handleKeyPress}
             inputRef={this.minServicosInput}
           />
           <TextField
              id="maximo-servico"
              label="Número Máximo de Serviço"
              className={'condicao-max-servico-text-field'}
              value={this.state.objeto.maxServico}
              onChange={this.handleChange('maxServico')}
              margin="normal"
              onFocus={this.handleFocus}
              onKeyPress={this.handleKeyPress}
              inputRef={this.maxServicosInput}
            />
            <TextField
              id="id"
              label="id da Fila"
              className={'idFila-text-field'}
              value={this.state.objeto.id}
              margin="normal"
              onFocus={this.handleFocus}
              onKeyPress={this.handleKeyPress}
              inputRef={this.idInput}
            />
            <Divider />
            <Typography align="center" variant="subtitle1" color="primary" noWrap >
              Chegadas Para esta Fila
            </Typography>
            {
              this.state.objeto.chegadas.map(item => (
                <Typography key={item}  align="center" variant="body1" color="primary" noWrap>
                  Origem: {item.origem}; Porcentagem: {item.porcentagem}%
                </Typography>
              ))
            }
            <Divider />
            <Typography align="center" variant="subtitle1" color="primary" noWrap >
              Saídas desta Fila
            </Typography>
            {
              this.state.objeto.saidas.map(item => (
                <Typography key={item}  align="center" variant="body1" color="primary" noWrap>
                  Destino: {item.destino}; Porcentagem: {item.porcentagem}%
                </Typography>
              ))
            }
      </DialogContent>
    );
  }
}
