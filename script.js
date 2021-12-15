// update loop, refresh frames
import Ball from "./ball.js";
import Paddle from "./Paddle.js";


//Ball
const ball = new Ball(document.getElementById("ball"))


//PADDLES
const paddle = new Paddle(document.getElementById("player-paddle"))
const comPaddle = new Paddle(document.getElementById("computer-paddle"))

let lastTime;


let update = (time) => {// runs all the time


    if (lastTime != null) {
        const delta = time - lastTime


// update only if last time,
        //console.log(delta) logs the millisecond latency


         ball.update(delta,[paddle.rect(),comPaddle.rect()])
        comPaddle.update(delta,ball.y)
        paddle.update(delta,ball.y)

        if (isLose()){
            handleLose()
            console.log("lost")
        }
    }
    lastTime = time
    window.requestAnimationFrame(update)





}

let handleLose = ()=>{
    ball.reset();
    comPaddle.reset();
    paddle.reset()
}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}



// document.addEventListener("mousemove", e =>{
//     paddle.position = (e.y / window.innerHeight * 100)
//     console.log("moving")
// })




window.requestAnimationFrame(update)// update gets called every frame


