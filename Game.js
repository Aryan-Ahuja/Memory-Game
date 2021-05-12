var buttonColors = ['red','yellow','green','blue'];
var started = false;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;


document.addEventListener('keypress',()=>{
if(started == false){
document.getElementById('level-title').innerText= `Level ${level}`;
nextSequence()
started = true
}
})

function nextSequence(){
userClickedPattern = [];
level++;
document.getElementById('level-title').innerText= `Level ${level}`;
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$('#'+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
}


document.querySelectorAll('.btn').forEach(function(btn){
btn.addEventListener('click',(event)=>{
var userChosenColor = event.target.getAttribute('id');
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1)
})
})

function playSound(name){
var audio = new Audio('sounds/' + name + '.mp3');
// console.log(audio);
audio.play();
}

function animatePress(currentColor){
document.querySelector("#"+ currentColor).classList.add('pressed');
setTimeout(function(){
    document.querySelector("#"+ currentColor).classList.remove('pressed');
},200)
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){

if(gamePattern.length == userClickedPattern.length){
setTimeout(function(){
nextSequence()
},1000)
}
}

else{
playSound('wrong');
document.querySelector('body').classList.add("game-over")
document.getElementById('level-title').innerText= `Game Over, Press any key to restart `;
setTimeout(function(){
    document.querySelector('body').classList.remove("game-over")
},200)
startOver();
}

}

function startOver(){
started = false;
gamePattern = [];
level = 0;
}

