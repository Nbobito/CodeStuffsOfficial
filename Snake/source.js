var canvas = document.getElementById("canvas")
var c = canvas.getContext("2d")

var title = document.getElementById("title")
var score = document.getElementById("score")

var board = document.getElementById("board")
var speed = document.getElementById("speed")

var frameOption=speed.value

var frameRate = 1000/frameOption
var interval = setInterval(frame, frameRate)
var numOfDivisions = board.value
var divisions = 400/numOfDivisions

function gameOver(){
    charactar = {
        x: 2,
        y: 4,
        dirrection: 0,
        trail: 0,
        traily: [],
        trailx: [],
        color: "#88ff4d",
        points: 0
    }
    a.x = 6
    a.y = 4
}

function keyAssign(k){
    switch(k){
        case "ArrowUp":
            if(charactar.dirrection!=3){
                charactar.dirrection = 1
            }
        break;
        case "ArrowRight":
            if(charactar.dirrection!=4){
                charactar.dirrection = 2
            }
        break;
        case "ArrowDown":
            if(charactar.dirrection!=1){
                    charactar.dirrection = 3
            }
        break;
        case "ArrowLeft":
            if(charactar.dirrection!=2){
                charactar.dirrection = 4
            }
        break;
        case "Enter":
            board = document.getElementById("board")
            speed = document.getElementById("speed")
            clearInterval(interval)
            frameOption=speed.value
            frameRate = 1000/frameOption
            numOfDivisions = board.value
            interval = setInterval(frame, frameRate)
            divisions = 400/numOfDivisions
        break;
        default:
            return
    }
}

class apple {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.color = "#cc0000"
    }
    eat(){
        charactar.points += 1
        charactar.trail +=1
        c.fillStyle = "#000000"
        c.fillRect(this.x * divisions, this.y * divisions, divisions, divisions)
        this.x = Math.floor(Math.random()*(numOfDivisions))
        this.y = Math.floor(Math.random()*(numOfDivisions))
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.x * divisions, this.y * divisions, divisions, divisions)
    }
}

document.addEventListener('keydown', function (event) {

    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

    keyAssign(key)
})

var charactar = {
    x: 2,
    y: 4,
    dirrection: 0,
    trail: 0,
    traily: [],
    trailx: [],
    color: "#88ff4d",
    points: 0
}

var a = new apple(6,4)

function frame(){
    c.fillStyle = "#000000"
    c.fillRect(0,0,400,400)
    for(i=0;i<charactar.trail;i++){
        if((i+1)<charactar.trail){
            charactar.trailx[i] = charactar.trailx[i+1]
            charactar.traily[i] = charactar.traily[i+1]
        }
        else{
            charactar.trailx[i] = charactar.x
            charactar.traily[i] = charactar.y
        }
        c.fillStyle = charactar.color
        c.fillRect(divisions*charactar.trailx[i], divisions*charactar.traily[i],divisions,divisions)
    }
    switch(charactar.dirrection){
        case 1:
            charactar.y = charactar.y -1
            if(charactar.y < 0){
                charactar.y = numOfDivisions
            }
        break;
        case 2:
            charactar.x = charactar.x +1
            if(charactar.x > numOfDivisions){
                charactar.x = 0
            }
        break;
        case 3:
            charactar.y = charactar.y +1
            if(charactar.y > numOfDivisions){
                charactar.y = 0
            }
        break;
        case 4:
            charactar.x = charactar.x -1
            if(charactar.x < 0){
                charactar.x = numOfDivisions
            }
        break;
        default:
            return 0 
    }
    c.fillStyle = charactar.color
    c.fillRect(divisions*charactar.x, divisions*charactar.y,divisions,divisions)
    for(i=0;i<charactar.trail;i++){
        if(charactar.x == charactar.trailx[i] && charactar.y == charactar.traily[i]){
            gameOver()
        }
    }
    if(charactar.x == a.x && charactar.y == a.y){
        a.eat()
    }
    a.draw()
    title.innerText = "Score: "+charactar.points
    score.innerText = charactar.points
}