var trex, trex_running, edges;
var groundImage;
var grouchao
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  grouchao=createSprite( 200,180,400,20   )
  grouchao.addImage(groundImage )
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  grouchao.velocityX=-2
  //registrando a posição y do trex
  console.log(trex.y)
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  if(grouchao.x<0){
    grouchao.x=grouchao.width/2        
  }
 //impedir que o trex caia
  trex.collide(grouchao)
  drawSprites();
}