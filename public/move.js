const ball   = document.querySelector('.ball');
const box = document.querySelector('.box');

const maxY = box.clientWidth  - ball.clientWidth;
const maxX = box.clientHeight - ball.clientHeight;
ball.style.top = "50px";
ball.style.left = "50px";

function handleOrientation(event) {
  //from the perspective of phone up right, facing user
  let y = event.beta;
  let x = event.gamma;

  //TODO MAke this incremental
  yInc = 1;
  xInc = 1;
  // console.log(x);

  if (y > 45) {
    ball.style.top = parseInt(ball.style.top) + (yInc) + "px";
  }
  else if ( y < 45) {
    ball.style.top = parseInt(ball.style.top) - (yInc) + "px";
  }

  if (x < 0) {
    console.log('RIGHT!!!!!!');
    ball.style.left = parseInt(ball.style.left) - (xInc) + "px";
  }
  else if ( x > 0) {
    console.log('LEFT!!!!!!');
    ball.style.left = parseInt(ball.style.left) + (xInc) + "px";
  }

  // ball.style.top = parseInt(ball.style.top) + (y/90) + "px";
}

window.addEventListener("deviceorientation", handleOrientation, true);
