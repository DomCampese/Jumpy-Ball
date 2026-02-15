function Bird() {
    this.y = height/2;
    this.x = width/4;
    this.gravity = 1;
    this.lift = -25;
    this.velocity = 0;
    this.size = 32;

    this.show = function() {
        push();
        translate(this.x, this.y);
        
        // Rotate bird based on velocity (tilt up when going up, down when falling)
        let angle = map(this.velocity, -25, 25, -PI/4, PI/2);
        angle = constrain(angle, -PI/4, PI/2);
        rotate(angle);
        
        // Draw bird body (yellow circle like Flappy Bird)
        fill(255, 220, 0);
        stroke(0);
        strokeWeight(2);
        ellipse(0, 0, this.size, this.size);
        
        // Draw wing
        fill(255, 200, 0);
        ellipse(-5, 0, 12, 18);
        
        // Draw eye
        fill(255);
        ellipse(8, -5, 10, 10);
        fill(0);
        ellipse(10, -5, 5, 5);
        
        // Draw beak
        fill(255, 140, 0);
        triangle(12, -2, 12, 2, 20, 0);
        
        pop();
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.velocity *= 0.9;

        // Ground is now at height - GROUND_HEIGHT
        if (this.y > height - GROUND_HEIGHT - this.size/2) {
            this.y = height - GROUND_HEIGHT - this.size/2;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    this.hitsGround = function() {
        return (bird.y >= height - GROUND_HEIGHT - this.size/2);
    }
}
