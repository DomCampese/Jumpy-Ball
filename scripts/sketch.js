var bird;
var pipes;
var score;
var mainMenu;
var paused;
var highscore = 0;
var numFrames;


// called by p5.js at start
function setup() {
  var canvas;
  if (isMobileDevice()) {
    canvas = createCanvas(windowWidth, windowHeight);
  } else {
    canvas = createCanvas(400, 600);
  }
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  mainMenu = true;
  paused = false;
  if (score > highscore) {
    highscore = score;
  }
  score = 0;
}

// called by p5.js every frame
function draw() {
  if (mainMenu) {
    showMainMenu();
    return;
  }

  if (paused) {
    showPauseMenu();
    return;
  }

  // Sky blue gradient background (classic Flappy Bird style)
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(30, 144, 255), inter);
    stroke(c);
    line(0, i, width, i);
  }
  noStroke();

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    // check for a collision
    if (pipes[i].hits(bird)) {
      setup(); // reset game
      return;
    }
    // delete unused pipes
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    // check for a score
    if (pipes[i].scored(bird)) {
        score++;
    }
  }
  displayScore();
  
  // Draw ground at the bottom (classic Flappy Bird style)
  fill(222, 216, 149); // tan/sand color
  rect(0, height - 100, width, 100);
  fill(193, 154, 107); // darker brown for accent
  rect(0, height - 100, width, 10);
  
  bird.update();
  bird.show();

  if (bird.hitsGround()) {
    setup(); // reset game
    return;
  }
  // add a pipe every 100 frames
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
} 

function keyPressed() {
  if (key == ' ') {
    if (mainMenu) {
      mainMenu = false;
      frameCount = 0;
    } else if (!paused) {
      bird.up();
    } else { 
      this.pause(); // space can optionally unpause the game
    }
  }

  if (key == 'p' && !mainMenu) {
      this.pause();
  }

  // pauses or unpauses game
  this.pause = function() {
    // preserve frameCount on pause
    if (!paused) {
      paused = true;
      numFrames = frameCount;
    } else {
      paused = false;
      frameCount = numFrames;
    }
  }
}

// detect mouse click or touch
this.touchStarted = function() {
  if (!mainMenu && !paused) {
    bird.up();
  } else {
    mainMenu = false;
    paused = false;
    frameCount = 0;
  }
  return false; 
}

function showMainMenu() {
  // Sky blue gradient background
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(30, 144, 255), inter);
    stroke(c);
    line(0, i, width, i);
  }
  noStroke();
  
  textAlign(CENTER);
  fill(255, 220, 0); // Yellow like the bird
  textSize(30);
  text('HIGH SCORE: ' + highscore, width/2, height/4);
  textSize(50);
  fill(255, 255, 255); // White text
  stroke(0);
  strokeWeight(3);
  text('JUMPY BIRD', width/2, height/2);
  noStroke();
  textSize(20);
  if (frameCount % 60 < 30) { // blinking text
    fill(255, 220, 0); // Yellow
    if (!isMobileDevice()) {
      text('Press [SPACE] to play', width/2, height/2 + (height/4 - 20));
    } else {
      text('Tap to play', width/2, height/2 + (height/4 - 20));
    }
  }
}

function showPauseMenu() {
  fill(255, 255, 255);
  textSize(50);
  text('PAUSED', width/2, height/2);
}

function displayScore() {
  textAlign(CENTER);
  fill(255, 255, 255);
  textSize(50);
  text(score, width/2, 50);
}

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") ||
    (navigator.userAgent.indexOf('IEMobile') !== -1);
}
