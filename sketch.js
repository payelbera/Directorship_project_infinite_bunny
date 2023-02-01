var character,characterImg,characterImg2,characterImg3,characterImgCollided
var ground,groundImg,invisibleGround,groundImg2,groundImg3,groundImg4

var jumpImg,jump
var obs,obsImg1,obsImg2,obsImg3,obsFire
var obsGrp,coinGrp
var coinImg
var score=0
var lives=3
var gameOverImg,gameOver
var restartImg,restart
var jumpIcImg,jumpIc
var jumpIcoImg,jumpIco

var livesImg,livesImg2,livesImg3
var gameState=1

function preload(){
characterImg=loadAnimation("running1.png","running2.png","running3.png")
characterImg2=loadAnimation("running4.png","running5.png","running6.png")
characterImg3=loadAnimation("running7.png","running8.png","running9.png")

characterImgCollided=loadAnimation("running3.png")

jumpImg=loadAnimation("running3.png")

groundImg=loadImage("ground.png")
groundImg2=loadImage("ground2.png")
groundImg3=loadImage("ground3.png")
groundImg4=loadImage("ground4.jpg")

obsImg1=loadImage("cactus.png")
obsImg2=loadImage("fire.png")
obsImg3=loadImage("mushroom.png")

coinImg=loadAnimation("coin.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png","coin8.png","coin9.png")

livesImg3=loadImage("heart3.png")
livesImg2=loadImage("heart2.png")
livesImg=loadImage("heart.png")

gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.jpg")

jumpIcImg=loadImage("jump.png")
jumpIcoImg=loadImage("jump2x.png")
}
function setup() {
  createCanvas(1000,500);
  ground=createSprite(400,280,800,20)
  ground.addImage("ground1",groundImg)
  ground.addImage("ground2",groundImg2)
  ground.addImage("ground3",groundImg3)
  ground.addImage("ground4",groundImg4)
  ground.scale=0.65
  ground.velocityX=-3

  character=createSprite(80, 350,50,50);
  character.addAnimation("character1",characterImg)
  //character.addAnimation("character2",characterImg2)
  character.addAnimation("jump",jumpImg)
  character.addAnimation("collided",characterImgCollided)
  //character.addAnimation("character3",characterImg3)
  character.scale=0.4
  //character.debug=true
  character.setCollider("rectangle",0,0,300,350)

  invisibleGround=createSprite(400,450,800,20)
  invisibleGround.visible=false

  gameOver=createSprite(500,180)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.scale=0.3
  gameOver.visible=false

  restart=createSprite(500,270)
  restart.addImage("restart",restartImg)
  restart.visible=false

  jumpIc=createSprite(50,250)
  jumpIc.addImage("jump",jumpIcImg)

  jumpIco=createSprite(950,250)
  jumpIco.addImage("jump",jumpIcoImg)

  obsGrp=new Group()
  coinGrp=new Group()
}

function draw() {
  background("yellow");  
  drawSprites();
  if(gameState===1){
    //console.log(character.y)
  if(ground.x<0){
    ground.x=ground.width/2
  }

  if(mousePressedOver(jumpIc)&&character.collide(invisibleGround)){
    character.velocityY=-6
  }
  if(keyDown("space")&&character.collide(invisibleGround)){
    character.velocityY=-6
  }
  if(mousePressedOver(jumpIco)&&character.collide(invisibleGround)){
    character.velocityY=-7
  }
  
  character.velocityY=character.velocityY+0.1

  character.collide(invisibleGround)
  if(frameCount%200===0){
    coinFunction()
  }
  if(frameCount%350===0||frameCount===50){
  spawnObs()
  }
  if(frameCount%300===0){
    upSpawnObs()
  }
  if(obsGrp.isTouching(character)){
    lives=lives-1
    obsGrp.destroyEach()
  }

  //if(){}

  if(frameCount%2000===0){
    var rand=Math.round(random(1,2))
    switch (rand){
      case 1:ground.changeImage("ground2",groundImg2)
      ground.scale=1.1
      character.y=380
      invisibleGround.y=470
      break;
      case 2:ground.changeImage("ground3",groundImg3)
      ground.scale=1.05
      invisibleGround.y=470
      character.y=370
      break;
      case 3:ground.changeImage("ground1",groundImg)
      ground.scale=0.65
      ground.y=280
      invisibleGround.y=450
      character.y=350
      break;
    }
    //if(lives===0){}

  }
  
  if(coinGrp.isTouching(character)){
    score=score+1
    coinGrp.destroyEach()
  }

  if(lives===3){
    image(livesImg3,70,50,90,50)
  }

  else if(lives===2){
    image(livesImg2,70,50,90,50)
  }

  else if(lives===1){
    image(livesImg,70,50,50,50)
  }
  else {gameState=0}

  fill("black")
  text("COINS COLLECTED:"+score,width-200,50)

  }
  else if(gameState===0){
  gameOver.visible=true
  restart.visible=true
  ground.velocityX=0
  obsGrp.setVelocityYEach(0)
  obsGrp.setVelocityXEach(0)
  coinGrp.setVelocityXEach(0)
  character.velocityY=0
  character.y=350
  character.changeAnimation("collided",characterImgCollided)
  if(mousePressedOver(restart)){
    reset()
  }
  coinGrp.destroyEach()

  }

  
  
}

function spawnObs(){
obs= createSprite(width+50,400)
console.log(obs.y)
obs.velocityX=-3
obs.scale=0.2
obs.lifetime=(width/obs.velocityX)+100
var rand=Math.round(random(1,2))
switch(rand){
  case 1:obs.addImage(obsImg1)
  break
 
  case 2:obs.addImage(obsImg3)
  break
}
obsGrp.add(obs)
}

function upSpawnObs(){
  obsFire= createSprite(width+50,50)
  obsFire.addImage(obsImg2)
  obsFire.lifetime=400
  obsFire.velocityY=1
  obsFire.velocityX=-5
  obsFire.scale=0.2
  obsGrp.add(obsFire)
}

function coinFunction(){
  var coin=createSprite(width+50,250)
  //coin.debug=true
  coin.setCollider("circle",0,0,30)
  coin.addAnimation("coinImg",coinImg)
  coin.lifetime=400
  //coin.velocityY=1
  coin.velocityX=-5
  coin.scale=0.8
  coinGrp.add(coin)
}

function reset(){
  gameState=1
  ground.velocityX=-3
  obsGrp.destroyEach()
  coinGrp.destroyEach()
  gameOver.visible=false
  restart.visible=false
  score=0
  lives=3
  character.changeAnimation("character1",characterImg)
}