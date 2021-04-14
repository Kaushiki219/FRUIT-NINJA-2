var PLAY=1;
var END=0;
var gameState=1;

var sword ,monster,fruit1, fruit2, fruit3, fruit4, fruit
var swordImage, monsterImage, fruit1Image, fruit2Image, fruit3Image, fruit4Image, gameOverImage, swordSound, gameoverSound
var score
function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  swordSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sword = createSprite(width-200, height-200, 10, 10);
  sword.addImage(swordImage);
  sword.scale = 0.8;
  
  score = 0;
  
  fruitsGroup=createGroup();
  enemysGroup=createGroup();
}

function draw(){
 background("lightblue");
  
  if(gameState === PLAY){
    
    Enemy();
    Fruit();
    
    if( (touches.fruitsGroup) ||            sword.isTouching(fruitsGroup)){
    fruitsGroup.destroyEach() ;
    swordSound.play();
    score = score+2 ;  
    touches = {};
    } 
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
  }
  
  if( (touches.enemysGroup) || sword.isTouching(enemysGroup)){  
   gameState = END  ;
   sword.addImage(gameOverImage) ;
   sword.scale = 2 ;
   sword.x = 300 ;
   sword.y = 300 ;
   fruitsGroup.destroyEach() ;
   enemysGroup.destroyEach() ;   
   fruitsGroup.setVelocityEach = 0 ;
   enemysGroup.setVelocityEach = 0 ; 
   gameoverSound.play();
    touches = {};
   }
  
  drawSprites();
  fill("white");
  textSize(20);
  text("Score:  " + score, 250, 50);
}

function Enemy(){
 if(World.frameCount%200=== 0){
   monster = createSprite(width-400, 200, 10, 10);
   monster.addAnimation("moving", monsterImage);
   monster.scale = 1.3;
   monster.velocityX = -(8+(score/10));
   monster.y = Math.round(random(30, 530));
   
   enemysGroup.add(monster);
 }
}

function Fruit(){
  if(World.frameCount%80===0){
    fruit = createSprite(width-400, 200, 20, 20);
    fruit.scale = 0.2;
    var r = Math.round(random(1,4));
    if(r === 1){
      
      fruit.addImage(fruit1Image);
    } 
    else if (r === 2){
      
      fruit.addImage(fruit4Image);
    } 
    else if (r === 3){
      
      fruit.addImage(fruit2Image);
    } 
    else {
      
      fruit.addImage(fruit3Image);
    }
    
    fruit.velocityX = -(7+(score/4));
    fruit.y =Math.round(random(30,530));
    fruit.lifetime = 100;
    fruitsGroup.add(fruit);
  }
  
  
}

