var simula = function (dados) {
  let sistemaOk = true;

  for(let i = 0; i < dados.simulacao.length; i++){
    console.log('Tipo do dado ', dados.simulacao[i].tipo);

    //saida não tem nenhuma conexão na sua targetList
    if(dados.simulacao[i].tipo === 'Saida' && dados.simulacao[i].targetList.length !== 0){
      console.log('A SAIDA NÃO ESTÁ TERMINANDO O SISTEMA');
      sistemaOk = false;
      break;
    }
  }

  if(sistemaOk){
    return dados;
  } else {
    return 'O sistema está incorreto';
  }
}

module.exports = simula;
