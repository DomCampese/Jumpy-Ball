function Pipe() {
    this.pipeOpening = 135;
    this.center = random(50, height - this.pipeOpening-50);
    this.top = this.center - 10;
    this.bottom = height - (this.center + this.pipeOpening);
    this.x = width; // starts at far right
    this.w = 50;
    this.speed = 2;
    this.canScore = true;
    

    this.hits = function(bird) {
        // check for pipe collissions
        if ((bird.y < this.top || bird.y > height - this.bottom)
             && bird.x > this.x 
             && bird.x < this.x + this.w) {
            this.canScore = false;
            return true;
        }
        return false;
    }

    this.show = function() {
        fill(144,238,144);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
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
