function faseCometas(pontuacaoProximaFase){
    if (player.pontuacao < pontuacaoProximaFase){
      config.permissaoComandos = 1; 
      adicionaElemento(1);
    } else {
      novoNivel();
      config.permissaoComandos = 0; //trava os comandos do player para carregar o proximo nivel!
    }
  }
  
  function fasePlaneta(){
    if (objects.length > 0){ //se for maior que zero é porque ja tem um boss na tela
      if (objects[0].vida <= 0){ //se o primeiro boss esta com vida ainda ou nao
        var audio = new Audio('../src/sounds/big_explosion.mp3');
        audio.play();
        novoNivel();   //entra para o proximo nivel
        config.permissaoComandos = 0;
      } else {
        console.log("Vida do planeta: "+objects[0].vida)
        camera.pos_z = 285;
        adicionaElemento(1);
      }
    } else {
      camera.pos_z = 500; //285 padrao
      adicionaElemento(2);
      objects[0].vida
      config.permissaoComandos = 1; //libera para o player andar e atirar
    } 
  }