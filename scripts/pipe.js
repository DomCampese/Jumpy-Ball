function Pipe() {
    this.pipeOpening = 135;
    let playableHeight = height - GROUND_HEIGHT;
    this.center = random(50, playableHeight - this.pipeOpening - 50);
    this.top = this.center - 10;
    this.bottom = playableHeight - (this.center + this.pipeOpening);
    this.x = width; // starts at far right
    this.w = 50;
    this.speed = 2;
    this.canScore = true;
    
    // Pipe visual constants
    const PIPE_CAP_HEIGHT = 25;
    const PIPE_CAP_EXTRA_WIDTH = 5;
    const PIPE_BODY_OFFSET = 20; 

    this.hits = function(bird) {
        // Adjust collision for ground level
        let groundLevel = height - GROUND_HEIGHT;
        let birdRadius = 16; // Approximate bird collision radius
        
        // check for pipe collisions - adjusted for pipe caps
        if ((bird.y - birdRadius < this.top - PIPE_CAP_HEIGHT || bird.y + birdRadius > groundLevel - this.bottom + PIPE_BODY_OFFSET)
             && bird.x + birdRadius > this.x - PIPE_CAP_EXTRA_WIDTH
             && bird.x - birdRadius < this.x + this.w + PIPE_CAP_EXTRA_WIDTH) {
            this.canScore = false;
            return true;
        }
        return false;
    }

    this.show = function() {
        // Classic Flappy Bird pipe colors
        let pipeGreen = color(0, 200, 0);
        let pipeDarkGreen = color(0, 150, 0);
        
        // Draw top pipe
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        strokeWeight(3);
        rect(this.x, 0, this.w, this.top - PIPE_BODY_OFFSET);
        
        // Top pipe cap
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        rect(this.x - PIPE_CAP_EXTRA_WIDTH, this.top - PIPE_CAP_HEIGHT, this.w + PIPE_CAP_EXTRA_WIDTH * 2, PIPE_CAP_HEIGHT);
        
        // Draw bottom pipe  
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        rect(this.x, height - this.bottom + PIPE_BODY_OFFSET, this.w, this.bottom - PIPE_BODY_OFFSET);
        
        // Bottom pipe cap
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        rect(this.x - PIPE_CAP_EXTRA_WIDTH, height - this.bottom + PIPE_BODY_OFFSET, this.w + PIPE_CAP_EXTRA_WIDTH * 2, PIPE_CAP_HEIGHT);
        
        noStroke();
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
       return this.x < -this.w;
    }

    // check if user scored
    this.scored = function(bird) {
        if ((bird.x >= this.x + (this.w / 2)) && this.canScore) {
            this.canScore = false;
            return true;
        } else {
            return false; 
        }
    }
}
