var canvas = document.getElementById("canvas")
var c = canvas.getContext("2d")

var frameRate = 30
var divisions = 400/8

var charactar = {
    x: 25,
    y: 12,
    dirrection: 0,
    trail: 1
}

function keyAssign(k){
    switch(k){
        case "ArrowUp":
            charactar.dirrection = 1
        break;
        case "ArrowRight":
            charactar.dirrection = 2
        break;
        case "ArrowDown":
            charactar.dirrection = 3
        break;
        case "ArrowLeft":
            charactar.dirrection = 4
        break;
    }
}

document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

    keyAssign(key)
})

var frameDelay = 1000/frameRate

function frame(){
    if()
}