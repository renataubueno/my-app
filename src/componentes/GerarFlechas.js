import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import Pubsub from 'pubsub-js';

export default class GerarFlechas extends Component {


    handleGerarFlechas = () => {
        Pubsub.publish('atualizar-coordenadas', {
        });
    }

    render() {
        return (
            <div>
                <Button variant="contained" onClick={this.handleGerarFlechas}>
                    Gerar flechas
                </Button>
            </div>
        )
    }
}
