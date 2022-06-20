var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  
}

function draw() {
  background(200);
  if (gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
  if(keyDown("space")){

    ghost.velocityY=-7;
  }

  
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }

  
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState==="end";
    }
  drawSprites();
  
  }
  if(gameState==="end"){
    stroke("yellow");
    fill ("black");
    textSize(50);
    text("GAME OVER",230,250);
  }
}

function spawnDoors(){
  if(frameCount%200===0){
    door=createSprite(200,100,20,20);
    door.addImage("door",doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY= 1;
    door.lifetime = 600;
    doorsGroup.add(door);




    climber=createSprite(door.x,door.y+50);
    climber.addImage("climber",climberImg);
     climber.velocityY= 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    invisibleBlock=createSprite(climber.x,climber.y+20,100,10);
    invisibleBlock.visible=false;
    invisibleBlock.velocityY= 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);
  }
}