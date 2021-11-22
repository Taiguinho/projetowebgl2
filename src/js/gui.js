var config = { 
  som: 1,
  dificuldade: 1,
  nivel: 1,
  intervalo: 1000,
  musica: 0.3,
  permissaoComandos: 1,
  pontuacaoFase: 0,

  atirar: function() {
    atirar();
  },
  
  
};

var camera = {
  tipoCam: "",
  pos_x: 0,
  pos_y: 0,
  pos_z: 285,
  rot_x: 0,
  rot_y: 0,
  rot_z: 0,
  fov: degToRad(50)
};

var gui;

const loadGUI = () => {
  gui = new dat.GUI();

  var novoElemento = gui.addFolder('Comandos da nave');
  novoElemento.add(config, 'atirar');

  var configuracao = gui.addFolder('Configurações');
  configuracao.add(config, 'dificuldade', 1,50);
  configuracao.add(config, 'musica', 0,1);

  /*
  var cam = gui.addFolder('Camera');
  cam.add(camera, 'tipoCam',["Frente", "RPG", "Afastada", "Third Person"]).onChange(function(){
    switch(camera.tipoCam){
      case ("Frente"):
        camera.pos_x = 0;
        camera.pos_y = 0;
        camera.pos_z = 100;
        camera.fov = degToRad(50);
        break;
      case ("RPG"):
        camera.pos_x = 245;
        camera.pos_y = 514;
        camera.pos_z = 100;
        camera.fov = 0.9;
        break;
      case ("Afastada"):
        camera.pos_x = 649;
        camera.pos_y = 918.5;
        camera.pos_z = 1502;
        camera.fov = 1.5;
        break;
      case ("Third Person"):
        camera.pos_x = 0;
        camera.pos_y = 65;
        camera.pos_z = -69.5;
        camera.fov = 1;
        break;
      default:
        camera.pos_x = 0;
        camera.pos_y = 0;
        camera.pos_z = 100;
        camera.fov = degToRad(50);
        break;
    }
  }
  );
  var camPos = cam.addFolder("Posição");
  camPos.add(camera, "pos_x", -2000, 2000, 0.5);
  camPos.add(camera, "pos_y", -2000, 2000, 0.5);
  camPos.add(camera, "pos_z", -2000, 2000, 0.5);
  camPos.add(camera, "rot_x", -2000, 2000, 0.5);
  camPos.add(camera, "rot_y", -2000, 2000, 0.5);
  camPos.add(camera, "rot_z", -2000, 2000, 0.5);
  cam.add(camera, "fov", degToRad(0), degToRad(100), 0.5);
*/

};

function adicionaElementoGui(){
  elemento = gui.addFolder("Elemento"+config.tamanho);

  elementoRotacao = elemento.addFolder("Rotação");
  elementoRotacao.add(objects[config.tamanho], "xRotate", 0, 20, 0.5);
  elementoRotacao.add(objects[config.tamanho], "yRotate", 0, 20, 0.5);
  elementoRotacao.add(objects[config.tamanho], "zRotate", 0, 20, 0.5);
  
  elementoTranslation = elemento.addFolder("Translação");
  elementoTranslation.add(objects[config.tamanho], "xTranslation", -1000, 1000, 0.5);
  elementoTranslation.add(objects[config.tamanho], "yTranslation", -1000, 1000, 0.5);
  elementoTranslation.add(objects[config.tamanho], "zTranslation", -1000, 1000, 0.5);

  elementoTranslation = elemento.addFolder("Escala");
  elementoTranslation.add(objects[config.tamanho], "xScale", 0, 10, 0.5);
  elementoTranslation.add(objects[config.tamanho], "yScale", 0, 10, 0.5);
  elementoTranslation.add(objects[config.tamanho], "zScale", 0, 10, 0.5);

  animacao = elemento.addFolder("Animação");

  animacaoRotacao = animacao.addFolder("Rotação");
  animacaoRotacao.add(objects[config.tamanho], "XVelRotacao", -300, 300, 0.5);
  animacaoRotacao.add(objects[config.tamanho], "YVelRotacao", -300, 300, 0.5);
  animacaoRotacao.add(objects[config.tamanho], "ZVelRotacao", -300, 300, 0.5);

  animacaoTranslacao = animacao.addFolder("Translação");
  animacaoTranslacao.add(objects[config.tamanho], "XVelTranslacao", -300, 300, 0.05);
  animacaoTranslacao.add(objects[config.tamanho], "YVelTranslacao", -300, 300, 0.05);
  animacaoTranslacao.add(objects[config.tamanho], "ZVelTranslacao", -300, 300, 0.05);

  animacaoRandom = animacao.addFolder("N passos"); //Não implementada ainda

  //elemento.add(config, 'Remove');

  config.tamanho++;
}








