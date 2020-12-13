var bird;
var pipes;
var score = 0;
var mainMenu;
var paused;
var highscore = 0;
var numFrames;
this.showMainMenu = function() {
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
      text('Press [SPACE] to play', width/2, height/2 + (height/4 - 20));
    }
}
this.showPauseMenu = function() {
  fill(255, 255, 255);
  textSize(50);
  text('PAUSED', width/2, height/2);
}
this.displayScore = function() {
  textAlign(CENTER);
  fill(255, 255, 255);
  textSize(50);
  text(score, width/2, 50);
}

// called by p5 js engine at start
function setup() {
  var canvas = createCanvas(400, 600);
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

// called by p5 js engine every frame  
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
      // reinitialize the game
      setup(); 
      return;
    }
    // delete unused pipes
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    // check for a score
    if (pipes[i].scored(bird) && !pipes[i].hits(bird)) {
      if (pipes[i].canScore) {
        score++;
        pipes[i].canScore = false;
      }
    }
  }

  displayScore();

  bird.update();
  bird.show();

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

  if (key == 'p') {
    if (!mainMenu) {
      this.pause();
    }
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

  // for mobile 
  function touchStarted() {
    if (mainMenu) {
      mainMenu = false;
      frameCount = 0;
    } else {
      bird.up();
    }
    return false; 
  }

