import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Pubsub from "pubsub-js";
import Validador from "../service/validador.js";

export default class Simulacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filas: [],
      condParada: 0,
      tipoParada: "",
      seeder: 0
    };
  }

  componentWillMount() {
    Pubsub.subscribe("associacoes-feitas", (topico, dados) => {
      console.log("Associações recebidas no Simulacao.js: ", dados);
      this.setState({ filas: dados.filas });
    });

    Pubsub.subscribe("alteracoes", (topico, dados) => {
      console.log("Os parâmetros de algum objeto foram alterados");
    });

    Pubsub.subscribe(
      "retorno-condicao-parada-num-chegadas",
      (topico, condParadaNumChegadas) => {
        console.log(
          "Condicao de parada recebida no Simulacao.js: ",
          condParadaNumChegadas.condParada
        );
        console.log(
          "Valor de parada recebida no Simulacao.js: ",
          condParadaNumChegadas.condicao
        );
        this.setState({ condParada: condParadaNumChegadas.condicao });
        this.setState({ tipoParada: condParadaNumChegadas.condParada });
      }
    );

    Pubsub.subscribe(
      "retorno-condicao-parada-tempo-simulacao",
      (topico, condParadaTempo) => {
        console.log(
          "Condicao de parada recebida no Simulacao.js: ",
          condParadaTempo.condParada
        );
        console.log(
          "Valor de parada recebida no Simulacao.js: ",
          condParadaTempo.condicao
        );
        this.setState({ condParada: condParadaTempo.condicao });
        this.setState({ tipoParada: condParadaTempo.condParada });
      }
    );

    Pubsub.subscribe("retorno-seeder", (topico, seeder) => {
      console.log("Seeder recebido no Simulacao.js: ", seeder.seeder);
      this.setState({ seeder: seeder.seeder });
    });
  }

  handleClick = control => event => {
    let body = {
      objSimulacao: this.state.filas,
      seeder: this.state.seeder,
      condParada: this.state.condParada,
      tipoParada: this.state.tipoParada
    };

    console.log("O QUE TEM NO BODY? ", body);
    console.log("O que tem no state? ", this.state.condParada);

    if (Validador.validar(body)) {
      //POST
      console.log("PROCESS ENV:", process.env.REACT_APP_API_URL);
      console.log(
        "DOUBLE CHECK: ",
        `${process.env.REACT_APP_API_URL}simulacao`
      );
      // fetch(`${process.env.REACT_APP_API_URL}simulacao`, {
      fetch("http://localhost:3000/simulacao", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("RESPONSE - DEU ERRO: ", response);
          }
        })
        .then(retorno => {
          console.log("RESPONSE.JSON: ", retorno);
          Pubsub.publish("post-retorno", {
            retorno: retorno
          });
          this.setState({ retorno: retorno });
        })
        .catch(response => {
          console.log("Estou no catch", response);
        });
    } else {
      console.log("NÃO DEU POST");
    }
  };

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleClick("control")}>
          Iniciar Simulação
        </Button>
      </div>
    );
  }
}
