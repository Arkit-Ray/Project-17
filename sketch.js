var fruit, sword, alien, fruitImg, alienImg, swordImg;
var PLAY=1;
var END=0;
var gameState=1;
var score = 0;
var gameOverImg, gameOverSound, cutSound;
function preload(){
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  swordImg=loadImage("sword.png");
  alienImg = loadImage("alien1.png","alien2.png");
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  cutSound = loadSound("knifeSwooshSound.mp3");
  
 
}
function setup(){
createCanvas(600,600);
  sword= createSprite(40,200,20,20);
  sword.addImage(swordImg);
  sword.scale=0.6;
  alienGrp=createGroup();
  fruitGrp=createGroup();
  sword.debug=true;
}

function draw(){
  background("lightBlue");
  if(gameState===PLAY){
    sword.x=World.mouseX;
  sword.y=World.mouseY;
    enemy();
    spawnFruit();
    text("score: "+ score,250,30);
    
    if(fruitGrp.isTouching(sword)){
      fruitGrp.destroyEach();
      score = score+1;
      cutSound.play();
      
    }
    else{
      if(alienGrp.isTouching(sword)){
        gameState = END;
        alienGrp.destroyEach();
        fruitGrp.destroyEach();
        fruitGrp.setVelocityXEach(0);
        alienGrp.setVelocityXEach(0);
        sword.x=200;
        sword.y=200;
        sword.addImage(gameOverImg);
        gameOverSound.play();
        
      }
    }
    drawSprites();
  }
  
}
function enemy(){
  if(World.frameCount%200===0){
    alien = createSprite(400,200,20,20);
    alien.addAnimation("alienImg",alienImg);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-(8+score/2);
    alien.setLifetime=50;
    alienGrp.add(alien);
  }
}

function spawnFruit(){
  if(World.frameCount%100===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.3;
    var a=Math.round(random(1,4));
    if(a==1){
      fruit.addImage("fruit1",fruit1Img);
    }
    else if(a==2){
      fruit.addImage("fruit2",fruit2Img);
    }
    else if(a==3){
      fruit.addImage("fruit3",fruit3Img);
    }
    else{
      fruit.addImage("fruit4",fruit4Img );
    }
    fruit.y=Math.round(random(100,350));
    
    fruit.setLifetime=50;
    fruit.velocityX=-(8+score/2);
    fruitGrp.add(fruit);
  }
}
