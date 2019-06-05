import gamedep from "./indexMaster"
import Player from "../resources/lib/Player";

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
let lastBaddie = 0;
let baddieSpeed = 1.0;
let scoreAmount = 0;
let gameOver = false;
// const planeTexture = new Texture("../resources/images/fly.png", {width:"10px", height:"10px"});

// ## Setup Textures required for the game ##
const textures = {
    plane: new Texture("../resources/images/fly50.png"),
    background: new Texture("../resources/images/BGcanvas.png"),
    bullet: new Texture("../resources/images/bulletw.png"),
    baddie: new Texture("../resources/images/alien.png"),
    explosion: new Texture("../resources/images/explosion.png")
}
//Add another Player
const player = new Player();

// Add baddies
const baddies = new Container();

//Add function to show explosion
function explosion(x,y) {
    const explosion = new Sprite(textures.explosion);
    explosion.pos.x = x;
    explosion.pos.y = y;
    scene.add(explosion);

    setTimeout(function() {
        explosion.dead = true;
    }, 350);

}

function baddie(x, y, speed) {
    const baddie = new Sprite(textures.baddie, 60, 60);
    baddie.pos.x = x;
    baddie.pos.y = y;
    baddie.update = function(dt) {
        this.pos.x += dt * speed;
    };

    baddies.add(baddie);

}

// Add bullets to a container - several bullets
const bullets = new Container();

// Function to fire bullets
function fireBullet(x,y) {
    const bullet = new Sprite(textures.bullet, 25,25);
    bullet.pos.x = x;
    bullet.pos.y = y;
    bullet.update = function(dt,t) {
        this.pos.x += dt * 400;
    };
    bullets.add(bullet);
}

// ## Set u the plane
const plane = new Sprite(textures.plane, 50, 50);
plane.pos.x = 10;
plane.pos.y = h / 2 - 180;

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

//Add Score to the Game
const score = new Text("Score", {
    font: "40px sans-serif",
    fill: "#8B8994",
    align: "center"
});

score.pos.x = 110;
score.pos.y = 40;

// Add the background and the plane to the screen
scene.add(background);
scene.add(plane);
scene.add(bullets);
scene.add(baddies);
scene.add(score);
//scene.add(player);

let dt = 0;
let last = 0;
//const speed = 64;
let p1 = 0;
let p2 = 0;

let x = w / 2;
let y = h / 2;
let color = 10;

//Check Bounding Collision
function collisionDetection(entity1, entity2) {
    if (
    entity1.pos.x+entity1.w >= entity2.pos.x &&
    entity1.pos.x <= entity2.pos.x+entity2.w &&
    entity1.pos.y + entity1.h >= entity2.pos.y &&
    entity1.pos.y <= entity2.pos.y + entity2.h
    ) {
        return true;
    }
    return false;

}

//ctx.globalAlpha = 0.02;

function loop(ms) {
    requestAnimationFrame(loop);

    //set time in seconds
    const t = ms/1000;

    //Game logic
    score.text = `Score: ${scoreAmount} `;

    //Check for collision between bullets and baddies and check if bullets goes out of screen
    // ## Using Bounding Box ##

    baddies.children.forEach(baddie => {
        if (collisionDetection(baddie, plane)) {
            scoreAmount -= 5;
            baddie.dead = true;
            explosion(baddie.pos.x, baddie.pos.y);
            //baddie.dead = true;
            
            console.log("Shield compromised");
        }
        bullets.children.forEach(bullet => {
            // if (bullet = null) return;
            //Check distance between baddie and bullet
            if (collisionDetection(bullet,baddie)) {
                    scoreAmount += 1;
                    baddie.dead = true;
                    explosion(baddie.pos.x, baddie.pos.y);

                }
        })
    })

    if (controls.action && t - lastShot > 0.15) {
        lastShot = t;
        fireBullet(plane.pos.x + 45,plane.pos.y + 20);
    }

    // Draw the baddies
    if (t - lastBaddie > baddieSpeed) {
        lastBaddie = t;
        const speed = -50 * (Math.random() * 5)
        const position = Math.random() * (h-55);
        baddie(w, position,speed);
        baddieSpeed = baddieSpeed < 0.05 ? 0.06 : baddieSpeed * 0.95;
    }


    //Time elapsed since last frame
    dt = t - last;
    last = t;
    scene.update(dt, t);
    renderer.render(scene);
}

//Game is running
requestAnimationFrame(loop);