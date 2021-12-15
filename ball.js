const INITIAL_VELOCITY = 0.045
const VELOCITY_INCREASE = 0.000001

class Ball {
    constructor(ballElem) {
// called when created
        this.ballElem = ballElem;
        this.reset()// call when created
    }

    get x() {

        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value)// set this property to whatever value you passed in as an argument to the function
    }

    get y() {

        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    randomNumbersBetween(min, max) {
        return Math.random() * (max - min) + min
    }


    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = {x: Math.random() * 10}
        while (this.direction.x <= .2 || this.direction.x >= .9) {
            const heading = this.randomNumbersBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }


        this.velocity = INITIAL_VELOCITY

    }

    isCollision(rect1,rect2) {
        return rect1.left <=rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom  >= rect2.top;
    }

    update(delta,paddleRects) {// being called every frame
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        const rect = this.rect()
        this.velocity += VELOCITY_INCREASE * delta


        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1

        }

        if (rect.right >= window.innerWidth || rect.left <= 0) {
            this.direction.x *= -1
        }

        if(paddleRects.some(r=>this.isCollision(r,rect))){
            this.direction.x *= -1;
        }

    }


}


export default Ball;