
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghost");


let createRect = (x,y,width,height,color) =>{
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);
};
let fps = 30;
let oneBlockSize = 20;
let wallColor = "#342DCA";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInerColor = 'black';
let foodColor = "#feb897";
let score = 0;
let ghost =[];

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTON = 1;

let map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1 ],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1 ],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1 ],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1 ],
    [1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1 ],
    [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1 ],
    [1,1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1,1 ],
    [0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0 ],
    [1,1,1,1,1,2,1,2,1,1,2,1,1,2,1,2,1,1,1,1,1 ],
    [1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1 ],//aca
    [1,1,1,1,1,2,1,2,1,2,2,2,2,2,1,2,1,1,1,1,1 ],
    [0,0,0,0,1,2,1,2,1,1,1,1,1,2,1,2,1,0,0,0,0 ],
    [0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0 ],
    [1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,1,1,1 ],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1 ],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1 ],
    [1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1 ],
    [1,1,2,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,2,1,1 ],
    [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1 ],
    [1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1 ],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1 ],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],

];

let gameLoop =()=>{
    update();
    draw();
};

let update = ()=>{
    
    pacman.moveProcess()
    pacman.eat()
};

let drawFoods = ()=>{
    for (let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++){
            if(map[i][j] == 2){
                createRect(
                    j *  oneBlockSize + oneBlockSize / 3,
                    i *  oneBlockSize + oneBlockSize / 3,
                    oneBlockSize /3,
                    oneBlockSize / 3,
                    foodColor
                )
            }
        }
        
    }
}

let drawScore = () => {
    canvasContext.font = '20px Emulogic';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Score: '+score,0, oneBlockSize * (map.length + 1)+10);
}

let draw = () =>{
    createRect(0,0, canvas.width, canvas.height, "black" )
    drawWalls()
    drawFoods()
    pacman.draw()
    drawScore()
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

let drawWalls = ()=>{
    for(let i = 0 ; i < map.length; i++){
        for(let j = 0 ; j < map[0].length; j++){
            if(map[i][j] == 1){
                createRect(
                     j * oneBlockSize,
                     i * oneBlockSize ,
                      oneBlockSize,
                      oneBlockSize,
                      wallColor)
            };
            if(j>0 && map[i][j - 1] == 1){
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize + wallOffset,
                    wallSpaceWidth + wallOffset,
                    wallSpaceWidth,
                    wallInerColor
                    )
            }
            if(j < map[0].length -1 && map[i][j +1] == 1 ){
                createRect(
                    j * oneBlockSize + wallOffset ,
                    i * oneBlockSize + wallOffset,
                    wallSpaceWidth + wallOffset,
                    wallSpaceWidth,
                    wallInerColor
                    )
            }//aca
            if(i>0 && map[i -1][j] == 1){
                createRect(
                    j * oneBlockSize + wallOffset,
                    i * oneBlockSize,
                    wallSpaceWidth,
                    wallSpaceWidth + wallOffset ,
                    wallInerColor
                    )
            }
            if(i < map.length -1 && map[i + 1][j] == 1 ){
                createRect(
                    j * oneBlockSize + wallOffset ,
                    i * oneBlockSize + wallOffset,
                    wallSpaceWidth ,
                    wallSpaceWidth + wallOffset ,
                    wallInerColor
                    )
            }
        }
    }
}

let createNewPacman = () =>{
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize/5
    )
}
let createGhosts = ()=>{
    for(let i = 0; i < 1; i++){
        let newGhost = new Ghost(
           9* oneBlockSize + (i %2 == 0 ? 0 : 1) * oneBlockSize ,
           
        )
    }
}

createNewPacman();
gameLoop();

window.addEventListener('keydown',(event)=>{
    let k = event.keyCode;
    setTimeout(()=>{
        if(k==37 || k == 65){
            //left
            pacman.nextDirection = DIRECTION_LEFT
        }else if(k==38 || k == 87){
            //up
            pacman.nextDirection = DIRECTION_UP
        }else if(k==39 || k == 68){
            //right
            pacman.nextDirection = DIRECTION_RIGHT
        }else if(k==40 || k == 83){
            //bottom
            pacman.nextDirection = DIRECTION_BOTTON
        }
    })
})

