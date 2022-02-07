let buttonColors = ["red", "blue","green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// Helper function to generate next sequence
function nextSequence(){
  level++;
    $("h1").text("Level " + level);
    var rand = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[rand];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(gamePattern);
};

// Helper function to check buttons clicked by user
function clickedButtons(buttonId){
  userClickedPattern.push(buttonId);
  playSound(buttonId);
  animatePress(buttonId);
//  console.log(userClickedPattern);
};


// To play sound
function playSound(buttonId){
  var audio = new Audio("sounds/" + buttonId + ".mp3");
  audio.play();
}

// To animate buttons pressed by user
function animatePress(buttonId){
    $("#" + buttonId).addClass("pressed");
  setTimeout(function(){
    $("#" + buttonId).removeClass("pressed");
  },100);
}

// Start game  when key is pressed
$(document).keypress(function(){
  if(level == 0){
    nextSequence();
  }
});

// store the button clicks by the user
$(".btn").click(function(){
  clickedButtons(this.id);
  checkAnswer(this.id);

});
// Restart the game
function startOver(){
  counter = 0;
  gamePattern.length = 0;
  level = 0;
}
// To check the user sequence against the current level sequence
let counter = 0;
function checkAnswer(currentClick){
  console.log(currentClick);
  if(currentClick == gamePattern[counter]){
    counter++;
    if(counter == gamePattern.length){
//      $("h1").text("Level Won");
      setTimeout(function(){
        counter = 0;
        nextSequence();
      }, 600);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
     $("body").addClass("game-over");
     $("h1").text("Game over, press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 400);
    startOver();
  }
}
