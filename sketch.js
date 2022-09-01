var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg,bgImg;
var player, girlmg, girl_running,floatingilses,isleimg,isle2img,GameOver,GameOverimg;
var girl_running2;
var clouds,cloudimg;

var negitem,badboostimg;

var ground,groundimg;
var coin,coinimg,coinSound,gameoverSound;
var boostitem;
var resetimg,reset1;

var coinsGroup;
var ilsesGroup;
var negaitemGroup;
var  restart;

var score = 0;

function preload(){
  
  girlmg = loadImage("assets/g1.png");
  //girl_running = loadImage("assets/g3.png");
 // girl_running2 = loadImage("assets/")
 girl_running2 = loadAnimation("assets/g3.png","assets/run4.png","assets/run5.png","assets/run6.png","assets/run7.png")
  isleimg = loadImage("assets/isle1.png");
  cloudimg = loadImage("assets/clouds.png");
  coinimg = loadImage("assets/coin.png");
  GameOverimg = loadImage("assets/gameover.png")
  badboostimg = loadImage("assets/badboost.png")
  resetimg = loadImage("assets/restart.png")
  groundimg = loadImage("assets/ground.png")
  //coinSound = loadSound("win.mp3");
  //gameoverSound = loadSound("lose.mp3");

  bgImg = loadImage("assets/background.jpg");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 2;
  // adding velocity to bg
  //bg.velocityX = -3;

  reset1 = createSprite(1300,50,20,20);
  reset1.addImage(resetimg);
  reset1.scale = 0.1;

  GameOver = createSprite(700,300,50,50);
  GameOver.addImage(GameOverimg)
  GameOver.visible = false;

  // making coin sprite
  coin = createSprite(140,50,60,60);
  coin.addImage(coinimg);  
  coin.scale = 0.3;

  
  // creating a group
  coinsGroup = new Group();
  islesGroup = new Group();
  negaitemGroup = new Group();


ground = createSprite(700,550,2500,40);
ground.visible = true;
//ground.addImage(groundimg);
//ground.velocityX = -3;


//creating the player sprite
player = createSprite(50, displayHeight-300, 50, 50);
 //player.addImage(girlmg)
 player.addAnimation("running",girl_running2)
   player.scale = 1.4;
   player.debug = true
   player.setCollider("rectangle",0,0,40,65)


}

function draw() {
  background(0); 


  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -3;
    if (ground.x < 200){
      ground.x = ground.width/2;
    }

    if(coinsGroup.isTouching(player)){
      score+=1;
      coinsGroup[0].destroy();
      //coinSound.play();
      
      }    

     // gravity
     player.velocityY = player.velocityY + 0.3;
  
     player.collide(ground);
     player.collide(islesGroup);
         
 //moving the player up  and making the game mobile compatible using touches
 if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30

   }
  
  Spawnislands();
  Spawnclouds();
  Spawnitem();
  negativeitem();

    
  }
    
     if( negaitemGroup.isTouching(player)){
        gameState = END;
        negaitemGroup[0].destroy();
       //gameoverSound.play();
     }
  
  else if (gameState === END) {
    GameOver.visible = true;
    floatingilses.visible = false;
    boostitem.visible = false;
    negitem.visible = false;
    player.visible = false;
    
    //set velocity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    player.velocityX = 0;
    floatingilses.velocityX = 0;
    coinsGroup.velocityX = 0;
     }


     if (mousePressedOver(reset1)) {

      reset();
    }

drawSprites();
textSize(20);
text("Coin = "+score,20,60);

}

function Spawnislands (){

  if(frameCount %260 === 0 ){
floatingilses = createSprite(width/2+800,400,30,30)
floatingilses.y = Math.round(random(200,400))
floatingilses.addImage(isleimg)
floatingilses.scale = 0.5
floatingilses.velocityX = -3;

floatingilses.lifetime = 600;
 islesGroup.add(floatingilses)

  }
  
}

function Spawnclouds (){

  if(frameCount %90 === 0 ){
clouds = createSprite(1200,100,60,60);
clouds.velocityX = -3;
clouds.addImage(cloudimg)
clouds.scale = 0.5;
clouds.lifetime = 600;

  }

}
function Spawnitem(){

  if(frameCount %50 ===0 ){
  boostitem = createSprite(1200,80,50,50);
  boostitem.y = Math.round(random(80,490))
  boostitem.velocityX = -3;
  boostitem.addImage(coinimg);  
  boostitem.scale = 0.5;

  // adding sprite in a group
coinsGroup.add(boostitem);

  }

}

function negativeitem(){
  
  if(frameCount %200 ===0 ){
    negitem = createSprite(1100,200,20,20);
    negitem.y = Math.round(random(80,490))
    negitem.velocityX = -3;
    negitem.addImage(badboostimg);  
    negitem.scale = 0.3;
  
     //adding sprite in a group
  negaitemGroup.add(negitem);
  
    }


}

function reset() {

    gameState = PLAY;

  coinsGroup.destroyEach();
  negaitemGroup.destroyEach();

    score = 0;
    reset();
  
}
