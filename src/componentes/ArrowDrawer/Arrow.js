import React, { Component } from 'react'
import { string } from 'prop-types';

export default class Arrow extends Component {
    constructor(props){
        super(props);
        this.state = {
					origem: {},
					destino: {},
					d: string
					
        }
				this.canvas = React.createRef();
    }


	handleCoordenadas = () => {
		for (var fila in this.props.filasCoordenadas)
			if (this.props.filasCoordenadas[fila].id === this.props.conexao.origem) {
				var origemCoordenadas = {
					x: this.props.filasCoordenadas[fila].x,
					y: this.props.filasCoordenadas[fila].y,
					id: this.props.conexao.origem
				}
				this.setState({origem: origemCoordenadas})
			}
			
			else if (this.props.filasCoordenadas[fila].id === this.props.conexao.destino) {
				var destinoCoordenadas = {
					x: this.props.filasCoordenadas[fila].x,
					y: this.props.filasCoordenadas[fila].y,
					id: this.props.conexao.destino
				}
				this.setState({destino: destinoCoordenadas})
			}

	}

    handleTestDrawing = () => {
        console.log(this.canvas)
    }

    componentWillMount() {
        this.handleTestDrawing();
		}
		
		handlePathDrawing = () => {
			let _startPoint = `M ${this.state.origem.x + 100} ${this.state.origem.y + 30}`
			let _endPoint = `L ${this.state.destino.x} ${this.state.destino.y + 30}`
			if (this.state.origem.y === this.state.destino.y) {
				return `${_startPoint} ${_endPoint}`
			}
			else {
				let _middleX = (this.state.destino.x + this.state.origem.x) / 2
				let _middlePath = `L ${_middleX} ${this.state.origem.y + 30} L ${_middleX} ${this.state.destino.y + 30}`
				console.log(`${_startPoint} ${_middlePath} ${_endPoint}`)
				return `${_startPoint} ${_middlePath} ${_endPoint}`
			}
			
		}

		componentDidMount = () => {
			// this.handleCoordenadas()
			this.setState({d: this.handlePathDrawing()})
			
		}

		componentWillReceiveProps = () => {
			this.handleCoordenadas();
			this.setState({d: this.handlePathDrawing()});
		}

    render() {
        return (
				  <svg style={canvasStyle}>
						<g>
							<marker id="red-arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="strokeWidth" markerWidth="4" markerHeight="3" orient="auto">
        				<path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill='red'/>
  						</marker>
							<path 
								id="lineAB" 
								d={this.state.d}
								stroke='red'
								strokeWidth="3" 
								fill="none"
								marker-end="url(#red-arrowhead)">
							</path>
						</g>
					</svg>
        )
    }
}



const canvasStyle = {
    // border: '1px solid black',
    width: '100%',
    height: '100%',
    margin: '0',
		position: 'absolute',
		top: '0',
		left: '0',
		pointerEvents: 'none',
}