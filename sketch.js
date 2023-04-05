var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3

var score;
var gameOverImg


function preload(){
  boy_running = loadAnimation("boy_running1.png", "boy_running2.png", "boy_running3.png");
  boy_collided = loadImage("boy_collided.png");
  
  groundImage = loadImage("ground.png");
  
  obstacle1 = loadImage("barricade.png");
  obstacle2 = loadImage("bananaPeel.png");
  
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(650, 310);

  ground = createSprite(100,100,100,100);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  gameOver.scale = 0.5;
  
  boy = createSprite(50,200,20,50);
  boy.addAnimation("running", boy_running);
  boy.addAnimation("collided" ,boy_collided);

  boy.scale = 0.5;
  boy_collided.scale = 0.5
  
  invisibleGround = createSprite(200,210,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();

  
  console.log("Hello" + 5);
  
  boy.setCollider("circle",0,0,40);
  boy.debug = false
  
  score = 0;
}

function draw() {
  
  background(180);
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  if(gameState === PLAY){
    gameOver.visible = false;

    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }

    boy.velocityY = boy.velocityY + 0.8

    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      gameOverImg.visible = true;
      
      ground.velocityX = 0;
      boy.velocityY = 0
    
      boy.changeAnimation("collided", boy_collided);
     
     
     obstaclesGroup.setLifetimeEach(-1);
    
     obstaclesGroup.setVelocityXEach(0);
     }
     boy.collide(invisibleGround);
 
  drawSprites();
   }
  
  

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,225,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
         
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}


