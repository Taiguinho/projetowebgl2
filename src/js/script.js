async function main() {

  const { gl, meshProgramInfo } = initializeWorld();
  

  //objetos gravados em memoria para serem desenhados na tela
  objectsToDraw = [];
  //vetor de objetos que aparecem na tela
  objects = [];
  //vetor de projetils que aparecem na tela
  projetils = [];
  
  //buffer de diferentes objetos
  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);
  const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);
  const coneBufferInfo   = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);
  
  //VAOS dos objetos
  const cubeVAO = twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    cubeBufferInfo,
  );

  const sphereVAO = twgl.createVAOFromBufferInfo(
    gl, 
    meshProgramInfo, 
    sphereBufferInfo
  );

  const coneVAO = twgl.createVAOFromBufferInfo(
    gl, 
    meshProgramInfo, 
    coneBufferInfo
  );

  player = {
    uniforms: {
      u_colorMult: [1, Math.random(0.5, 1), Math.random(0.5, 1), 1],
      u_matrix: m4.identity(),
    },
    translation: [0, 0, 0],
    scale: [1,1,1],
    xTranslation: 0,
    yTranslation: 0,
    zTranslation: 0,
    xRotate: degToRad(0),
    yRotate: degToRad(0),
    zRotate: degToRad(0),
    xScale: 1, 
    yScale: 1,
    zScale: 1,
    XVelRotacao: 0,
    YVelRotacao: 0,
    ZVelRotacao: 0,
    vida: 100,
    dano: 4,
    velocidade: 1,
    pontuacao: 0,
    skills: 1
  };

  player_desenhar = {
    programInfo: meshProgramInfo,
    bufferInfo: coneBufferInfo,
    vertexArray: coneVAO,
    uniforms: player.uniforms,
  };

  objectsToDraw.push(player_desenhar);


  //funcao computer Matrix
  function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation, zRotation,scale) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2],
    );
    matrix = m4.yRotate(matrix, xRotation);
    matrix = m4.xRotate(matrix, yRotation);
    matrix = m4.zRotate(matrix, zRotation);
    matrix = m4.scale(matrix,scale[0],scale[1],scale[2]);
    return matrix;
  }

  atirar = () => {
    //console.log("SHOOT!");

    var projetil = {
      uniforms: {
        u_colorMult: [1, 1, 1, 1],
        u_matrix: m4.identity(),
      },
      translation: [player.xTranslation, player.yTranslation+10, player.zTranslation],
      scale: [1,1,1],
      xTranslation: player.xTranslation,
      yTranslation: player.yTranslation+11,
      zTranslation: player.zTranslation,
      xRotate: degToRad(0),
      yRotate: degToRad(0),
      zRotate: degToRad(0),
      xScale: 0.1, 
      yScale: 0.1,
      zScale: 0.1,
      XVelRotacao: 0,
      YVelRotacao: 0,
      ZVelRotacao: 0,
      XVelTranslacao: 0,
      YVelTranslacao: 0,
      ZVelTranslacao: 0,
      velocidade: 100
    };

    projetil_desenhar = {
      programInfo: meshProgramInfo,
      bufferInfo: sphereBufferInfo,
      vertexArray: sphereVAO,
      uniforms: projetil.uniforms,
    };

    projetils.push(projetil);
    objectsToDraw.push(projetil_desenhar);

    var audio = new Audio('../src/sounds/shoot.wav');
    audio.play();

  }


  startSound = () => {
    musicaFundo = new Audio('../src/sounds/main.flac');
    musicaFundo.volume = config.musica;
    musicaFundo.play();
    musicaFundo.onended = function() {
      musicaFundo.play();
  };
  }

  startSound();

   //funcao que adiciona novo elemento na tela ao apertar no GUI
 adicionaElemento = (tipo) => {
  //objeto para ser criado na tela
  ///////////////////////////////////////////////////////

  switch(tipo){
    case(1): //meteoro
      var object = {
        uniforms: {
          u_colorMult: [1, Math.random(0.5, 1), Math.random(0.5, 1), 1],
          u_matrix: m4.identity(),
        },
        translation: [0, 0, 0],
        scale: [1,1,1],
        xTranslation: player.xTranslation + getRandomIntInclusive(-100, 100),
        yTranslation: player.yTranslation + getRandomIntInclusive(250, 350), //onde vai spawnar o objeto randomico
        zTranslation: 0,
        xRotate: degToRad(0),
        yRotate: degToRad(0),
        zRotate: degToRad(0),
        xScale: 1, 
        yScale: 1,
        zScale: 1,
        XVelRotacao: getRandomIntInclusive(0, 10),
        YVelRotacao: 0, 
        ZVelRotacao: 0,
        XVelTranslacao: 0,
        YVelTranslacao: -getRandomIntInclusive(4 * config.dificuldade, 30 * config.dificuldade),
        ZVelTranslacao: 0,
        velocidade: Math.random(10, 1),
        vida: getRandomIntInclusive(1 * config.dificuldade, 10 * config.dificuldade)
      };
      objects.push(object);
        obj = {
          programInfo: meshProgramInfo,
          bufferInfo: cubeBufferInfo,
          vertexArray: cubeVAO,
          uniforms: object.uniforms,
        };
      break;
    case(2): //planeta
    var object = {
      uniforms: {
        u_colorMult: [1, Math.random(0.5, 1), Math.random(0.5, 1), 1],
        u_matrix: m4.identity(),
      },
      translation: [0, 0, 0],
      scale: [10,10,10],
      xTranslation: player.xTranslation,
      yTranslation: player.yTranslation + getRandomIntInclusive(550, 850), //onde vai spawnar o objeto randomico
      zTranslation: 0,
      xRotate: degToRad(0),
      yRotate: degToRad(0),
      zRotate: degToRad(0),
      xScale: 10, 
      yScale: 10,
      zScale: 10,
      XVelRotacao: 1,
      YVelRotacao: 0, 
      ZVelRotacao: 0,
      XVelTranslacao: 0,
      YVelTranslacao: 0,
      ZVelTranslacao: 0,
      velocidade: 0,
      vida: 150 * config.dificuldade,
    };
    objects.push(object);
      obj = {
        programInfo: meshProgramInfo,
        bufferInfo: sphereBufferInfo,
        vertexArray: sphereVAO,
        uniforms: object.uniforms,
      };
      break;
  }
  
  objectsToDraw.push(obj);
  //setTimeout(arguments.callee, 5000);
};
 

  adicionaElemento(1);


  //LoadGui que carrega os dados do manipulador dos objetos
  loadGUI();


  var then = 0;


  function render(time) {
    
    if (player.vida <= 0){
      window.open("index.html", "_self");
    } 
    time *= 0.001;
    var deltaTime = time - then;
    then = time;

    //config.yRotate += 1.2 * deltaTime;

    twgl.resizeCanvasToDisplaySize(gl.canvas);

    //TranslationInicial2 = [30, Math.random(0,400), 0];

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    camera.pos_y = player.yTranslation-50;
    camera.pos_x = player.xTranslation;
    
   

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(camera.fov, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [camera.pos_x, camera.pos_y, camera.pos_z];
    //var target = [0, 0, 0];
    //
    const playertranslation = [player.xTranslation, player.yTranslation+80, player.zTranslation]
    var target = playertranslation;
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    //console.log("nave vida: "+objects[0].vida);
    //Movimentos dos objetos
    
    // MOVIMENTOS DO PLAYER PRINCIPAL
    player.translation = [player.xTranslation, player.yTranslation, player.zTranslation];
    player.scale = [player.xScale, player.yScale, player.zScale];

    player.uniforms.u_matrix = computeMatrix(
          viewProjectionMatrix,
          player.translation,
          player.xRotate+= player.XVelRotacao * deltaTime,
          player.yRotate+= player.YVelRotacao * deltaTime,
          player.zRotate+= player.ZVelRotacao * deltaTime,
          player.scale
      );

    
    ///////////////////////////////////////////////////////////////////////

    objects.forEach(function(object) {
      
      if ( (object.yTranslation <= player.yTranslation+10 && object.yTranslation >= player.yTranslation-10) && (object.xTranslation <= player.xTranslation+10 && object.xTranslation >= player.xTranslation-10) ){
        player.vida-= getRandomIntInclusive(10, 20) * config.dificuldade;
        object.yTranslation = 99999999999;
        var audio = new Audio('../src/sounds/impact.mp3');
        audio.play();

      }
      object.translation = [object.xTranslation+=object.XVelTranslacao * deltaTime, object.yTranslation+=object.YVelTranslacao * deltaTime, object.zTranslation+=object.ZVelTranslacao * deltaTime];
      object.scale = [object.xScale, object.yScale, object.zScale];

      object.uniforms.u_matrix = computeMatrix(
          viewProjectionMatrix,
          object.translation,
          object.xRotate+= object.XVelRotacao * deltaTime,
          object.yRotate+= object.YVelRotacao * deltaTime,
          object.zRotate+= object.ZVelRotacao * deltaTime,
          object.scale
      );
    });

    projetils.forEach(function(projetil) {

      var i = 0;
      objects.forEach(function(object) {

        if ( (projetil.yTranslation <= object.yTranslation+(object.xScale*10) && projetil.yTranslation >= object.yTranslation-(object.xScale*10)) && (projetil.xTranslation <= object.xTranslation+(object.xScale*10) && projetil.xTranslation >= object.xTranslation-(object.xScale*10)) ){
          dano = getRandomIntInclusive(1, player.dano);
          object.vida -= dano;
          document.getElementById("logBatalha").innerHTML= "Causou "+dano+" de dano em um objeto não identificado, lhe restando "+object.vida+" de vida." ;
          var audio = new Audio('../src/sounds/metal_collision.flac');
          audio.play();
          
          projetil.yTranslation = 99999999999; //envia o projetil para o limbo até ser excluido
          if (object.xScale <= 5){ //se o objeto não for muito grande, sofrerá um retardo ao receber um tiro
            object.YVelTranslacao += 1;
          }
          
          player.pontuacao += 1; // aumenta 1 ponto pelo acerto do tiro

          if (object.vida <= 0){
            object.xTranslation = 99999999999; //move o objeto para o limbo até ser excluido na proxima fase
            player.pontuacao += 10; //aumenta em 10 pontos pela destruição do objeto
            var audio = new Audio('../src/sounds/explosion-01.wav');
            audio.play();
           
          }

          
        }
        i++;
      });

      
      
      projetil.translation = [projetil.xTranslation, projetil.yTranslation+=100 * deltaTime, projetil.zTranslation];
      projetil.scale = [projetil.xScale, projetil.yScale, projetil.zScale];
      

      projetil.uniforms.u_matrix = computeMatrix(
          viewProjectionMatrix,
          projetil.translation,
          projetil.xRotate+= projetil.XVelRotacao * deltaTime,
          projetil.yRotate+= projetil.YVelRotacao * deltaTime,
          projetil.zRotate+= projetil.ZVelRotacao * deltaTime,
          projetil.scale
      );
        
    });
    

    objectsToDraw.forEach(function(object) {
      var programInfo = object.programInfo;

      gl.useProgram(programInfo.program);

      // Setup all the needed attributes.
      gl.bindVertexArray(object.vertexArray);

      
      // Set the uniforms we just computed
      twgl.setUniforms(programInfo, object.uniforms);
      twgl.drawBufferInfo(gl, object.bufferInfo);
    });

  
	requestAnimationFrame(render);
    
  }   
  requestAnimationFrame(render);

}



// UPDATE MAIN //
setInterval(() => {
  musicaFundo.volume = config.musica;
  document.getElementById("vidaPlayer").innerHTML= player.vida;
  document.getElementById("ataquePlayer").innerHTML= player.dano;
  document.getElementById("velocidadePlayer").innerHTML= player.velocidade;
  document.getElementById("pontuacaoPlayer").innerHTML= player.pontuacao;
  document.getElementById("skillsPlayer").innerHTML= player.skills;

  switch(config.nivel){
    case(1): //////////////// nivel 1: destruir cometas
      document.getElementById("missao").innerHTML= "Atinja 200 pontos destruindo os asteróides.";
      faseCometas(200);
    break;
    case(2): /////////////// nivel 2: destruir o planeta 
      document.getElementById("missao").innerHTML= "Aperte W e encontre o planeta ShadowStorm. Não se esqueça de utilizar seu ponto de skill em algum atributo da nave.";
      fasePlaneta();
    break;
    case(3): /////////////// nivel 2: destruir o planeta
    document.getElementById("missao").innerHTML= "Atinja 800 de pontuação destruindo asteróides."; 
      faseCometas(800);
    break;
    case(4): /////////////// nivel 2: destruir o planeta
    document.getElementById("missao").innerHTML= "Atinja 1300 de pontuação destruindo asteróides."; 
      faseCometas(1300);
    break;
    case(5): /////////////// nivel 2: destruir o planeta
    document.getElementById("missao").innerHTML= "Atinja 2000 de pontuação destruindo asteróides."; 
      faseCometas(2000);
    break;
    case(6): /////////////// nivel 2: destruir o planeta
    document.getElementById("missao").innerHTML= "Aperte W e encontre o planeta Ragnar. Sua vida aparentemente é bem alta, portanto, tenha paciência."; 
      fasePlaneta();
    break;
    case(8): /////////////// nivel 2: destruir o planeta
      player.pontuacao *= 2;
      window.open("index.html");
    break;
  }

}, config.intervalo);


setInterval(() => {
  console.log("Aumentando dificuldade...");
  config.dificuldade+= 1;
}, 180000);




main();
