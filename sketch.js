var trex, trex_running, edges;
var groundImage;
var grouchao
var chaonaovisivel
var nuvem
var imagemcloud
var cactos,nuvens
const PLAY =1
const END =0
var gamestate= PLAY
var score=0
var gameover,gameoverimg
var reset,resetimg
var trexcollide
var pulo
var morte
var chekponto



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  imagemcloud = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexcollide= loadAnimation("trex_collided.png")
  gameoverimg= loadImage("gameover.png")
  pulo= loadSound("jump.mp3")
  morte=loadSound("die.mp3")
  chekponto=loadSound("checkpoint.mp3")
  resetimg= loadImage("restart.png")
}

function setup(){
  createCanvas(600,200);

  chaonaovisivel = createSprite(200,190,400,10)
  chaonaovisivel.visible = false
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trexcollide)
  trex.debug=false
  //trex.setCollider("rectangle",0,0,400,50)
  trex.setCollider("circle",0,0,30)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  grouchao=createSprite( 200,180,400,20   )
  grouchao.addImage(groundImage )
  cactos=new Group()
nuvens=new Group()
gameover=createSprite(300,80,100,10)
gameover.addImage(gameoverimg)
gameover.scale=0.5
gameover.visible=false
reset=createSprite(300,120,100,10)
reset.addImage(resetimg)
reset.scale=0.5
reset.visible=false
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  

  if(gamestate==PLAY){
    score+=Math.round(getFrameRate()/60)
    if(score>0&&score%100==0){
    chekponto.play()
    }
    grouchao.velocityX=-(2+score/100)
    if(keyDown("space")&&trex.y>161 ){
      trex.velocityY = -10;
      pulo.play()
    }
    
    if(grouchao.x<0){
      grouchao.x=grouchao.width/2        
    }
    if (trex.isTouching(cactos)) {
      gamestate=END
      morte.play()
      //trex.velocityY=-12
      //pulo.play()
    }
    shauwnuvens()
  spawnObstacles()
  
}

      if (gamestate==END) {

trex.changeAnimation("collide",trexcollide) 
  grouchao.velocityX=0
  cactos.setVelocityXEach(0)
  nuvens.setVelocityXEach(0)
  cactos.setLifetimeEach(-1)
  nuvens.setLifetimeEach(-1)
  gameover.visible=true
  reset.visible=true
  }
  text("Pontuação:"+ score ,500,50);
  
  trex.velocityY = trex.velocityY + 0.5
  //registrando a posição y do trex
  
  
  //pular quando tecla de espaço for pressionada
  
  
  
  
 //impedir que o trex caia
  trex.collide(chaonaovisivel)
  if(mousePressedOver(reset)){
    comecarDoZero()

  }
  drawSprites();
}
  function spawnObstacles(){
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX=-(6+score/100)

    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 300
    cactos.add(obstacle)
} 
  }
function shauwnuvens(){
  if(frameCount% 60 == 0){
    nuvem = createSprite(600,100,40,10)
    nuvem.velocityX = -3
    nuvem.addImage(imagemcloud)
    nuvem.scale = 0.7
    nuvem.y =Math.round(random(10,60)) 
    nuvem.depth = trex.depth;
    nuvem.lifetime = 200
trex.depth = trex.depth + 1;
nuvens.add(nuvem)
  }

}
function comecarDoZero(){
  gamestate=PLAY
  score=0
  trex.changeAnimation("running", trex_running)
  cactos.destroyEach()
  nuvens.destroyEach()
  reset.visible=false
  gameover.visible=false
  
}