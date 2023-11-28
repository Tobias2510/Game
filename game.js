let angle=0;
let ball=document.getElementById("ball");
let rectangle=document.getElementById("rectangle");
let scoreDiv=document.getElementById("score");
let highscoreDiv=document.getElementById("highscore");
let colors=["red", "blue", "green", "yellow"];
let gameover=false;
let colorfield=0;
let animationtime=2000;
let random;
let score=0;
let dropnum=1;
let difficulty=0;
let highscore=localStorage.getItem("highscore") || 0;

ball.style.opacity="0";
highscoreDiv.innerHTML=highscore;
document.getElementsByClassName("gameOver")[0].style.display="none";


window.addEventListener("keypress", (e)=>{
    if(e.keyCode===32){
        angle+=90;
        colorfield++;
        if(angle>=360){
            angle=0;
            colorfield=0;
        }
        rectangle.style.transform=`rotate(${angle}deg)`;
    }
});

function gameStart(){
    let tick=setInterval(()=>{
        if(gameover){
            clearInterval(tick);
        }
        else{
            if(score>10 && difficulty===0){
                dropnum++;
                animationtime=1500;
                difficulty++;
                clearInterval(tick);
                gameStart();
            }
            if(score>20 && difficulty===1){
                dropnum++;
                animationtime=1000;
                difficulty++;
                clearInterval(tick);
                gameStart();
            }
            random=Math.floor(Math.random()*4);
            ball.style.opacity="1";
            createBall(random);
            setTimeout(checkGameOver, animationtime-100);
        }
    }, animationtime);
}

function checkGameOver(){
    if(colorfield!==random){
        gameover=true;
        document.getElementsByClassName("gameOver")[0].style.display="";
        if(score>highscore){
            highscore=score;
            localStorage.setItem("highscore", highscore);
        }
    }
    else{
        score++;
        scoreDiv.innerHTML=score;
    }
}

function createBall(random){
    ball.src=`./images/${colors[random]}.png`;
    ball.classList.add(`drop${dropnum}`);
    setTimeout(()=>{
        ball.classList.remove(`drop${dropnum}`);
    }, animationtime-100);
}

function reload(){
    location.reload();
}

function reset(){
    localStorage.clear();
    location.reload();
}

gameStart();