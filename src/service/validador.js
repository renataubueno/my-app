let objetos = [];

exports.validar = function(dado){
  console.log('Dados sendo validados: ', dado);

  objetos = [].concat(dado);
  console.log('O QUE TEM NA CONDPARADA: ', objetos[0].condParada);

  console.log('OBJETOSSS: ', objetos[0].objSimulacao)

  let filaUniformeValida = validaFilaUniforme(
    filtraObj('UNIFORME')
  );
  let minMaxValidos = validaMinMax(
    filtraObj('UNIFORME')
  );
  let seedValida = validaSeed(objetos[0].seeder);
  let condParadaValida = validaCondParada(objetos[0].condParada);
  let sistemaValido = sistValido(objetos[0].objSimulacao);

  return filaUniformeValida && seedValida && condParadaValida && minMaxValidos && sistemaValido;
}

function sistValido(filas){
  let temEntExt = false;
	let filaEntExt = {};
	let temSaiExt = false;
	let idFilaSaiExt = 0;
	let entradaSaida = false;

  for(let i = 0; i < filas.length; i++){
		for(let j = 0; j < filas[i].chegadas.length; j++){
			if(filas[i].chegadas[j].origem === 'Entrada'){
				temEntExt = true;
				filaEntExt = filas[i];
				break;
			}
		}
	}

	for(let i = 0; i < filas.length; i++){
		for(let j = 0; j < filas[i].saidas.length; j++){
			if(filas[i].saidas[j].destino === 'Saída'){
				temSaiExt = true;
				idFilaSaiExt = filas[i].id;
				break;
			}
		}
	}

  if(temEntExt && temSaiExt){
    if(filaEntExt.id === idFilaSaiExt){
			entradaSaida = true;
		} else {
      console.log('FILA ENT EXT: ', filaEntExt);
			entradaSaida = procuraSaida(filaEntExt, idFilaSaiExt)
		};
  } else {
    alert('FALTA ENTRADA E/OU SAÍDA EXTERNA');
  }

  for(let i = 0; i < filas.length; i++){
		filas[i].jaPassou = false;
	};

  return entradaSaida;
}

function procuraSaida(filaOrigem, idFilaSaiExt){
  console.log('ENTREI NO PROCURA SAIDA', filaOrigem);
  let temConexao = false;
  if(filaOrigem.jaPassou){
		console.log('JÁ PASSEI POR ESSA FILA');
	} else{
    console.log('VOU PROCURAR SE TENHO A SAIDA');
    filaOrigem.jaPassou = true;
		let conexaoEntSai = filaOrigem.saidas.filter(item => item.destino === idFilaSaiExt);
		if(conexaoEntSai.length > 0){
			temConexao = true;
		} else {
			for(let i = 0; i < filaOrigem.saidas.length; i++){
				let novaFilaOrigemID = filaOrigem.saidas[i].destino;
				let novaFilaOrigem = objetos[0].objSimulacao.filter(item => item.id === novaFilaOrigemID);
        console.log('NOVA FILA ORIGEM: ', novaFilaOrigem);
				temConexao = procuraSaida(novaFilaOrigem[0], idFilaSaiExt);
				if(temConexao){
					break;
				}
			};
		};
  }
  return temConexao;
}

function filtraObj(tipo){
  return objetos[0].objSimulacao.filter(item => item.tipo === tipo);
}

function validaFilaUniforme(filas){
  console.log('FILA - VALIDADOR: ', filas);

  let capacidadeDefault = filas.filter(item => item.capacidade === 0);
  let servidoresDefault = filas.filter(item => item.servidores === 0);
  let maxChegadaDefault = filas.filter(item => item.maxChegada === 0);
  let maxServicoDefault = filas.filter(item => item.maxServico === 0);
  let chegadasVazias = filas.filter(item => item.chegadas.length === 0);
  let saidasVazias = filas.filter(item => item.saidas.length === 0);

  if(capacidadeDefault.length > 0){
    alert('Capacidade da Fila está com valor default');
  } else if(servidoresDefault.length > 0){
    alert('Servidores da Fila está com valor default');
  } else if(maxChegadaDefault.length > 0){
    alert('Momento Máximo de Chegada na Fila está com valor default');
  } else if(maxServicoDefault.length > 0){
    alert('Momento Máximo de Serviço na Fila está com valor default');
  } else if(chegadasVazias.length > 0){
    alert('Chegadas para a fila estão vazias');
  } else if(saidasVazias.length > 0){
    alert('Saidas da fila estão vazias');
  } else {
    return true;
  }
}

function iniciaSistemaValido(filas){
  let temEntrada = filas.filter(item => item.chegadas.origem === 'Entrada');
  console.log('ARRAY TEM ENTRADA: ', temEntrada);
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
