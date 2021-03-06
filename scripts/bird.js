function Bird() {
    this.y = height/2;
    this.x = width/4;
    this.gravity = 1;
    this.lift = -25;
    this.velocity = 0;

    this.show = function() {
        fill(51, 153, 255);
        ellipse(this.x, this.y, 32 , 32);
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.velocity *= 0.9;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    this.hitsGround = function() {
        return (bird.y == height);
    }
}
