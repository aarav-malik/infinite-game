var rayquaza,raquazaimg,mrayquazaimg;
var space,spaceimg
var asteroidimg,asteroidgrp,asteroid
var gameState="play"
var score

function preload(){
raquazaimg= loadAnimation("rayquaza.gif")
  spaceimg=loadImage("space.png")
  asteroidimg=loadAnimation("asteroid.gif")
  mrayquazaimg=loadAnimation("mrayquaza.gif")
  deoxysimg=loadAnimation("deoxys.gif")
}

function setup() {
  createCanvas(1439, 690);
  rayquaza = createSprite(200,500,20,400);
  rayquaza.addAnimation("standing",raquazaimg)
  rayquaza.addAnimation("mega",mrayquazaimg)

  


  rayquaza.scale=0.4
   
  asteroidgrp=new Group();
  
  space = createSprite(200,300,20,400);
  space.addImage(spaceimg)
  space.scale=1.5
  
  space.velocityY=2

  asteroid=createSprite(200,-1000)
  asteroid.addAnimation("animation",asteroidimg)
  asteroid.x=Math.round(random(50,350))

  score=0
  
  edges=createEdgeSprites();
 
}

function draw() {
   background(0);
   console.log(frameCount)
   
   score = score + Math.round(frameCount/60);

  
   if(gameState==="play"){
    spawnasteroid();

    stroke("yellow");
    fill("yellow")    
    textSize(30) 
    text("Score: "+ score, 500,50);

    //asteroid.debug=true
    //rayquaza.debug=true
    rayquaza.setCollider("circle",rayquaza/7,rayquaza/9,150)
    asteroid.setCollider("circle",asteroid/2,asteroid/9,100)
    space.depth = asteroid.depth-5;
    asteroid.depth = asteroid.depth + 5;


  
   if(space.y>900){space.y=300}


   space.depth = rayquaza.depth;
   rayquaza.depth = rayquaza.depth + 1;
  
    if(keyWentDown("up")) {
        rayquaza.velocityY = -2;
    }
    if(keyWentDown("down")) {
        rayquaza.velocityY = 4;
    }
  
    if(keyWentDown("right")) {
        rayquaza.velocityX = 4;
    }
  
    if(keyWentDown("left")) {
        rayquaza.velocityX = -4;
    }
  
   rayquaza.collide(edges)

       
  
    if(rayquaza.isTouching(asteroidgrp)){
       gameState="end";
       } 
     
       if(frameCount>1000){
       gameState="battle";
       }   
    
   }
 
  if (gameState==="end"){

    stroke("yellow");
    fill("yellow")    
    textSize(30) 
    text("Game Over",719.5,245) 
    
  }
  
  
  if (gameState==="battle"){
   
    spawnasteroid();

    rayquaza.changeAnimation("mega",mrayquazaimg)
    rayquaza.scale=0.9   
    
    
    rayquaza.setCollider("circle",rayquaza/7,rayquaza/9,100)

    if(space.y>400){space.y=300}

  
   space.depth = rayquaza.depth;
   rayquaza.depth = rayquaza.depth + 1;
    
  
   if(keyWentDown("up")) {

      rayquaza.velocityY = -2;
    }
   
   if(keyWentDown("down")) {
      rayquaza.velocityY = 4;
    }
  
   if(keyWentDown("right")) {
      rayquaza.velocityX = 4;
    }
  
   if(keyWentDown("left")) {
      rayquaza.velocityX = -4;
    }
  
   rayquaza.collide(edges)

   if(rayquaza.isTouching(asteroidgrp)){
    gameState="end";
    } 

  

  }
     drawSprites();
  
}

function spawnasteroid (){
  
  if(frameCount%20==0){ 
  asteroid=createSprite(200,-50)
  asteroid.addAnimation("moving",asteroidimg)
  asteroid.x=Math.round(random(25,1400))
  asteroid.y=0
  asteroid.velocityY=5
  asteroid.scale=0.35                       
  asteroidgrp.add(asteroid)
  asteroidgrp.lifetime=10                 

  space.depth = asteroid.depth-5;
  asteroid.depth = asteroid.depth + 5;
  rayquaza.collide(asteroid)
  }
  }