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
}

function setup(){
  createCanvas(600,200);

  chaonaovisivel = createSprite(200,190,400,10)
  chaonaovisivel.visible = false
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  grouchao=createSprite( 200,180,400,20   )
  grouchao.addImage(groundImage )
  cactos=new Group()
nuvens=new Group()
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  if(gamestate==PLAY){
    score=score+Math.round(frameCount/60)
    grouchao.velocityX=-2
    if(keyDown("space")&&trex.y>140){
      trex.velocityY = -10;
      
    }
    trex.velocityY = trex.velocityY + 0.5
    if(grouchao.x<0){
      grouchao.x=grouchao.width/2        
    }
    shauwnuvens()
  spawnObstacles()
  if (trex.isTouching(cactos)) {
    gamestate=END
  }
  } else{
  grouchao.velocityX=0
  cactos.setVelocityXEach(0)
  nuvens.setVelocityXEach(0)
  }
  text("Pontuação:"+ score ,500,50);
  
  
  //registrando a posição y do trex
  
  
  //pular quando tecla de espaço for pressionada
  
  
  
  
 //impedir que o trex caia
  trex.collide(chaonaovisivel)
  
  drawSprites();
}
  function spawnObstacles(){
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX=-6

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