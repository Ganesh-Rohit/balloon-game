let colors = ['yellow', 'red', 'blue','green', 'violet'];
let windowheight = window.innerHeight;
let windowwidth = window.innerWidth;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num=0;
let total= 100;
let currentBalloon=0;
let gameOver=false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-the-game');

function createBalloon() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];
    
    rand = Math.floor(Math.random() * (windowwidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);
    animateBalloon(div);
}

function animateBalloon(elem) {
    let pos=0;
    let random = Math.floor(Math.random()*6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(num/10) + random);
    function frame() {
        if(pos >= windowheight + 200 && document.querySelector('[data-number="'+elem.dataset.number+'"]')){
            clearInterval(interval);
            gameOver = true;
        }
        else{
            pos++;
            elem.style.top = windowheight - pos + 'px';
        }
    } 
}
function deleteBalloon(elem){
    elem.remove();
    num++;
    updateScore();
    playBallsound();
}
function updateScore(){
    for(let i=0;i<scores.length;i++)
    scores[i].textContent = num;
}
function playBallsound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}
function startGame(){
    restartGame();
    let timeOut=0;
    let loop = setInterval(function(){
        timeOut = Math.floor(Math.random()*600 - 100);
        if(num !== total && !gameOver){
            createBalloon();
        }
        else if(num !== total){
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display='block';
        }
        else if(num === total){
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display='block';
        }
    }, 800 + timeOut);
}
function restartGame(){
    let forRemoving = document.querySelectorAll('.balloon');
    for( let i=0;i<forRemoving.length;i++)
    {
        forRemoving[i].remove();
    }
    gameOver=false;
    num=0;
    updateScore();
}
document.addEventListener('click', function(event){
    if(event.target.classList.contains('balloon')){
        deleteBalloon(event.target);
    }
})

document.querySelector('.restart').addEventListener('click', function(){
    totalShadow.style.display = 'none';
    startGame();
})
document.querySelector('.Cancel').addEventListener('click', function(){
    totalShadow.style.display = 'none';
})
startBtn.addEventListener('click', function(){
    startGame();
    document.querySelector('.bgm').play();
    document.querySelector('.start-game-window').style.display = 'none';
})
 