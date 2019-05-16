let objetos = [];

exports.validar = function(dado){
  console.log('ABACATE: ', dado);

  objetos = [].concat(dado.simulacao);

  let filaValida = validaFila(
    filtraObj('Fila')
  );
  let conectorValido = validaConector(
    filtraObj('Conector')
  );

  return filaValida && conectorValido;
}

function filtraObj(tipo){
  return objetos.filter(item => item.tipo === tipo);
}

function validaFila(filas){
  console.log('FILA - VALIDADOR: ', filas);
  return true;
}

function validaConector(conectores){
  console.log('CONECTOR - VALIDADOR', conectores);
  return true;
}
