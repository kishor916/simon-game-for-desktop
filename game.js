var buttonColors = ["red", "blue", "green", "yellow"]; //colors of the buttons

//user and computer generated patters.
var gamePattern = [];
var userClickedPattern = [];

//this code is to start the game.
var started = false;
var level = 0;

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



//generate an user clicked patterns
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


//generate an computer generated color patterns
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //flash the button
  playSound(randomChosenColor);

}




//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//this function is for the animation of user click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to check the user color patters every vtime they chose the color.
function checkAnswer(lastcolor) {
  if (gamePattern[lastcolor] === userClickedPattern[lastcolor]) {
    console.log("sucess");
    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }
  else {
    console.log("wrong");
      playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 4000);
    $("h1").text("Game Over, Game will be automatically reloded");
    $(document).click(function (){
      setTimeout(function() {
        location.reload();
      }, 4000);

  });
}



}
