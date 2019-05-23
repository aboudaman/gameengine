import KeyControls from "../resources/lib/KeyConytrols"


//Game setup code
const canvas = document.querySelector("#game canvas");
const ctx = canvas.getContext("2d");
const { width: w, height: h } = canvas;
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

    //Game logic
    ctx.save();

    x += controls.x;
    y += controls.y;

    if (!controls.action) {
        color += 10;
        if (color > 360) {
            color -= 360;
        }
    }

    //Draw Rectangle
    ctx.fillStyle = `hsl(${color}, 50%,50%)`;
    ctx.fillRect(x,y,50,50);




    ctx.restore();
}

//Game is running
requestAnimationFrame(loop);