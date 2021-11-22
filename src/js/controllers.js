canvas.addEventListener('keydown', (e) => {
    
    if (config.permissaoComandos == 1){
      switch (e.keyCode){
        case 87:
          //console.log("Andou pra frente");
          player.translation = [player.xTranslation, player.yTranslation+= player.velocidade, player.zTranslation];
          break;
        case 83:
          //console.log("Andou pra tras");
          player.translation = [player.xTranslation, player.yTranslation-= player.velocidade, player.zTranslation];
          break;
        case 68:
          //console.log("Andou pra direita");
          player.translation = [player.xTranslation+= player.velocidade, player.yTranslation, player.zTranslation];
          break;
        case 65:
          //console.log("Andou pra esquerda");
          player.translation = [player.xTranslation-= player.velocidade, player.yTranslation, player.zTranslation];
          break;   
          default:
            //console.log(e.keyCode);
      }
    }
  
  });
  
  canvas.addEventListener('keyup', (e) => {
  
    if (config.permissaoComandos == 1){
      switch (e.keyCode){
        case 32:
          atirar();
          break;    
          default:
            //console.log(e.keyCode);
      }
    } else {
      console.log("sem permissao pra atirar!");
    }
  
  });