const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const scr = document.querySelector('.scoreNo');
const blockWidth = 100;
const blockheight = 20;
const boardWidth = 600;
const ballWidth = 20;
const boardHight = 300;
let xDirection = 2;
let yDirection = 2;
let score = 0;
let speed=30; 


const userStartPosition = [250,20];
let currentUserPosition = userStartPosition;


const ballStartPosition = [290,60];
let curretBallPosition = ballStartPosition;  


class Blocks{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis+blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis+blockheight];
        this.topRifgt =[xAxis+blockWidth,yAxis+blockheight];
    }
}

const blocks = [
    new Blocks(10, 270),
    new Blocks(120, 270),
    new Blocks(240, 270),
    new Blocks(360, 270),
    new Blocks(480, 270),

    new Blocks(10, 240),
    new Blocks(120, 240),
    new Blocks(240, 240),
    new Blocks(360, 240),
    new Blocks(480, 240),

    new Blocks(10, 210),
    new Blocks(120, 210),
    new Blocks(240, 210),
    new Blocks(360, 210),
    new Blocks(480, 210),
]


function addBlock(){
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }    
}
addBlock();


let user = document.createElement('div');
user.classList.add('user');
user.style.left = currentUserPosition[0] +'px';
user.style.bottom = currentUserPosition[1]+'px';
grid.appendChild(user);

function drawBall(){
    ball.style.left = curretBallPosition[0]+'px';
    ball.style.bottom = curretBallPosition[1]+ 'px';
}

let ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
ball.style.borderRadius = '10px';
grid.appendChild(ball);




// Move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            currentUserPosition[0] -= 10;
            if(currentUserPosition[0]>=0){
                user.style.left = currentUserPosition[0]+ 'px';
            }
            else{
                currentUserPosition[0]= 0;
            }
        break;

        case 'ArrowRight':
            currentUserPosition[0] +=10;
            if(currentUserPosition[0]<=500){
                user.style.left = currentUserPosition[0]+ 'px';
            }
            else{
                currentUserPosition[0] = 500;
            }
        break;
        
    }
}


document.addEventListener('keydown', moveUser);

// Move ball

function moveBall(){
    curretBallPosition[0] +=xDirection;
    curretBallPosition[1] +=yDirection;
    drawBall();
    CheckForCollision();
}
let timerID = setInterval(moveBall, 20);

// Check for Collison
function CheckForCollision(){

    for (let i = 0; i < blocks.length; i++) {
        if (
            (curretBallPosition[0] > blocks[i].bottomLeft[0] && curretBallPosition[0]<blocks[i].bottomRight[0])  && 
            ((curretBallPosition[1] + ballWidth )>blocks[i].bottomLeft[1] && curretBallPosition[1] <blocks[i].topLeft[1]))
            {
                let allBlocks = Array.from(document.querySelectorAll('.block'));
                // console.log(allBlocks);
                allBlocks[i].classList.remove('block');
                blocks.splice(i,1);
                changeDirection();
                score++;
                let winFactor = score;
                scr.innerHTML=score;
                speed--;
                // setInterval(moveBall,speed);

                if(blocks.length===0){
                    scoreDisplay.innerHTML = 'You Win!';
                    clearInterval(timerID);
                    document.removeEventListener('keydown', moveUser);
                }
            }
            
        
        }
        
        // Check for user Collision
        if(
            ( curretBallPosition[0] > currentUserPosition[0] && curretBallPosition[0] <(currentUserPosition[0]+blockWidth)) &&
            (curretBallPosition[1] > currentUserPosition[1]  &&  curretBallPosition[1] < (currentUserPosition[1]+blockheight))
            
            )
            {
                changeDirection();
            }
            
            // Check for Wall Colision
            if((curretBallPosition[0]>=(boardWidth - ballWidth)) || (curretBallPosition[0]<=(ballWidth))  ||(curretBallPosition[1]>=(boardHight-ballWidth))){
                changeDirection();
            }
            
            // condition for Game over
            
            if( (curretBallPosition[1]<=0)){
                scoreDisplay.innerHTML = "Game over";
                document.removeEventListener("keydown", moveUser);
                clearInterval(timerID);
            }
            
            // Condition For win 
            
        }
        
        

function changeDirection(){
    if (xDirection===2 && yDirection===2) {
        yDirection = -2;
        return;
    }

    if (xDirection===2 && yDirection===-2) {
        xDirection = -2;
        return;
    }

    if (xDirection===-2 && yDirection===-2) {
        yDirection = 2;
        return;
    }

    if (xDirection===-2 && yDirection===2) {
        xDirection = 2;
        return;
    }
}