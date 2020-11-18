var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, rock, rockImage
var bananGroup, obstacleGroup
var score= 100;
var ground;


function preload(){
    
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(400,350)
  monkey = createSprite(80,300,20,20); 
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1;


  
  ground = createSprite(400,340,900,10);
  ground.x = ground.width /2;
 
  bananaGroup = new Group();
  rockGroup = new Group();

}


function draw() {
   background(300)
   text("Survival Rate: "+ score,130,50);
   text("Press the space key to make the monkey jump",60,70)
  
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
  
  if( gameState === PLAY){
 if(keyDown("space")&& monkey.y>=100){
    monkey.velocityY = -15;  
 }
  text("You have 100% survival rate now but as you move ahead your tiredness ",20,85)
  
  text("will decrese your survival rate.",10,105);
  text("           So increse your energy by eating your favourite bananas.",10 ,130)
  
   ground.velocityX = -6;
  
   score = score - Math.round(getFrameRate()/60);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   
  
  if(monkey.isTouching(bananaGroup)){
    score = score +30;
    bananaGroup.destroyEach()
  }

  if(monkey.isTouching(rockGroup)) {
   gameState = END;
}
  if (score === 0){
    gameState =END;
  }
  }
 if ( gameState === END){
  rockGroup.destroyEach()
  bananaGroup.destroyEach()
  bananaGroup.velocityX = 0
  
  ground.velocityX = 0;
   
 }
    bananas() 
    obstacles()
  
    drawSprites() 
}

function bananas(){
  if (frameCount %  50 === 0) {
     var banana = createSprite(600,165,10,40);
     banana.addImage(bananaImage);
     banana.y = Math.round(random(150,200));
     banana.velocityX = -7;
     //generate random obstacles`
    
     banana.scale = 0.1;
     banana.lifetime =125;
    
     bananaGroup.add(banana);
 } 
  
}

function obstacles(){
  if (frameCount %  150 === 0) {
      rock = createSprite(600,165,10,40);
      rock.addImage(rockImage);
   
     rock.y = Math.round(random(310,311));
     rock.velocityX = -3;
    
    rockGroup.add(rock);
     rock.scale = 0.15;
     rock.lifetime =220;
      
 } 
  
}


