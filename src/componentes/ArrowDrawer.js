import React, { Component } from "react";
import Arrow from "./Arrow.js";
import Pubsub from "pubsub-js";

export default class ArrowDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conexoes: []
    };
    this.canvas = React.createRef();
  }

  handleAtualizarFlechas = () => {
    Pubsub.publish("atualizar-flechas", {});
  };

  // Cria uma lista de conexões para usar ao mapear as flechas

  handleCurrentConexoes = () => {
    console.log("Filas", this.props.filas);

    let fila;
    let saida;
    let chegada;
    let conexoes = [];
    let filasCoordenadas = [];

    for (fila in this.props.filas) {
      if (fila != "") {
        let filaId = this.props.filas[fila].id;
        let filaX = this.props.filas[fila].x;
        let filaY = this.props.filas[fila].y;
        let filaCoordenadas = { id: filaId, x: filaX, y: filaY };
        filasCoordenadas.push(filaCoordenadas);
        this.setState(
          { filasCoordenadas: filasCoordenadas },
          this.handleAtualizarFlechas()
        );

        let conexao;

        for (chegada in this.props.filas[fila].chegadas) {
          if (this.props.filas[fila].chegadas[chegada].origem === "Entrada") {
            let origem;
            let destino;
            origem = this.props.filas[fila].chegadas[chegada].origem;
            destino = this.props.filas[fila].chegadas[chegada].destino;
            conexao = { origem, destino };
            conexoes.push(conexao);
            this.setState(
              { conexoes: conexoes },
              this.handleAtualizarFlechas()
            );
          }
        }

        for (saida in this.props.filas[fila].saidas)
          if (saida != "") {
            let origem;
            let destino;
            console.log(`Saída ${saida}`);
            console.log(
              `Destino ${this.props.filas[fila].saidas[saida].destino}`
            );
            origem = this.props.filas[fila].id;
            destino = this.props.filas[fila].saidas[saida].destino;
            conexao = { origem, destino };
            conexoes.push(conexao);
            console.log(conexoes);
            this.setState(
              { conexoes: conexoes },
              this.handleAtualizarFlechas()
            );
          }
      }
    }
  };

  componentWillMount() {
    Pubsub.subscribe("lista-conexoes", (topico, dados) => {
      console.log("Atualizar lista de conexões");
      this.handleCurrentConexoes();
    });
  }

  componentDidMount() {
    this.handleCurrentConexoes();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.conexoes.map(conexao => (
          <Arrow
            key={this.state.conexoes[conexao]}
            conexao={conexao}
            filasCoordenadas={this.state.filasCoordenadas}
          />
        ))}
      </React.Fragment>
    );
  }
}
