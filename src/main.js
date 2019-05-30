import gamedep from "./indexMaster"

const {Container, KeyControls, Text, CanvasRenderer} = gamedep;

//Game setup code
const w = 640;
const h = 480;
const renderer = new CanvasRenderer(w,h);
document.querySelector("#game").appendChild(renderer.view);


//Game Objects
const scene = new Container();

//Add Text using Text class
const message = new Text("Gae Engine", {
    font: "40pt monospace",
    fill: "red",
    align: "center"
});
message.pos.x = w/2;
message.pos.y = h/2;
message.update = function(dt) {
    this.pos.x -= 100 *dt;
    if (this.pos.x < -420 ) {
        this.pos.x = w;
    }
}
scene.add(message);


let dt = 0;
let last = 0;
const speed = 64;
let p1 = 0;
let p2 = 0;
const controls = new KeyControls();

let x = w / 2;
let y = h / 2;
let color = 10;

//ctx.globalAlpha = 0.02;

function loop(ms) {
    requestAnimationFrame(loop);

    //set time in seconds
    const t = ms/1000;

    //Time elapsed since last frame
    dt = t - last;
    last = t;
    scene.update(dt, t);
    renderer.render(scene);
}

//Game is running
requestAnimationFrame(loop);