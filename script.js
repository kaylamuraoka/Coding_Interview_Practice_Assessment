// global variables
var remainingSeconds = 60;
var currentQuestionIndex = 0;
var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var questionsRemainingCount = 10;
var timer;

var navigationDivEl = document.querySelector("#stats");
var timerLabelEl = document.querySelector("#timerLabel");
var timerCountSpanEl = document.querySelector("#timerCount");
var linkToLeaderboardBtnEl = document.querySelector("#viewLeaderboardBtn");
var correctCountSpanEl = document.querySelector("#correctCount");
var wrongCountSpanEl = document.querySelector("#wrongCount");
var questionsRemainingCountSpanEl = document.querySelector(
  "#questionsRemainingCount"
);
var mainDivEl = document.querySelector("#main");

// This object stores the details the questions for the quiz.
var questionsObject = [
  // Question 1
  {
    question: "What does HTML stand for?",
    choices: [
      "Hey Too Much Layout.",
      "Hey That's My Lunch",
      "Hyper Text Markup Language",
      "Home Tool Makeshit Ladder",
    ],
    answer: 3,
  },
  // Question 2
  {
    question: "What does CSS stand for?",
    choices: [
      "Chicken Salad Sandwich",
      "Cascading Style Sheets",
      "Cool Street Style",
      "Computer Style Sheets",
    ],
    answer: 2,
  },
  // Question 3
  {
    question: "Who is responsible for making the Web standards?",
    choices: ["The World Wide Web Consortium", "IBM", "Microsofe", "Apple"],
    answer: 1,
  },
  // Question 4
  {
    question: "What is the correct HTML element for the largest heading?",
    choices: ["<large>", "<head>", "<jumbo>", "<h1>"],
    answer: 4,
  },
  // Question 5
  {
    question:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    choices: [
      "In the <head> section",
      "In the <body> section",
      "You should NEVER refernce extenal stylesheets in an HTML document",
      "At the end of the document",
    ],
    answer: 1,
  },
  // Question 6
  {
    question: "The Bootstrap grid system is based on how many columns?",
    choices: ["6", "8", "10", "12"],
    answer: 4,
  },
  // Question 7
  {
    question:
      "What is the correct syntax for referring to an external JavaScript file?",
    choices: [
      '<script src="script.js">',
      '<script source="script.js">',
      '<script type="script.js">',
      '<script ref="script.js">',
    ],
    answer: 1,
  },
  // Question 8
  {
    question: "What scripting language is jQuery written in?",
    choices: ["C++", "PHP", "JavaScript", "Python"],
    answer: 3,
  },
  // Question 9
  {
    question: "What does this comparison operator mean: !=",
    choices: ["not equal", "equal to", "greater than or equal to", "less than"],
    answer: 1,
  },
  // Question 10
  {
    question: "How is document type initialized in HTML5?",
    choices: ["<!DOCTYPE HTML>", "<HTML>", "</DOCTYPE>", "</DOCTYPE html>"],
    answer: 1,
  },
];

// Call function to load elements on the instructions or first page
window.onload = displayQuizInstructions();

function displayQuizInstructions() {
  // add elements to the html document and set its attributes
  var quizTitleEl = document.createElement("h1");
  var quizDirectionsEl = document.createElement("h5");
  var quizStartBtnEl = document.createElement("button");

  quizTitleEl.textContent = "Coding Interview Practice Assessment";
  quizDirectionsEl.textContent =
    "Try your best to answer the following code-related questions within the 60 second time limit. Remember to keep in mind that incorrect answers will penalize your remaining time by ten seconds";
  quizStartBtnEl.textContent = "Start Quiz";

  mainDivEl.appendChild(quizTitleEl);
  mainDivEl.appendChild(quizDirectionsEl);
  mainDivEl.appendChild(quizStartBtnEl);

  timerCountSpanEl.textContent = remainingSeconds + " seconds";
  correctCountSpanEl.textContent = correctAnswersCount;
  wrongCountSpanEl.textContent = wrongAnswersCount;
  questionsRemainingCountSpanEl.textContent = questionsRemainingCount;

  // add styling conventions
  quizStartBtnEl.addEventListener("click", startQuiz);
  linkToLeaderboardBtnEl.addEventListener("click", displayHighscores);
}

// user clicks start button to call this function
function startQuiz() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);
  var timer = setInterval(function () {
    remainingSeconds--;
    // show updated time
    timerCountSpanEl.textContent = remainingSeconds + " seconds";
    // tick down every second
    if (
      remainingSeconds > 0 &&
      currentQuestionIndex === questionsObject.length
    ) {
      // stop the timer
      clearInterval(timer);
      endQuiz();
      goodJobMessage();
    }
    if (remainingSeconds <= 0) {
      clearInterval(timer);
      endQuiz();
      outOfTimeMessage();
    }
  }, 1000);

  getQuestions();
}

// Create elements for the quiz contents outside of the createQuizElements() function so that the variables can be refrenced in other functions
var questionLabelEl = document.createElement("h3");
var questionTextEl = document.createElement("h1");
var listEl = document.createElement("ul");
var answerEl = document.createElement("div");
var answerImgEl = document.createElement("img");
var answerTextEl = document.createElement("span");

function getQuestions() {
  // set text content of elements
  answerImgEl.setAttribute("class", "emojiImg");

  // append elements
  mainDivEl.appendChild(questionLabelEl);
  mainDivEl.appendChild(questionTextEl);
  mainDivEl.appendChild(listEl);
  mainDivEl.appendChild(answerEl);
  answerEl.appendChild(answerImgEl);
  answerEl.appendChild(answerTextEl);

  // Set text content of question and choices
  questionTextEl.textContent = questionsObject[currentQuestionIndex].question;
  questionLabelEl.textContent =
    "Question: " + (currentQuestionIndex + 1) + "/10";
  listEl.innerHTML = "";
  questionsObject[currentQuestionIndex].choices.forEach(function (choice, i) {
    var choiceEl = document.createElement("li");
    choiceEl.setAttribute("class", "choice");
    choiceEl.setAttribute("value", i + 1);
    choiceEl.textContent = i + 1 + ". " + choice;
    listEl.appendChild(choiceEl);
    choiceEl.addEventListener("click", checkAnswer);
  });
}

function checkAnswer() {
  if (this.value !== questionsObject[currentQuestionIndex].answer) {
    remainingSeconds -= 10;
    if (remainingSeconds <= 0) {
      remainingSeconds = 1;
      endQuiz();
    }
    timerCountSpanEl.textContent = remainingSeconds + " seconds";
    wrongChoice();
  } else {
    correctChoice();
  }
  setTimeout(function () {
    answerEl.setAttribute("style", "display:none");
  }, 1000);
  currentQuestionIndex++;
  questionsRemainingCount--;
  questionsRemainingCountSpanEl.textContent = questionsRemainingCount;
  if (currentQuestionIndex === questionsObject.length) {
    endQuiz();
    goodJobMessage();
  } else {
    getQuestions();
  }
}

function correctChoice() {
  answerEl.setAttribute("style", "display: block");
  answerEl.setAttribute("class", "correctChoice");
  answerTextEl.textContent = "Correct! Keep going";
  answerImgEl.setAttribute("src", "./assets/images/correct_answer.png");
  correctAnswersCount++;
  correctCountSpanEl.textContent = correctAnswersCount;
}

function wrongChoice() {
  answerEl.setAttribute("style", "display: block");
  answerEl.setAttribute("class", "wrongChoice");
  answerTextEl.textContent = "Wrong Choice! Oops!";
  answerImgEl.setAttribute("src", "./assets/images/wrong_answer.png");
  wrongAnswersCount++;
  wrongCountSpanEl.textContent = wrongAnswersCount;
}

function endQuiz() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);
  createEndQuizContent();
}

// Function to clear the main div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

var endMessageEl = document.createElement("h1");
// var submitFormEl = document.createElement("form");
var scoreLabelEl = document.createElement("h5");
var scoreEl = document.createElement("span");
var nameLabelEl = document.createElement("label");
var nameInputEl = document.createElement("input");
var submitNameBtnEl = document.createElement("button");

function createEndQuizContent() {
  scoreLabelEl.textContent = "Your final score is: ";
  nameLabelEl.textContent = "Enter your name: ";
  submitNameBtnEl.textContent = "Submit";
  nameInputEl.setAttribute("type", "text");
  nameInputEl.setAttribute("placeholder", "enter your name...");

  mainDivEl.appendChild(endMessageEl);
  // mainDivEl.appendChild(submitFormEl);
  mainDivEl.appendChild(scoreLabelEl);
  mainDivEl.appendChild(scoreEl);
  mainDivEl.appendChild(nameLabelEl);
  mainDivEl.appendChild(nameInputEl);
  mainDivEl.appendChild(submitNameBtnEl);

  submitNameBtnEl.addEventListener("click", checkUserInput);
}

function goodJobMessage() {
  endMessageEl.textContent =
    "Nice Job! You Are All Done With " + remainingSeconds + " seconds left!";
  scoreEl.textContent = remainingSeconds;
  timerCountSpanEl.textContent = remainingSeconds + " seconds";
}

function outOfTimeMessage() {
  endMessageEl.textContent = "You ran out of time... Better Luck Next Time";
  scoreEl.textContent = remainingSeconds;
}

function checkUserInput() {
  if (nameInputEl.value === "") {
    nameLabelEl.textContent = "Please enter your name: ";
    var inputErrorAlertEl = document.createElement("h2");
    inputErrorAlertEl.textContent = "You must enter a name to proceed";
    inputErrorAlertEl.setAttribute("class", "errorAlert");
    mainDivEl.appendChild(inputErrorAlertEl);
    setTimeout(function () {
      inputErrorAlertEl.setAttribute("style", "display:none");
    }, 2000);
    submitNameBtnEl.addEventListener("click", checkUserInput);
  } else {
    saveUserScore();
  }
}

function saveUserScore() {
  localStorage.setItem("name", nameInputEl.value);
  localStorage.setItem("score", remainingSeconds);
  displayHighscores();
}

function displayHighscores() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);

  // create content
  var name = localStorage.getItem("name");
  var score = localStorage.getItem("score");
  var newScoreEl = document.createElement("li");
  newScoreEl.textContent = name + ": " + score;

  var highscoresTitleEl = document.createElement("h1");
  var highscoresListEl = document.createElement("ul");
  var backBtnEl = document.createElement("button");
  var clearBtnEl = document.createElement("button");

  highscoresTitleEl.textContent = "Highscores";
  backBtnEl.textContent = "Go Back";
  clearBtnEl.textContent = "Clear Highscores";

  mainDivEl.appendChild(highscoresTitleEl);
  mainDivEl.appendChild(highscoresListEl);
  mainDivEl.appendChild(backBtnEl);
  mainDivEl.appendChild(clearBtnEl);
  highscoresListEl.appendChild(newScoreEl);

  backBtnEl.addEventListener("click", backToBeginning);
  clearBtnEl.addEventListener("click", clearLeaderboard);
}

function backToBeginning() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);
  displayQuizInstructions();
}

function clearLeaderboard() {
  highscoresListEl.children.empty();
  console.log(highscoresListEl.children);
}
