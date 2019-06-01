import React, {Component} from 'react';

/* Objeto genérico default, contém o esqueleto para os outros objetos: id, tamanho, altura */
/* Além disso, possui os settings, que é um objeto utilizado para fazer as conexões e definir a posição do objeto baseada no objeto à quem se conectou */
/* Definição genérica também do double-click (utilizada para alterar os valores dos objetos uma vez que eles estejam no editor) */
export default class Objeto extends Component{
  constructor(props){
    super(props);

    this.dadosDoObjeto = {
      key: this.props.objeto.id,
      height: this.props.objeto.height,
      width: this.props.objeto.width
    };

    this.bound = "parent";
    this.settings = {
      bounds: this.bound,
      defaultPosition: this.position
    };

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick(event): void{
    console.log(this.props.objeto.id);
  }

  render(){
    return(
      <div>
      </div>
    );
  }
}
