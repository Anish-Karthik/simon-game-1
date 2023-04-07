var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;

// start
var hasStarted = false;
$(document).keypress(function () {
    if(hasStarted) return;
    hasStarted = true;
    nextSequence();
})

// user click
$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// next color generator
function nextSequence() {
    $("#level-title").text("Level " + level);
    level++;
    // resets userClickedPattern so user needs to click the color from start in same order
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    flash("#"+randomChosenColour);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    // to check each level matches or not whenever user clicks
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // to check sequence is completed
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else gameOver();
    
}

function gameOver() {
    gamePattern = [];
    userClickedPattern =[];
    $("h1").text("Game Over, Press Any Key to Restart");
    hasStarted = false;
    level = 0;
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200);
}

// utilities
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function flash(element) {
    $(element).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
    var element = $("#"+currentColour);
    element.addClass("pressed");
    setTimeout(function () {
        element.removeClass("pressed");
    },100);
}




// alert("hi");
// var hasStarted = false;
// $(document).keypress(function () {
//     if(!hasStarted) {
//         gamePattern = [];
//         nextSequence();
//         hasStarted = true;
//         console.log(hasStarted);
//         startGame();
//         hasStarted = false;
//         console.log(hasStarted);
//     }
// });
// // game
// function startGame(){
//     var level = 1;
//     console.log(hasStarted);
//     alert(hasStarted);
//     while(hasStarted) {
//         alert(level);
//         var tmp = "Level "+level;
//         $("h1").text(tmp);
//         hasStarted = checkAnswer();
//         nextSequence();
//         userClickedPattern = [];
//         level++;
//     }
//     $("h1").text("Game Over, Press Any Key to Restart");
// }




