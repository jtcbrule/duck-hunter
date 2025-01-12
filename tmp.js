// create canvas element
const canvas = document.createElement('canvas');
canvas.id = 'myCanvas';
canvas.width = 800;
canvas.height = 800;
//canvas.style.border = '1px solid black';

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Create image object
const birdImage = new Image();
birdImage.src = 'bird.png';

let x = 200; // starting x position
let y = 200; // starting y position
let dx = 2;  // x velocity
let dy = 2;  // y velocity
const width = 40;  // width of the bird image
const height = 40; // height of the bird image

// Wait for the image to load before starting animation
birdImage.onload = function() {
    animate();
};

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the bird image
    ctx.drawImage(birdImage, x, y, width, height);
    
    // Bounce off walls
    if (x + width > canvas.width || x < 0) {
        dx = -dx;
        // Flip the image horizontally when changing direction
        ctx.save();
        if (dx < 0) {
            ctx.scale(-1, 1);
            ctx.drawImage(birdImage, -x - width, y, width, height);
        } else {
            ctx.drawImage(birdImage, x, y, width, height);
        }
        ctx.restore();
    }
    if (y + height > canvas.height || y < 0) {
        dy = -dy;
    }
    
    // Update position
    x += dx;
    y += dy;
    
    // Call animate again
    requestAnimationFrame(animate);
}

///


