let objetos = [];

exports.validar = function(dado){
  console.log('Dados sendo validados: ', dado);

  objetos = [].concat(dado);
  console.log('O QUE TEM NA CONDPARADA: ', objetos[0].condParada);

  console.log('OBJETOSSS: ', objetos[0])

  let filaUniformeValida = validaFilaUniforme(
    filtraObj('UNIFORME')
  );
  let minMaxValidos = validaMinMax(
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
  let seedValida = validaSeed(objetos[0].seeder);
  let condParadaValida = validaCondParada(objetos[0].condParada);

  return filaUniformeValida && conectorValido && entradaValida && saidaValida && seedValida && condParadaValida && minMaxValidos;
}

function filtraObj(tipo){
  return objetos[0].objSimulacao.filter(item => item.tipo === tipo);
}

function validaFilaUniforme(filas){
  console.log('FILA - VALIDADOR: ', filas);

  let capacidadeDefault = filas.filter(item => item.capacidade === 0);
  let servidoresDefault = filas.filter(item => item.servidores === 0);
  let minChegadaDefault = filas.filter(item => item.minChegada === 0);
  let maxChegadaDefault = filas.filter(item => item.maxChegada === 0);
  let minServicoDefault = filas.filter(item => item.minServico === 0);
  let maxServicoDefault = filas.filter(item => item.maxServico === 0);

  if(capacidadeDefault.length > 0){
    alert('Capacidade da Fila está com valor default');
  } else if(servidoresDefault.length > 0){
    alert('Servidores da Fila está com valor default');
  } else if(minChegadaDefault.length > 0){
    alert('Momento Mínimo de Chegada na Fila está com valor default');
  } else if(maxChegadaDefault.length > 0){
    alert('Momento Máximo de Chegada na Fila está com valor default');
  } else if(minServicoDefault.length > 0){
    alert('Momento Mínimo de Serviço na Fila está com valor default');
  } else if(maxServicoDefault.length > 0){
    alert('Momento Máximo de Serviço na Fila está com valor default');
  } else {
    return true;
  }
}

function validaMinMax(filas){
  for(let i = 0; i < filas.length; i++){
    if(filas[i].minChegada >= filas[i].maxChegada || filas[i].minServico >= filas[i].maxServico){
      alert('Valor Mínimo (chegada e/ou serviço) maior do que Valor Máximo.');
      return false;
    }
  }
  return true;
}

function validaConector(conectores){
  console.log('CONECTOR - VALIDADOR', conectores);
  return true;
}

function validaEntrada(entradas){
  console.log('ENTRADA - VALIDADOR', entradas);

  let chegadaDefaultEntrada = entradas.filter(item => item.chegada === 0);

  if(chegadaDefaultEntrada.length > 0){
    alert('Chegada está com valor default');
    return false;
  } else {
    return true;
  }
}

function validaSaida(saidas){
  console.log('SAIDA - VALIDADOR', saidas);

  let targetListSaidaUndefined = saidas.filter(item => item.targetList === undefined);

  if(targetListSaidaUndefined.length > 0){
    alert('Target List da Saída está undefined');
    return false;
  } else {
    let targetListSaida = saidas.filter(item => item.targetList.length !== 0);

    if(targetListSaida.length > 0){
      alert('Target List da Saída está diferente de zero');
      return false;
    } else {
      return true;
    }
  }
}

function validaSeed(seed){
  if(seed <= 0){
    alert('Seed menor ou igual zero - alterar o valor');
    return false;
  } else {
    return true;
  }
}

function validaCondParada(condParada){
  if(condParada <= 0){
    alert('Condição de Parada menor ou igual zero - alterar o valor');
    return false;
  } else {
    return true;
  }
}
