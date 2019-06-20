import React, { Component } from "react";
import { string } from "prop-types";
import Pubsub from "pubsub-js";

export default class Arrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origem: {},
      destino: {},
      d: string
    };
    this.canvas = React.createRef();
  }

  handleCoordenadas = () => {
    for (var fila in this.props.filasCoordenadas)
      if (this.props.filasCoordenadas[fila].id === this.props.conexao.origem) {
        var origemCoordenadas = {
          x: this.props.filasCoordenadas[fila].x,
          y: this.props.filasCoordenadas[fila].y,
          id: this.props.conexao.origem
        };
        this.setState({ origem: origemCoordenadas }, this.handlePathDrawing());
      } else if (
        this.props.filasCoordenadas[fila].id === this.props.conexao.destino
      ) {
        var destinoCoordenadas = {
          x: this.props.filasCoordenadas[fila].x,
          y: this.props.filasCoordenadas[fila].y,
          id: this.props.conexao.destino
        };
        this.setState(
          { destino: destinoCoordenadas },
          this.handlePathDrawing()
        );
      }
  };

  componentWillMount() {
    Pubsub.subscribe("atualizar-flechas", (topico, dados) => {
      this.handleCoordenadas();
    });
  }

  handlePathDrawing = () => {
    if (this.props.conexao.origem === "Entrada") {
      this.handleEntrada();
    } else if (this.props.conexao.destino === "Saída") {
      this.handleSaida();
    } else if (this.props.conexao.origem === this.props.conexao.destino) {
      this.handleSelfTarget();
    } else {
      if (this.state.origem.x >= this.state.destino.x) {
        this.handleLowerXTarget();
      } else {
        this.handleHigherXTarget();
      }
    }
  };

  offsetYEntrada = () => {
    let offsetEntrada;
    for (let fila in this.props.filasCoordenadas) {
      if (this.props.filasCoordenadas[fila].id === this.state.destino.id) {
        if (this.props.filasCoordenadas[fila].numChegadas > 1) {
          offsetEntrada = 20;
          return offsetEntrada;
        } else {
          offsetEntrada = 0;
          return offsetEntrada;
        }
      }
    }
  };

  offsetYSaida = () => {
    let offsetSaida;
    for (let fila in this.props.filasCoordenadas) {
      if (this.props.filasCoordenadas[fila].id === this.state.origem.id) {
        if (this.props.filasCoordenadas[fila].numSaidas > 1) {
          offsetSaida = 20;
          return offsetSaida;
        } else {
          offsetSaida = 0;
          return offsetSaida;
        }
      }
    }
  };

  offsetYSelfTargetSaida = () => {
    let _offsetY;
    for (let fila in this.props.filasCoordenadas) {
      if (this.props.filasCoordenadas[fila].id === this.state.origem.id) {
        if (this.props.filasCoordenadas[fila].numSaidas > 1) {
          _offsetY = -20;
          return _offsetY;
        } else {
          _offsetY = 0;
          return _offsetY;
        }
      }
    }
  };

  offsetYSelfTargetEntrada = () => {
    let _offsetY;
    for (let fila in this.props.filasCoordenadas) {
      if (this.props.filasCoordenadas[fila].id === this.state.origem.id) {
        if (this.props.filasCoordenadas[fila].numChegadas > 1) {
          _offsetY = -20;
          return _offsetY;
        } else {
          _offsetY = 0;
          return _offsetY;
        }
      }
    }
  };

  handleEntrada = () => {
    let offsetYEntrada = this.offsetYEntrada();
    let _startPoint = `M ${this.state.destino.x - 100} ${this.state.destino.y +
      30 +
      offsetYEntrada}`;
    console.log("offset", offsetYEntrada);
    let _endPoint = `L ${this.state.destino.x} ${this.state.destino.y +
      30 +
      offsetYEntrada}`;
    console.log("offset", offsetYEntrada);
    this.setState(
      { d: `${_startPoint} ${_endPoint}` },
      console.log(this.state.d)
    );
  };

  handleSaida = () => {
    let offsetSaida = this.offsetYSaida();
    let _startPoint = `M ${this.state.origem.x + 100} ${this.state.origem.y +
      30 +
      offsetSaida}`;
    let _endPoint = `L ${this.state.origem.x + 200} ${this.state.origem.y +
      30 +
      offsetSaida}`;
    this.setState({ d: `${_startPoint} ${_endPoint}` });
  };

  handleSelfTarget = () => {
    let _offsetYEntrada = this.offsetYSelfTargetEntrada();
    let _offsetYSaida = this.offsetYSelfTargetSaida();
    let _startPoint = `M ${this.state.origem.x + 100} ${this.state.origem.y +
      30 +
      _offsetYSaida}`;
    let _middlePath = `L ${this.state.origem.x + 115} ${this.state.origem.y +
      30 +
      _offsetYSaida} 
      L ${this.state.origem.x + 115} ${this.state.origem.y - 10}
      L ${this.state.origem.x - 15} ${this.state.origem.y - 10}
      L ${this.state.origem.x - 15} ${this.state.origem.y +
      30 +
      _offsetYEntrada}`;
    let _endPoint = `L ${this.state.origem.x} ${this.state.origem.y +
      30 +
      _offsetYEntrada}`;
    this.setState({ d: `${_startPoint} ${_middlePath} ${_endPoint}` });
  };

  handleLowerXTarget = () => {
    let _startPoint = `M ${this.state.origem.x + 100} ${this.state.origem.y +
      30}`;
    let _offsetY = () =>
      this.state.origem.y > this.state.destino.y ? -30 : +90;
    let _middlePath = `L ${this.state.origem.x + 130} ${this.state.origem.y +
      30}
    L ${this.state.origem.x + 130} ${this.state.origem.y + _offsetY()}
    L ${this.state.destino.x - 30} ${this.state.origem.y + _offsetY()}
    L ${this.state.destino.x - 30} ${this.state.destino.y + 30}`;
    let _endPoint = `L ${this.state.destino.x} ${this.state.destino.y + 30}`;
    this.setState({ d: `${_startPoint} ${_middlePath} ${_endPoint}` });
  };

  handleHigherXTarget = () => {
    let _startPoint = `M ${this.state.origem.x + 100} ${this.state.origem.y +
      30}`;
    let _endPoint = `L ${this.state.destino.x} ${this.state.destino.y + 30}`;
    if (this.state.origem.y === this.state.destino.y) {
      this.setState({ d: `${_startPoint} ${_endPoint}` });
    } else {
      let _middleX = (this.state.destino.x + this.state.origem.x) / 2;
      let _middlePath = `L ${_middleX} ${this.state.origem.y +
        30} L ${_middleX} ${this.state.destino.y + 30}`;
      console.log(`${_startPoint} ${_middlePath} ${_endPoint}`);
      this.setState({ d: `${_startPoint} ${_middlePath} ${_endPoint}` });
    }
  };

  componentDidMount = () => {
    // this.handleCoordenadas()
    this.handleCoordenadas();
  };

  render() {
    return (
      <svg style={canvasStyle}>
        <g>
          <marker
            id="red-arrowhead"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="4"
            markerHeight="3"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="red" />
          </marker>
          <path
            id="lineAB"
            d={this.state.d}
            stroke="red"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#red-arrowhead)"
          />
        </g>
      </svg>
    );
  }
}

const canvasStyle = {
  // border: '1px solid black',
  width: "100%",
  height: "100%",
  margin: "0",
  position: "absolute",
  top: "0",
  left: "0",
  pointerEvents: "none"
};
