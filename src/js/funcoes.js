//FUNCAO MATH PARA INTEIROS ALEATORIOS
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  //FUNCAO PARA ENTRAR EM UM NOVO NIVEL
  function novoNivel(){
    config.nivel++;
    player.skills =+ 1;
    objects.length = 0;
    objectsToDraw.length = 0;
    objectsToDraw.push(player_desenhar);
    config.dificuldade++;
  }

  function adicionaVida(){
    
    if (player.skills > 0){
      player.skills -= 1;
      player.vida += 50;
    }

  }

  function adicionaVelocidade(){
    if (player.skills > 0){
      player.skills -= 1;
      player.velocidade += 2;
    }
  }

  function adicionaDano(){
    if (player.skills > 0){
      player.skills -= 1;
      player.dano += 1;
    }
  }

  


 
