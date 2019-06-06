import React, { Component } from 'react';
import Arrow from './Arrow.js';
import Pubsub from 'pubsub-js';

export default class ArrowDrawer extends Component {

	constructor(props){
		super(props);
		this.state = {
			conexoes: [],
			
		}
		this.canvas = React.createRef();
}

	// handleConexoes = () => {
	// 		this.state.conexoes.map(conexao => (
	// 			<Arrow conexao={conexao} filasCoordenadas={this.filasCoordenadas}/>
	// 		)
	// 	);
	// };


	handleCurrentConexoes = () => {
		console.log('Filas', this.props.filas)

		let fila;
		let saida;
		let chegada;
		let conexoes = [];
		let filasCoordenadas = [];

		for (fila in this.props.filas) {
			if (fila != '') {

				let filaId = this.props.filas[fila].id
				let filaX = this.props.filas[fila].x
				let filaY = this.props.filas[fila].y
				let filaCoordenadas = {id: filaId, x: filaX, y: filaY}
				filasCoordenadas.push(filaCoordenadas)
				this.setState({filasCoordenadas: filasCoordenadas})


				console.log(`Fila ${fila}`)
				for (saida in this.props.filas[fila].saidas)
				if (saida != '') {
					let origem;
					let destino;
					let conexao;

					console.log(`Saída ${saida}`)
					console.log(`Destino ${this.props.filas[fila].saidas[saida].destino}`)
					origem = this.props.filas[fila].id
					destino = this.props.filas[fila].saidas[saida].destino
					conexao = {origem, destino}
					conexoes.push(conexao)
					console.log(conexoes)
					this.setState({conexoes: conexoes})
				}

				// for (chegada in this.props.filas[fila].chegadas)
				// if (chegada != '') {
				// 	console.log(`Chegadas ${chegada}`)
				// 	console.log(`Origem ${this.props.filas[fila].chegadas[chegada].origem}`)
				// }
			}
		}



		// let i = 0;
		
		// for (i = 0; i < this.props.filas.length; i++) {
		// 	try {
		// 		console.log(`Fila ${i} Destino`, this.props.filas[i].saidas[i].destino)
		// 	}
		// 	catch (e) {
		// 		console.error("inner", e.message);
		// 	}

		// 	try {
		// 		console.log(`Fila ${i} Origem`, this.props.filas[i].chegadas[i].origem)
		// 	}
		// 	catch (e) {
		// 		console.error("inner", e.message);
		// 	}	
		// }
	}

	componentWillMount() {
		Pubsub.subscribe('lista-conexoes', (topico, dados) => {
			console.log('Atualizar lista de conexões');
			this.handleCurrentConexoes();
		});
	
	}


	componentDidMount() {
		this.handleCurrentConexoes();
	}

	componentWillReceiveProps() {
		this.handleCurrentConexoes();
		// this.handleConexoes();
	}
	

    render() {
			return (
				<React.Fragment>
					{this.state.conexoes.map(conexao =>
					<Arrow 
						key={this.state.conexoes[conexao]}
						conexao={conexao}
						filasCoordenadas={this.state.filasCoordenadas}

          />
          )}
				</React.Fragment>
		)
	}
}
