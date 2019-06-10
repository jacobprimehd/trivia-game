//cant wait for document to load to hide html
$(".questions").hide();
$(".scores").hide();

$(document).ready(function() {
  //Global variables!
  var time = 60;
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var unAnswered = 0;
  
  //Game Functions

  $("#start-button").on("click",startGame);

  function startGame() {
    $("#start-button").hide();
    $(".questions").show();
    $(".container").addClass(".containerLong")
    printQuestions();
    startTimer();
  }
  function startTimer() {
    $(".timer").text("Time remaining: " + time);
    setInterval(countdown,1000);
  }

  function countdown(){
    time--;
    $(".timer").text("Time remaining: " + time);
    if(time === 0){
      stopTime()
      $(".timer").empty();
    }
  }
  
  function stopTime(){
    clearInterval();
    checkAnswers();
  }

  function printQuestions(){
    for (let i = 0; i < qAndA.length; i++) {
      $(".questions").append("<div>" + "<h1>" + qAndA[i].question + "</h1>" + "</div>");
      var answerOne = qAndA[i].answers[0];
      var answerTwo = qAndA[i].answers[1];
      var answerThree = qAndA[i].answers[2];
      $(".questions").append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answerOne + '</label></div>')
      $(".questions").append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answerTwo + '</label></div>')
      $(".questions").append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answerThree + '</label></div>')
    }
    var button = '<button class="doneButton">Done</button>';
    $(".questions").append(button);
    $(".doneButton").on("click", stopTime);
  }

  function checkAnswers(){
    var correctAnswer;
    var userAnswer;
    //loop to check out answers + increment scores
    for (let i = 0; i < qAndA.length; i++) {
      correctAnswer = qAndA[i].correct;
      userAnswer =  $('input[id=radio'+i+']:checked + label').text();
      if(userAnswer === correctAnswer){
        correctAnswers++;
      } else if (userAnswer === ""){
        unAnswered++;
      } else if (userAnswer !== correctAnswer){
        incorrectAnswers++;
      } 
    }
    showEnd();
  }

  function showEnd(){
    $(".scores").show();
    $(".questions").empty();
    $(".timer").empty();
    $(".timer").hide();
    $("#correctAnswers").text("Correct answers: " + correctAnswers);
    $("#incorrectAnswers").text("Incorrect answers: " + incorrectAnswers);
    $("#unanswered").text("Skipped: " + unAnswered);

  }


  //Question and Answer object array
  var qAndA = [
    {
      question: "What is the capital of Washington?",
      answers: ["Olympia", "Tacoma", "Seattle"],
      correct: "Seattle"
    },

    {
      question: "What is the state of Washington's largest city?",
      answers: ["Seattle", "Spokane", "Tacoma"],
      correct: "Seattle"
    },
    {
      question: "How tall is Mt. Rainier?",
      answers: ["1 ft", "15,341 ft", "14,411 ft"],
      correct: "14,411 ft"
    },
    {
      question:
        "What mountain  is considered the most dangerous volcano in the Cascade Range?",
      answers: ["Squak", "Seattle", "Mount Rainier"],
      correct: "Mount Rainier"
    }
  ];

});
