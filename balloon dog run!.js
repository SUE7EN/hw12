//https://editor.p5js.org/SUE7EN/sketches/MtdRkWyiq

var lastAddTime = 0;
var lastAddTime2 = 0;
var roses = [];
var heliumballoons = [];
var imgDog = [];
var imgBalloondog3;
var imgRose = [];
var imgGround;
var imgHeliumballoon;
var imgQrcode;
var groundX = 0;
var jumpSound;
var gameoverSound;
var gameScreen = 0;
var collision = 0;
var index = 1;

function preload() {
  imgGround = loadImage("ground.png");
  imgHeliumballoon = loadImage("heliumballoon.png");
  imgBalloondog3 = loadImage("balloondog/bd3.png");
  imgQrcode = loadImage("qrcode.png");
  jumpSound = loadSound("balloondog_jump.mp3");
  bgmSound = loadSound("bgm.mp3");
  gameoverSound = loadSound("gameover.wav");
  scoreSound = loadSound("win.mp3");
  for (let i = 1; i <= 4; i++) {
    var str1 = "balloondog/bd" + i + ".png";
    imgDog[i] = loadImage(str1);
  }
  for (let j = 1; j <= 4; j++) {
    var str2 = "obstacle/ob" + j + ".png";
    imgRose[j] = loadImage(str2);
  }
}

function setup() {
  createCanvas(640, 360);
  balloondog = new Balloondog();
  rose = new Rose();
  heliumballoon = new Heliumballoon();
}

function draw() {
  background(225);
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

class Balloondog {
  constructor() {
    this.img = imgDog[3];
    this.w = this.img.width * 1.5;
    this.h = this.img.height * 1.5;
    this.x = 80;
    this.y = height - this.h - 60;

    this.vy = 0;
    this.gravity = 1;
  }

  jump() {
    if (this.y == height - this.h - 60) { //balloon dog can only jump when his legs are on the ground
      this.vy = -18;
    }
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.h - 60); //make sure balloon dog stay in the screen
  }

  update() { //make the balloondog animated
    if (collision == 0) {
      if (this.y < height - 200) {
        this.img = imgDog[2];
      } else {
        this.img = imgDog[index % 2 + 3];
      }
    }
  }

  show() {
    image(this.img, this.x, this.y + 2, this.w, this.h);
  }
  hits(obstacle) {
    return collideRectRect(this.x - 10, this.y - 5, this.w - 5, this.h - 10, obstacle.x, obstacle.y, obstacle.w - 30, obstacle.h - 35);
  }
}

class Rose {
  constructor() {
    this.img = imgRose[int(random(1, 5))];
    this.w = this.img.width * 1.5;
    this.h = this.img.height * 1.5;
    this.x = width;
    this.y = height - this.h - 60;
  }
  move() {
    this.x -= 7;
  }
  show() {
    image(this.img, this.x, this.y + 5, this.w, this.h);
  }
}

class Heliumballoon {
  constructor() {
    this.img = imgHeliumballoon;
    this.w = this.img.width * 1.5;
    this.h = this.img.height * 1.5;
    this.x = width;
    this.y = height - this.h - 220;
  }
  move() {
    this.x -= 7;
  }
  show() {
    image(this.img, this.x, this.y + 5, this.w, this.h);
  }
}

function addObject() {
  var interval = random(800, 5000);
  if (millis() - lastAddTime >= interval) {

    if (int(interval) % 13 == 1) {
      heliumballoons.push(new Heliumballoon());
    } else {
      roses.push(new Rose());
    }
    lastAddTime = millis();
  }
}

function initScreen() {
  background(100);
  textAlign(CENTER);
  fill(225);
  textSize(60);
  text("Balloon Dog Run!", width / 2, height / 2 - 20);

  textSize(15);
  text("*Don't touch the obstacles & Try to grab the helium balloon*", width / 2, height - 80);

  fill(139, 236, 255);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height - 130, 200, 60, 5);
  fill(255);
  textSize(30);
  text("START", width / 2, height - 120);
}

function gamePlayScreen() {
  background(225);
  backGroundPicture();
  addObject();
  balloondog.update();
  balloondog.move();
  balloondog.show();
  if (frameCount % 6 == 0) {
    index++;
  }
  for (let r of roses) {
    r.move();
    r.show();
    if (balloondog.hits(r)) {
      collision = 1; //collision happened
      gameOver();
    }
  }
  for (let h of heliumballoons) {
    h.move();
    h.show();
    if (balloondog.hits(h)) {
      gameWin();
    }
  }
}

function gameOverScreen() {
  background(100);
  textAlign(CENTER);
  fill(225);
  textSize(60);
  text("Game Over.", width / 2, height / 2 - 20);

  fill(139, 236, 255);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height - 130, 200, 60, 5);
  fill(255);
  textSize(30);
  text("PLAY AGAIN", width / 2, height - 120);
}

function gameWinScreen() {
  background(100);
  textAlign(CENTER);
  fill(225);
  textSize(60);
  text("Congratulations!", width / 2, height - 280);
  fill(139, 236, 255);
  image(imgQrcode, width / 2 - 72, height - 250,imgQrcode.width * 0.8, imgQrcode.height * 0.8);
  image(imgBalloondog3, width / 2 - 200, 150,imgBalloondog3.width * 1.5,imgBalloondog3.height * 1.5);
  image(imgHeliumballoon, width / 2 +120, 120,imgHeliumballoon.width * 1.8, imgHeliumballoon.height * 1.8);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height - 60, 340, 60, 5);
  fill(255);
  textSize(30);
  text("SCAN TO SEE MORE", width / 2, height - 50);
}

function startGame() {
  gameScreen = 1;
}

function gameOver() {
  gameScreen = 2;
  gameoverSound.play();
  bgmSound.pause();
}

function gameWin() {
  gameScreen = 3;
  scoreSound.play();
  bgmSound.pause();
}

function restart() {
  gameScreen = 1;
  lastAddTime = 0;
  lastAddTime2 = 0;
  rose = [];
  heliumballoons = [];
  collision = 0;
  roses = [];
  heliumballoon = [];
  groundX = 0;
  index = 1;
}

function backGroundPicture() {
  if (groundX > (-1) * (imgGround.width) / 2) {
    groundX -= 7;
  } else groundX = 0;
  image(imgGround, groundX, 0, imgGround.width, imgGround.height);
}

function touchStarted() {
  if (gameScreen == 0) {
    startGame();
    bgmSound.play();
  }
  if (gameScreen == 2 || gameScreen == 3) {
    restart();
    jumpSound.play();
    bgmSound.play();
  }
  if (gameScreen == 1) {
    balloondog.jump();
    jumpSound.play();
  }
}

function keyPressed() {
  if (key == ' ') {
    balloondog.jump();
    jumpSound.play();
  }
}
