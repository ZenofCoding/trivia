
var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Left <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Focuses on increasing knowledge",
  answers: ["Hedonism", "Platonism", "Stoicism", "Cynicism"],
  correctAnswer: "Platonism",
  image:"assets/images/Platonism.png"
}, {
  question: "Focuses on being logical and not to suffer.",
  answers: ["Platonism", "Aristotelianism", "Nihilism", "Stoicism"],
  correctAnswer: "Stoicism", 
  image:"assets/images/Stoicism.png"
}, {
  question: "Focuses on having pleasure now.",
  answers: ["Hedonism", "Nihilism", "Epicureanism", "Pragmatism"],
  correctAnswer: "Hedonism",
  image:"assets/images/Hedonism.png"
}, {
  question: 'Focuses on bring the most good to humans',
  answers: ["Nihilism", "Epicureanism", "Pragmatism", "Hedonism"],
  correctAnswer: "Pragmatism",
  image:"assets/images/Pragmatism.png"
}, {
  question: 'Focuses on doing anything.(Life has no meaning)',
  answers: ["Pragmatism", "Nihilism", "Hedonism", "Aristotelianism"],
  correctAnswer: "Nihilism",
  image:"assets/images/Nihilism.png"
}, {
  question: 'Focuses on individual liberties.',
  answers: ["Hedonism", "Epicureanism", "Aristotelianism", "Liberalism"],
  correctAnswer: "Liberalism",
  image:"assets/images/Liberalism.png"
}, {
  question: "Focuses on freeing yourself from pain",
  answers: ["Epicureanism", "Hedonism", "Nihilism", "Platonism"],
  correctAnswer: "Epicureanism",
  image:"assets/images/Epicureanism.png"
}, {
  question: "Focuses on being self-sufficient",
  answers: ["Aristotelianism", "Hedonism", "Cynicism", "Platonism"],
  correctAnswer: "Cynicism",
  image:"assets/images/Cynicism.png"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Finished! Here\'s how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
