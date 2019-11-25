function preload() {

}

var lastAddTime = 0;
var sharps = [];
var imgDog = [];
var imgSharp = [];
var imgHelium = [];
var score = 0;
var gameScreen = 0;
var bts = 0;
var index=1;

class Balloondog{
     constructor(){
     this.img= imgDog[3];
     this.x =80;
     this.y =height-this.h;
     
     this.vy=0;
     this.gravity = 1;
     }
   
  jump(){
  if(this.y ==height-this.h){//only be able to jump when the balloondogs' feet are on the ground
     this.vy= -18;
     
    }
  }
  
  move(){
  this.y += this.vy;
  this.vy += this.gravity;
  this.y = constrain(this.y, 0, height-this.h);//make sure the balloondog won't get out of the screen
  }

   update(){
     if(bts==0){
       if(this.y<height-100){
         this.img = imgDog[2];
         }
       else {
          this.img = imgDog[index%2+3];
       } 
     }     
     else{
       this.img = imgDog[5];
     }
  }
  //
  show(){
   image(this.img,this.x,this.y+2,this.w,this.h);
  }  
  hits(obstacle){
  return collideRectRect(this.x-10, this.y-5, this.w-5, this.h-10, obstacle.x, obstacle.y, obstacle.w-30, obstacle.h-35);
  }

  addScore(obstacle){
if((obstacle.x+obstacle.w<this.x)&&(obstacle.score==0)&&(cld==0)){
        obstacle.score=1;
        score+=1;
    }
   }
}
class Sharp{
     constructor(){
       this.img= imgSharp[int(random(1,12))];
       this.w = this.img.width*1.5;
       this.h =this.img.height*1.5;
       this.x= width;
       this.y= height -this.h; 
       this.score =0;
     }
  move(){
   this.x -=8;
  }
  show(){
    
     image(this.img,this.x,this.y+5 ,this.w,this.h);
  }
}

function setup() {
  createCanvas(960, 540);
  balloondog = new Balloondog();
  sharp = new Sharp();
  // helium = new Helium();
}

function draw() {
  background(220);
  //different screens
  if (gameScreen == 0) {
    initScreen();
  } else if (gameScreen == 1) {
    gamePlayScreen();
  } else if (gameScreen == 2) {
    gameOverScreen();
  } else if (gameScreen == 3) {
    gameWinScreen();
  }
}

function addObstacle() {
  var interval = random(800, 4000);
  if (millis() - lastAddTime > interval) {

    if (int(interval) % 2 == 0) {
      sharps.push(new Sharp());
    }
    lastAddTime = millis();
  }
} //reference

function initScreen() {
  background(225);

  textAlign(CENTER);
  fill(100);
  textSize(90);
  text("Balloon Dog Run!", width / 2, height / 2 - 50);

  textSize(20);
  text("*try to grab the helium balloon*", width / 2, height - 100);

  fill(100);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height - 160, 200, 60, 5);
  fill(255);
  textSize(30);
  text("START", width / 2, height - 150);

}

function gamePlayScreen() {
  background(100);
  addObstacle();
  balloondog.update();
  balloondog.move();
  balloondog.show();
  if (frameCount % 6 == 0) index++;
  for (let s of sharp) {
    s.move();
    s.show();
    if (balloondog.hits(0)) {
      bts = 1;
      gameScreen = 2;
    }
    balloondog.addScore(s);
  }
}

function gameOverScreen() {
  background(225, 10);
  textAlign(CENTER);
  fill(100);
  textSize(90);
  text("Game Over.", width / 2, height / 2 - 50);

  fill(100);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height - 160, 200, 60, 5);
  fill(255);
  textSize(30);
  text("PLAY AGAIN", width / 2, height - 150);
}

function gameWinScreen() {
  background(225, 10);
  textAlign(CENTER);
  fill(100);
  textSize(90);
  text("Congratulations!", width / 2, height / 2 - 50);

  fill(100);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height - 160, 200, 60, 5);
  fill(255);
  textSize(30);
  text("PLAY AGAIN", width / 2, height - 150);
}

function startGame() {
  gameScreen = 1;
}

function gameOver() {
  gameScreen = 2;
}

function gameWin() {
  gameScreen = 3;
}

function mouseClicked() {
  if (gameScreen == 0) {
    startGame();
  }
  if (gameScreen == 2 || gameScreen == 3) {
    restart();
  }
  if (gameScreen == 1) {
    balloondog.jump();
    jumpSound.play();
  }
}

function keyPressed() {
  if (key == ' ') {
    balloondog.jump();
  }
}

function restart() {
  gameScreen = 1;
  lastAddTime = 0;
  obstacles = [];
  bts = 0;
  score = 0;
}
