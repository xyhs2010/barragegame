/**
 * Created by xyhs on 16/3/13.
 */
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 640;
document.body.appendChild(canvas);

// create aircraft
var Aircraft = function () {
    var object = new Image();
    object.src = "./image/aircraft.png";
    object.speed = 156;
    object.ready = false;
    object.onload = function () {
        object.ready = true;
        object.posX = (canvas.width - object.width) / 2;
        object.posY = (canvas.height - object.height);
    };
    return object;
};
var aircraft = new Aircraft();

// listen for keydown event
var keysDown = null;
var index = 0;

addEventListener("keydown", function (e) {
    keysDown = e.keyCode;
}, false);

addEventListener("keyup", function (e) {
    if (e.keyCode == keysDown) {
        keysDown = null;
    }
}, false);

var update = function (modifier) {
    if (keysDown == null) {
        return;
    }
    switch (keysDown) {
        case 37:
            aircraft.posX -= aircraft.speed * modifier;
            break;

        case 39:
            aircraft.posX += aircraft.speed * modifier;
            break;

        case 38:
            aircraft.posY -= aircraft.speed * modifier;
            break;

        case 40:
            aircraft.posY += aircraft.speed * modifier;
            break;

        default:
            break;
    }

    if (aircraft.posX < 0) {
        aircraft.posX = 0;
    } else if (aircraft.posX > canvas.width - aircraft.width) {
        aircraft.posX = canvas.width - aircraft.width;
    }
    if (aircraft.posY < 0) {
        aircraft.posY = 0;
    } else if (aircraft.posY > canvas.height - aircraft.height) {
        aircraft.posY = canvas.height - aircraft.height;
    }
}

// render
var render = function () {
    ctx.fillStyle = "rgb(191, 191, 223)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (aircraft.ready) {
        ctx.drawImage(aircraft, aircraft.posX, aircraft.posY);
    }
};

// main loop
var main = function () {
    var now = Date.now();
    var modifier = now - then;

    update(modifier / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
main();
