import React, { Component } from 'react'
import { string } from 'prop-types';

export default class Arrow extends Component {
    constructor(props){
        super(props);
        this.state = {
					saida: {x: 555, y: 0},
					chegada: {x: 422, y: 346},
					d: string
					
        }
				this.canvas = React.createRef();
    }


    handleTestDrawing = () => {
        console.log(this.canvas)
    }

    componentWillMount() {
        this.handleTestDrawing();
		}
		
		handlePathDrawing = () => {
			let _startPoint = `M ${this.state.saida.x} ${this.state.saida.y}`
			let _endPoint = `L ${this.state.chegada.x} ${this.state.chegada.y}`
			if (this.state.saida.y === this.state.chegada.y) {
				return `${_startPoint} ${_endPoint}`
			}
			else {
				let _middleX = (this.state.chegada.x + this.state.saida.x) / 2
				let _middlePath = `L ${_middleX} ${this.state.saida.y} L ${_middleX} ${this.state.chegada.y}`
				console.log(`${_startPoint} ${_middlePath} ${_endPoint}`)
				return `${_startPoint} ${_middlePath} ${_endPoint}`
			}
			
		}

		componentDidMount() {
			this.setState({d: this.handlePathDrawing()})
		}

    render() {
        return (
				  <svg style={canvasStyle}>
						<g>
							<path 
								id="lineAB" 
								d={this.state.d}
								stroke="red"
								strokeWidth="3" 
								fill="none">
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
    position: 'absolute'
}