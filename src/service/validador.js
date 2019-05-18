let objetos = [];

exports.validar = function(dado){
  console.log('Dados sendo validados: ', dado);

  objetos = [].concat(dado);

  let filaUniformeValida = validaFilaUniforme(
    filtraObj('UNIFORME')
  );
  let conectorValido = validaConector(
    filtraObj('CONECTOR')
  );
  let entradaValida = validaEntrada(
    filtraObj('ENTRADA')
  );
  let saidaValida = validaSaida(
    filtraObj('SAIDA')
  );

  return filaUniformeValida && conectorValido && entradaValida && saidaValida;
}

function filtraObj(tipo){
  return objetos.filter(item => item.tipo === tipo);
}

function validaFilaUniforme(filas){
  console.log('FILA - VALIDADOR: ', filas);
  return true;
}

function validaConector(conectores){
  console.log('CONECTOR - VALIDADOR', conectores);
  return true;
}

function validaEntrada(entradas){
  console.log('ENTRADA - VALIDADOR', entradas);
  return true;
}

function validaSaida(saidas){
  console.log('Saida - VALIDADOR', saidas);
  return true;
}
