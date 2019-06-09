import React from "react";
import Objeto from "./Objeto.js";
import Draggable from "react-draggable";
import Pubsub from "pubsub-js";
import ReactDOM from "react-dom";

import FilaImage from "../images/fila.png";

export default class FilaEditor extends Objeto {
  constructor(props) {
    super(props);
    this.state = {
      fila: this.props.objeto,
      x: 0,
      y: 0,
      objeto: {}
    };

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
  }

  componentWillMount() {
    Pubsub.subscribe("desconectar", (topico, desconectarObj) => {
      if (desconectarObj.id === this.state.fila.id) {
        delete this.settings.position;
      }
    });

    Pubsub.subscribe("valores-simulacao", (topico, dados) => {
      this.setState({ filas: dados.filas });
    });

    Pubsub.subscribe("atualizar-coordenadas", (topico, dados) => {
      this.handleRelCoordinates();
    });
  }

  _handleDoubleClickOpen(event) {
    Pubsub.publish("double-click", {
      tipoObjeto: this.state.fila.tipo,
      objeto: this.state.fila
    });
  }

  handleRelCoordinates() {
    let filaDOM = ReactDOM.findDOMNode(this);

    this.setState(
      {
        x: filaDOM.getBoundingClientRect().x - this.props.paper.x,
        y: filaDOM.getBoundingClientRect().y - this.props.paper.y
      },
      this.handleCoordinatesUpdate()
    );
  }

  handleCoordinatesUpdate = () => {
    let objetoAlterado = this.props.objeto;
    objetoAlterado.x = this.state.x;
    objetoAlterado.y = this.state.y;
    this.setState({ objeto: objetoAlterado }, this.handleConexoesUpdate());

    console.log("Coordinates Updating");
  };

  handleConexoesUpdate = () => {
    Pubsub.publish("valores-simulacao", this.state.objeto);
    Pubsub.publish("lista-conexoes", {});
    // Pubsub.publish('atualizar-flechas', {})
  };

  componentDidMount() {
    this.handleRelCoordinates(); // Primeiro valor de coordenadas após criação do objeto
  }

  componentWillReceiveProps() {
    // this.handleRelCoordinates();    // Atualização das coordenadas em tempo real
    // this.connection();
  }

  connection() {
    this.settings.onDrag = this.props.onControlledDrag;
  }

  render() {
    this.connection();

    return (
      <Draggable {...this.settings}>
        <img
          id={this.state.fila.id}
          src={FilaImage}
          alt="Fila"
          {...this.dadosDoObjeto}
          onDoubleClick={this._handleDoubleClickOpen}
          bounds="parent"
        />
      </Draggable>
    );
  }
}
