export default class FilaUniforme{
  constructor(id){
    this.id = id;
    this._capacidade = 0;
    this._servidores = 0;
    this._minChegada = 0;
    this._maxChegada = 0;
    this._minServico = 0;
    this._maxServico = 0;
    this._height = 60;
    this._width = 100;
  }

  get capacidade(){
    return this._capacidade;
  }

  get servidores(){
    return this._servidores;
  }

  get minChegada(){
    return this._minChegada;
  }

  get maxChegada(){
    return this._maxChegada;
  }

  get minServico(){
    return this._minServico;
  }

  get maxServico(){
    return this._maxServico;
  }
  get height(){
    return this._height;
  }
  get width(){
    return this._width;
  }

  setCapacidade(valor){
    this._capacidade = valor;
  }

  setServidores(valor){
    this._servidores = valor;
  }

  setMinChegada(valor){
    this._minChegada = valor;
  }

  setMaxChegada(valor){
    this._maxChegada = valor;
  }

  setMinServico(valor){
    this._minServico = valor;
  }

  setMaxServico(valor){
    this._maxServico = valor;
  }

  tipo(){
    return 'UNIFORME';
  }
}
