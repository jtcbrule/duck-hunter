/* Options */

// image for bird, relative path
const birdSrc = 'bird.png';

// draw a bird image? At least one of circle/bird should be drawn.
const showBird = true;

// size of bird drawn (pixels)
const birdRadius = 64;

// draw a circle? Will be drawn behind bird
const showCircle = true;

// circle color, can be given as hex, e.g. "#00ff00"
const circleColor = 'white';

// background color, should be different than circle
const backgroundColor = 'black';

// velocity ranges for bird
// randomly selected in this range
const minVelocityX = 5;
const maxVelocityX = 15;
const minVelocityY = 5;
const maxVelocityY = 10;

// how far past the edge of the screen should the bird fly?
// randomly selected
const minDelay = 0;
const maxDelay = 1000;

// for console debugging (F12 in Firefox)
const log = true;


/* Code */

// no padding
document.body.style.margin = '0';
document.body.style.padding = '0';
document.documentElement.style.margin = '0';
document.documentElement.style.padding = '0';

// create canvas element
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
document.body.appendChild(canvas)

// resize function to keep canvas sized correctly
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
    
// Initial resize
resizeCanvas();

// Listen for resize
window.addEventListener('resize', resizeCanvas);

// animation context
const ctx = canvas.getContext('2d');

// Create image object
const birdImage = new Image();
birdImage.src = birdSrc;


// draw circle, x, y are center of circle
function drawCircle(ctx, x, y, radius=birdRadius, color=circleColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath()
}

// correct position, so it's drawn with center at x, y
function drawBird(ctx, x, y, width=birdRadius*2, height=birdRadius*2) {
    ctx.drawImage(birdImage,
        x - width/2, y - height/2 ,
        width, height);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomBoolean() {
    return Math.round(Math.random()) === 1
}


// Globals, but we're modifying state, so it seems fine
var x;
var y;
var dx;
var dy;
var delay;

function reset() {
    // always start just off screen to the left
    x = -birdRadius;

    // start with random y position, bird fully in view
    y = randomInt(birdRadius, canvas.height - birdRadius);

    // random positive x velocity for bird
    dx = randomInt(minVelocityX, maxVelocityX);

    // random positive or negative y velocity
    dy = randomInt(minVelocityY, maxVelocityY);
    if (randomBoolean()) {
        dy = -dy;
    }
    
    // random delay
    delay = randomInt(minDelay, maxDelay)
    
    if (log) {
        console.log(`x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}, delay: ${delay}`);
    }
}


function animate() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showCircle) {
        drawCircle(ctx, x, y);
    }

    if (showBird) {
        drawBird(ctx, x, y);
    }

    // bounce off floor / ceiling
    if (y - birdRadius > canvas.height || y < -birdRadius) {
        dy = -dy
    }

    // reset when bird is past the end
    if (x > canvas.width + birdRadius + delay) {
        reset()
    }

    // update position
    x += dx;
    y += dy;
    
    // call animate again
    requestAnimationFrame(animate);
}

// wait for the image to load before starting animation
birdImage.onload = function() {
    reset()
    animate();
};

