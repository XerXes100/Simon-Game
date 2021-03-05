
var buttonColours = ['green', 'red', 'yellow', 'blue'];

var gameSequence = [];
var userSequence = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$('.btn').click(function () {
  var colourClicked = $(this).attr("id");
  userSequence.push(colourClicked);
  playSound(colourClicked);
  newSetTimeout(colourClicked);
  checkSequence(userSequence.length-1);
});

function nextSequence () {
  userSequence = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gameSequence.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(100);
  playSound(randomChosenColour);
}

function checkSequence (currentLevel) {
  console.log('userSequence: '+userSequence);
  console.log('gameSequence: '+gameSequence);
  if (gameSequence[currentLevel] === userSequence[currentLevel]) {
    console.log(gameSequence[currentLevel]);
    console.log(userSequence[currentLevel]);
    if (userSequence.length === gameSequence.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function newSetTimeout (currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout (
    function() {
      $("#" + currentColor).removeClass("pressed");
    },
    100
  )
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
