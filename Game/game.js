var canvas = document.getElementById("canvas")
var c

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var h = canvas.height/100
var w = canvas.width/100

var character = {
    x : Math.floor(10*w),
    y: Math.floor(10*h),
    percentX: 50/w,
    percentY: 50/h,
    speed : 10,
    height : Math.floor(5*h),
    width : Math.floor(5*w),
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

var bounderies = [[0]]
var goalBounderies = [[0]]

var level0 = {
    map:[50,50,50,50],
    start:[10,10],
    goal:[50,0,50,50],
}

function drawMap(mapNum){
    levelVar = "level" + mapNum
    var currentList = eval(levelVar + ".map")
    drawList(currentList, "bounderies", "#000000")
    currentList = eval(levelVar + ".goal")
    drawList(currentList, "goalBounderies", "#4CAF50")
    currentList = eval(levelVar + ".start")
    character.x = Math.floor(currentList[0])
    character.y = Math.floor(currentList[1])
}

function draw(x, y, width, height ,color){
    c.fillStyle = color
    c.fillRect(x * w, y * h, width * w, height * h)
}

function drawList(lst, bounderyList, color){
    for(i=0; (lst.length/4)>i; i++){
        draw(lst[4 * i], lst[(4 * i) + 1], lst[(4 * i) + 2], lst[(4 * i) + 3], color)
        eval(bounderyList + "[i][(4 * i) + 0] = lst[4 * i] - character.width/w")
        eval(bounderyList + "[i][(4 * i) + 1] = lst[(4 * i) + 1] - character.height/h")
        eval(bounderyList + "[i][(4 * i) + 2] = lst[4 * i] +  lst[(4 * i) + 2]")
        eval(bounderyList + "[i][(4 * i) + 3] = lst[(4 * i) + 1] + lst[(4 * i) + 3]")
    }
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

function collisionDetection(listVar){
    if(listVar[0] <= character.percentX && listVar[1] <= character.percentY && character.percentX <= listVar[2] && character.percentY <= listVar[3]){
        return true
    }
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
    if(bounderies.every(collisionDetection)){
        collisionDetected()
    }
}

function keyAssign(keyarg){
    switch(keyarg){
        case "ArrowLeft":
            if(character.dirrection != 2){    
                character.dirrection = 0
            }
            break;
        case "ArrowUp":
            if(character.dirrection != 3){    
                character.dirrection = 1
            }
            break;
        case "ArrowRight":
            if(character.dirrection != 0){    
                character.dirrection = 2
            }
            break;
        case "ArrowDown":
            if(character.dirrection != 1){    
                character.dirrection = 3
            }
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
var numberOfaSongs = 3

function audioChange(){
    audioFileCount = ( audioFileCount + 1 ) % 3
    document.getElementById("song").src = "song" + audioFileCount + ".wav"
}