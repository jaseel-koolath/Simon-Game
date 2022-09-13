const buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text("Level " + level);
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$('body').keypress(function() {
    $('.para').hide();
    if(!started){
        nextSequence();
        started = true;
    }
        
})

$('#OK').click(function() {
    $('.para').hide();
    if(!started){
        nextSequence();
        started = true;
    }    
})



$('.btn').click(function() {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern.length);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(sound_color) {
    var sound = new Audio("sounds/" + sound_color+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else gameOver();
}

function gameOver(){
    $('body').addClass("game-over");
    setTimeout(function() {
        $('body').removeClass("game-over");
    }, 200);
    sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $('#level-title').text("Game Over, Press any Key or start button to restart");
    startOver();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
