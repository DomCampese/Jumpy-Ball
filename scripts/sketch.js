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

  background(0);

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
  background(0);
  textAlign(CENTER);
  fill(51, 153, 255);
  textSize(30);
  text('HIGH SCORE: ' + highscore, width/2, height/4);
  textSize(50);
  fill(144,238,144);
  text('JUMPY BALL', width/2, height/2);
  textSize(20);
  if (frameCount % 60 < 30) { // blinking text
    fill(51, 153, 255);
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
