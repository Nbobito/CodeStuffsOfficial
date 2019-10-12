var canvas = document.getElementById("canvas")
var c

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var h = canvas.height/100
var w = canvas.width/100

var character = {
    x : 10*w,
    y:10*h,
    percentX: 50/w,
    percentY: 50/h,
    speed : 10,
    height : 5*h,
    width : 5*w,
    dirrection : null,
    color : "#FFFFFF"
}

var currentLevel = 0
var levelVar = null

var frameRate = 1/30 //30 frames per second
var frameDelay = frameRate*1000//convert to milliseconds
var frameInterval = null

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var rightBounderies = [0]
var leftBounderies = [0]
var upBounderies = [0]
var downBounderies = [0]
var bounderiesLength = 0

var level0 = {
    map:[50,50,50,50],
    start:[10,10],
    goal:[50,0,50,50],
}

function drawMap(mapNum){
    levelVar = eval("level"+mapNum)
    character.x = levelVar.start[0] * w
    character.y = levelVar.start[0] * h
    draw(levelVar.goal[0],levelVar.goal[1],levelVar.goal[2],levelVar.goal[3],"#137826")
    for(i=0; (levelVar.map.length/4)>i; i++){
        draw(levelVar.map[4 * i], levelVar.map[(4 * i) + 1], levelVar.map[(4 * i) + 2], levelVar.map[(4 * i) + 3], "#000000")
        leftBounderies[i] = levelVar.map[4 * i] - character.width/w
        upBounderies[i] = levelVar.map[(4 * i) + 1] - character.height/h
        rightBounderies[i] = levelVar.map[4 * i] +  levelVar.map[(4 * i) + 2]
        downBounderies[i] = levelVar.map[(4 * i) + 1] + levelVar.map[(4 * i) + 3]
    }
    bounderiesLength = (levelVar.map.length/4)
}

function draw(x, y, width, height ,color){
    c.fillStyle = color
    c.fillRect(x * w, y * h, width * w, height * h)
}

function percentToPixels(){
    character.percentX = character.x / w
    character.percentY = character.y / h
}

function characterDraw(x,y){
    c.fillStyle = "#878377"
    c.fillRect(character.x, character.y, character.width, character.height)
    c.fillStyle = character.color
    c.fillRect(x, y, character.width, character.height)
    character.x = x
    character.y = y
}

function collideLeft(pos){
    return character.percentX >= pos
}

function collideRight(pos){
    return character.percentX <= pos
}

function collideUp(pos){
    return character.percentY >= pos
}

function collideDown(pos){
    return character.percentY <= pos
}

function collisionDetected(){
    c.fillStyle = "#878377"
    c.fillRect(character.x, character.y, character.width, character.height)
    drawMap(currentLevel)
}

function drawFrame(){
    percentToPixels()
    switch(character.dirrection){
        case 0:
            characterDraw(character.x - character.speed, character.y)
            break;
        case 1:
            characterDraw(character.x, character.y - character.speed)
            break;
        case 2:
            characterDraw(character.x + character.speed, character.y)
            break;
        case 3:
            characterDraw(character.x, character.y + character.speed)
            break;
    }
    for(k=0;k<=bounderiesLength;k++){
        if(leftBounderies.every(collideLeft) && rightBounderies.every(collideRight) && upBounderies.every(collideUp) && downBounderies.every(collideDown)){
            collisionDetected()
        }
    }
}

function keyAssign(keyarg){
    switch(keyarg){
        case "ArrowLeft":
            character.dirrection = 0
            break;
        case "ArrowUp":
            character.dirrection = 1
            break;
        case "ArrowRight":
            character.dirrection = 2
            break;
        case "ArrowDown":
            character.dirrection = 3
            break;
        default:
            return 0
    }

}

var isClicked = 0

document.onclick = function () {
    if(isClicked == 0){
        c = canvas.getContext("2d")
        document.getElementById("play").style.visibility = "hidden"
        document.getElementById("song").play()
        isClicked = 1

        sleep(6800).then(() => {

            
            c.fillStyle = "#878377"
            c.fillRect(0,0,w * 100,h * 100)

            frameInterval = setInterval(drawFrame ,frameDelay)

            document.addEventListener('keydown', function (event) {
                if (event.defaultPrevented) {
                    return;
                }
        
                var key = event.key || event.keyCode;

                keyAssign(key)
            });
        })
    }
}

var audioFileCount = 0

function audioChange(){
    audioFileCount = ( audioFileCount + 1 ) % 2
    document.getElementById("song").src = "song" + audioFileCount + ".wav"
}