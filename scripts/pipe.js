function Pipe() {
    this.pipeOpening = 135;
    let groundHeight = 100;
    let playableHeight = height - groundHeight;
    this.center = random(50, playableHeight - this.pipeOpening - 50);
    this.top = this.center - 10;
    this.bottom = playableHeight - (this.center + this.pipeOpening);
    this.x = width; // starts at far right
    this.w = 50;
    this.speed = 2;
    this.canScore = true; 

    this.hits = function(bird) {
        // Adjust collision for ground level at height - 100
        let groundLevel = height - 100;
        
        // check for pipe collisions - adjusted for pipe caps
        if ((bird.y - 16 < this.top - 25 || bird.y + 16 > groundLevel - this.bottom + 20)
             && bird.x + 16 > this.x - 5
             && bird.x - 16 < this.x + this.w + 5) {
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
        rect(this.x, 0, this.w, this.top - 20);
        
        // Top pipe cap
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        rect(this.x - 5, this.top - 25, this.w + 10, 25);
        
        // Draw bottom pipe  
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        rect(this.x, height - this.bottom + 20, this.w, this.bottom - 20);
        
        // Bottom pipe cap
        fill(pipeGreen);
        stroke(pipeDarkGreen);
        rect(this.x - 5, height - this.bottom + 20, this.w + 10, 25);
        
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
