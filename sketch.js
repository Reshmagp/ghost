var tower,towerImg;
var door,doorImg,doorGroup;
var climber, climberImg, climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState ="play"
var score = 0;

function preload(){
  towerImg  = loadImage("tower.png");
  doorImg  = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  ghostImg2 = loadImage("ghost-jumping.png")
}


function setup(){
 createCanvas(600,600); 
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.addImage("ghost2",ghostImg2);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
 
  if(gameState === "play"){
    ghost.changeAnimation("ghost",ghostImg)
  if(tower.y>400){
    tower.y = tower.width/2;
  }
 if(keyDown("left_arrow")){
     ghost.x = ghost.x-3;
     
     }
  if(keyDown("right_arrow")){
     ghost.x = ghost.x+3;
     
     }
  if(keyDown("space")){
     ghost.velocityY= -5;
     ghost.changeAnimation("ghost2",ghostImg2)
     }
    
  ghost.velocityY =ghost.velocityY +0.4;
   // climbersGroup.collide(ghost)
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY =0;
    
    score = score+1;
   ghost.velocityY= -5; 
     }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  spawndoors();
  
  
  drawSprites();
  }
  stroke("yellow");
    fill("yellow");
    textSize(30);
   text("score  " + score,400,150);
  if(gameState === "end"){
   stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
  }
  
}
function spawndoors(){
  if(frameCount%240===0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);  
    invisibleBlock.width = climber.width;
    invisibleBlock.height =  5     ;
    
  door.addImage("door",doorImg);
  climber.addImage("climber",climberImg);
    
  door.velocityY =1;
  climber.velocityY =1;
  invisibleBlock.velocityY    = 1;  
    
    
  door.x = Math.round(random(120,400));
   climber.x = door.x; 
    invisibleBlock.x = door.x;
    
    door.lifetime = 800;
    climber.lifetime = 800;
     
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
  
  
}