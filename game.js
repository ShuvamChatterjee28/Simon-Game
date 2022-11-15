let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let firstTime = false;
let level = 1; let idx = 0;

$("body").on("keydown", function(){
    if(firstTime === false) { firstTime = true; userClickedPattern = []; nextSequence(); }
});

$(".btn").on("click", function(event){
    let userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    $("."+userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(idx++);
    console.log(idx);
});

function startOver(){
    idx = 0;
    level = 1;
    gamePattern = [];
    //
    firstTime = false;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("Success");
    }
    else{
        //console.log("wrong");
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 500);
        userClickedPattern = [];
        idx = 0;
    }
}

function nextSequence(){
    $("#level-title").text("Level "+level);
    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // Select the button and show to the user
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}