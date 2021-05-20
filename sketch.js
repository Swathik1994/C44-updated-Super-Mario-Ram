var mario,marioimg,goomba,goombaimg,goombagroup,bg,bgimg,ground,invground,coin,coinsgroup,coinimg,mariodead,mariodeadimg;
var play=1;
var gameState = play;
var end=0;
var score=0;

function preload(){
  marioimg = loadImage("sprites/mario1.gif");
  bgimg = loadImage("sprites/kingdom.jpg");
  goombaimg = loadImage("sprites/goomba1.gif");
  coinimg = loadImage("sprites/coin.png");
  mariodeadimg = loadImage("sprites/mariodead.jpg")
}


function setup() {
  createCanvas(1500,700);

 

  bg = createSprite(750,350,1500,700);
  bg.addImage(bgimg);
  bg.scale=8;

 

 mario = createSprite(100, 400, 50, 50);
  mario.addImage(marioimg);
  mario.debug = true;
  mario.setCollider("circle",0,0,80)
  
 ground = createSprite(750,690,1500,10);
 ground.visible  = false;

 invground=createSprite(750,795,1500,10)
 invground.visible = false; 

 
 mariodead = createSprite(750,350,1500,700);
mariodead.addImage(mariodeadimg);
mariodead.visible=false;

  
 goombagroup=createGroup();
 coinsgroup = createGroup();
}

function draw() {
  background(220);

  

  console.log(mario.y);

if (gameState===play){

 bg.velocityX= -6;

 if(bg.x<0){
   bg.x=bg.width/2;

 }

 if(keyDown("space") && mario.y >= 466 ){
 mario.velocityY = -20;
 }
  
mario.velocityY = mario.velocityY + 0.8;

spawnGoomba();
spawnCoins()
if(mario.isTouching(coinsgroup)){
  coinsgroup.destroyEach();
  score=score+100;
}

if(mario.isTouching(goombagroup)){
gameState = end;
}
}

else if(gameState === end){
ground.velocityX=0;

mariodead.visible=true;
goombagroup.setVelocityXEach(0);
bg.velocityX=0;
mario.velocityY=0;
coinsgroup.setVelocityXEach(0);

}
mario.collide(invground);
 

  drawSprites();

  textSize(35);
  fill(255)
  text("Score: "+score,1050,80);
}

function spawnGoomba(){
if(frameCount % 120 === 0){
  goomba=createSprite(1500,650,10,50);
  goomba.addImage(goombaimg);
  goombagroup.add(goomba);
  goomba.velocityX = -6;
  goomba.scale = 0.18
}

}


function spawnCoins(){
if(frameCount % 150 === 0){
  coin=createSprite(1500,560,10,30);
  coin.addImage(coinimg);
  coinsgroup.add(coin);
  coin.velocityX=-10;
  coin.scale=0.2
}
}

