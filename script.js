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
birdImage.src = 'bird.png';

// Options here
const showCircle = true;
const showBird = true;
const birdRadius = 128;
const circleColor = 'white';


// note: x, y are given from position of top corner of image
let x = birdRadius; //-birdWidth;  // starting x position
let y = birdRadius; // starting y position
let dx = 0;  // x velocity
let dy = 0;  // y velocity
//const radius = 20;

// Wait for the image to load before starting animation
birdImage.onload = function() {
    animate();
};


function drawCircle(ctx, x, y, radius=birdRadius, color=circleColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath()
}

// Correct position, so it's drawn with center at x, y
function drawBird(ctx, x, y, width=birdRadius*2, height=birdRadius*2) {
    ctx.drawImage(birdImage,
        x - width/2, y - height/2 ,
        width, height);
}

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showCircle) {
        drawCircle(ctx, x, y);
    }

    if (showBird) {
        drawBird(ctx, x, y);
    }

    // Bounce off floor
    // TODO

    // Bounce off walls
    //if (x + birdWidth > canvas.width || x < 0) {
    //    dx = -dx;
    //}
    //if (y + birdHeight > canvas.height || y < 0) {
    //    dy = -dy;
    //}
    
    // Draw the circle
    //ctx.beginPath();
    //ctx.arc(x, y, radius, 0, Math.PI * 2);
    //ctx.fillStyle = 'blue';
    //ctx.fill();
    //ctx.closePath();
    
    // Bounce off walls
    //if (x + radius > canvas.width || x - radius < 0) {
    //    dx = -dx;
    //}
    //if (y + radius > canvas.height || y - radius < 0) {
    //    dy = -dy;
    //}
    
    // Update position
    x += dx;
    y += dy;
    
    // Call animate again
    requestAnimationFrame(animate);
}

