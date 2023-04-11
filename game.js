let angle=0;
let ball=document.getElementById("ball");
let rectangle=document.getElementById("rectangle");
let colors=["red", "blue", "green", "yellow"];
let gameover=false;

ball.style.display="none";

window.addEventListener("keypress", (e)=>{
    if(e.keyCode===32){
        angle+=90;
        if(angle>=360){
            angle=0;
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
            ball.style.display="";
            createBall();
        }
    }, 2000);
}

function createBall(){
    let random=Math.floor(Math.random()*4);
    ball.src=`/images/${colors[random]}.png`;
}

//gameStart();