import gamedep from "./indexMaster"

const {Container, KeyControls, Text, CanvasRenderer, Texture, Sprite} = gamedep;

//Game setup code
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w,h);
document.querySelector("#game").appendChild(renderer.view);
const controls = new KeyControls();

//Game Objects
const scene = new Container();

//Game state variables
let lastShot = 0;

// const planeTexture = new Texture("../resources/images/fly.png", {width:"10px", height:"10px"});

// ## Setup Textures required for the game ##
const textures = {
    plane: new Texture("../resources/images/fly50.png"),
    background: new Texture("../resources/images/BGcanvas.png"),
    bullet: new Texture("../resources/images/bulletw.png")
}

// Add bullets to a container - several bullets
const bullets = new Container();

// Function to fire bullets
function fireBullet(x,y) {
    const bullet = new Sprite(textures.bullet);
    bullet.pos.x = x;
    bullet.pos.y = y;
    bullet.update = function(dt,t) {
        this.pos.x += dt * 400;
    };
    bullets.add(bullet);

    //Filter out bullets when they go past the screen
    bullets.children = bullets.children.filter(bullet => {
        return bullet.pos.x < w + 20;
    })
}

// ## Set u the plane
const plane = new Sprite(textures.plane);
plane.pos.x = 10;
plane.pos.y = h / 2 - 180;
console.log(plane.pos.y);
console.log(w);
console.log(w-55);

plane.update = function(dt, t) {
    const {pos} = this;
    pos.x += controls.x * dt * 200;
    pos.y += controls.y * dt * 200;

    if (pos.x > w-55) pos.x = w-55;
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    if (pos.y > h-55) pos.y = h-55;

}


//Load up the background

const background = new Sprite(textures.background);

// Add the background and the plane to the screen
scene.add(background);
scene.add(plane);
scene.add(bullets);




// for (let i = 0; i < 5; i++) {
//     const speed = Math.random() * 150 + 50;
//     const plane = new Sprite(planeTexture);
//     // plane.pos.x = Math.random() * w;
//     // plane.pos.y = Math.random() * h;
//     plane.pos.x = 20;
//     plane.pos.y = 100;
    
//     // plane.update = function(dt) {
//     //     this.pos.x += speed * dt;
//     //     if (this.pos.x > w) {
//     //         this.pos.x = -20;
//     //     };
//     // }

//     scene.add(plane);
    
// }

//Add Text using Text class
const message = new Text("Game Engine", {
    font: "40pt monospace",
    fill: "red",
    align: "center"
});
message.pos.x = w/2;
message.pos.y = h/2;
message.update = function(dt) {
    this.pos.x -= 100 * dt;
    if (this.pos.x < -420 ) {
        this.pos.x = w;
    }
}
//scene.add(message);


let dt = 0;
let last = 0;
const speed = 64;
let p1 = 0;
let p2 = 0;


let x = w / 2;
let y = h / 2;
let color = 10;

//ctx.globalAlpha = 0.02;

function loop(ms) {
    requestAnimationFrame(loop);

    //set time in seconds
    const t = ms/1000;

    //Game logic
    if (controls.action && t - lastShot > 0.15) {
        lastShot = t;
        fireBullet(plane.pos.x+45,plane.pos.y+20);

    }

    //Time elapsed since last frame
    dt = t - last;
    last = t;
    scene.update(dt, t);
    renderer.render(scene);
}

//Game is running
requestAnimationFrame(loop);