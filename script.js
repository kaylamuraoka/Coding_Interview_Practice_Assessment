// add elements to the html document and set its attributes
var remainingSeconds = 60;
var currentQuestionIndex = 0;
var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var questionsRemainingCount = 10;

// var quizInfoDivEl = document.querySelector("#quizInfo");
// var quizStartBtnEl = document.querySelector("#quizStartBtn");

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

var questionsDivEl = document.querySelector("#questions");
// var questionNumberSpanEl = document.querySelector("#questionNumber");

// var finishQuizDivEl = document.querySelector("#finishQuiz");
// var leaderboardDivEl = document.querySelector("#leaderboard");

// This  store the details the questions for the quiz.
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
    answer: "C",
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
    answer: "B",
  },
  // Question 3
  {
    question: "Who is responsible for making the Web standards?",
    choices: ["The World Wide Web Consortium", "IBM", "Microsofe", "Apple"],
    answer: "A",
  },
  // Question 4
  {
    question: "What is the correct HTML element for the largest heading?",
    choices: ["<large>", "<head>", "<jumbo>", "<h1>"],
    answer: "D",
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
    answer: "A",
  },
  // Question 6
  {
    question: "The Bootstrap grid system is based on how many columns?",
    choices: ["6", "8", "10", "12"],
    answer: "D",
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
    answer: "A",
  },
  // Question 8
  {
    question: "What scripting language is jQuery written in?",
    choices: ["C++", "PHP", "JavaScript", "Python"],
    answer: "C",
  },
  // Question 9
  {
    question: "What does this comparison operator mean: !=",
    choices: ["not equal", "equal to", "greater than or equal to", "less than"],
    answer: "A",
  },
  // Question 10
  {
    question: "How is document type initialized in HTML5?",
    choices: ["<!DOCTYPE HTML>", "<HTML>", "</DOCTYPE>", "</DOCTYPE html>"],
    answer: "A",
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
}

// quizStartBtnEl.addEventListener("click", startQuiz);

linkToLeaderboardBtnEl.addEventListener("click", function () {});

function startQuiz() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);
  startTimer();
  createQuizContent();
  setQuestions();
}

// Function that runs Timer until time
function startTimer() {
  setInterval(function () {
    remainingSeconds--;
    if (remainingSeconds >= 0) {
      timerCountSpanEl.textContent = remainingSeconds + " seconds";
    }
    if (remainingSeconds === 0) {
      endQuiz();
      outOfTimeMessage();
    }
    if (remainingSeconds <= 0) {
      endQuiz();
      outOfTimeMessage();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(startTimer);
}

// Create elements for the quiz contents
var questionLabelEl = document.createElement("h3");
var questionCountSpanEl = document.createElement("span");
var questionTextEl = document.createElement("h1");
var listEl = document.createElement("ul");
var optionAlistEl = document.createElement("li");
var optionBlistEl = document.createElement("li");
var optionClistEl = document.createElement("li");
var optionDlistEl = document.createElement("li");
var answerEl = document.createElement("div");
var answerImgEl = document.createElement("img");
var answerTextEl = document.createElement("span");

function createQuizContent() {
  // set text content of elements
  questionLabelEl.textContent = "Question: ";
  answerImgEl.setAttribute("class", "emojiImg");
  mainDivEl.setAttribute("background", "lightgrey");
  // Create a "questionAnswer" attribute and set the value of the attribute and Add the class attribute to <li> elements
  optionAlistEl.setAttribute("questionAnswer", "A");
  optionBlistEl.setAttribute("questionAnswer", "B");
  optionClistEl.setAttribute("questionAnswer", "C");
  optionDlistEl.setAttribute("questionAnswer", "D");

  // append elements
  mainDivEl.appendChild(questionLabelEl);
  questionLabelEl.appendChild(questionCountSpanEl);
  mainDivEl.appendChild(questionTextEl);
  mainDivEl.appendChild(listEl);
  listEl.appendChild(optionAlistEl);
  listEl.appendChild(optionBlistEl);
  listEl.appendChild(optionClistEl);
  listEl.appendChild(optionDlistEl);
  mainDivEl.appendChild(answerEl);
  answerEl.appendChild(answerImgEl);
  answerEl.appendChild(answerTextEl);
}

function setQuestions() {
  if (currentQuestionIndex === questionsObject.length) {
    endQuiz();
    goodJobMessage();
  }
  // Set text content of question and choices
  questionTextEl.textContent = questionsObject[currentQuestionIndex].question;
  questionCountSpanEl.textContent = currentQuestionIndex + 1 + "/10";
  optionAlistEl.textContent =
    "A) " + questionsObject[currentQuestionIndex].choices[0];
  optionBlistEl.textContent =
    "B) " + questionsObject[currentQuestionIndex].choices[1];
  optionClistEl.textContent =
    "C) " + questionsObject[currentQuestionIndex].choices[2];
  optionDlistEl.textContent =
    "D) " + questionsObject[currentQuestionIndex].choices[3];
}

optionAlistEl.addEventListener("click", function () {
  if (
    optionAlistEl.getAttribute("questionAnswer") ===
    questionsObject[currentQuestionIndex].answer
  ) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});

optionBlistEl.addEventListener("click", function () {
  if (
    optionBlistEl.getAttribute("questionAnswer") ===
    questionsObject[currentQuestionIndex].answer
  ) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});
optionClistEl.addEventListener("click", function () {
  if (
    optionClistEl.getAttribute("questionAnswer") ===
    questionsObject[currentQuestionIndex].answer
  ) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});
optionDlistEl.addEventListener("click", function () {
  if (
    optionDlistEl.getAttribute("questionAnswer") ===
    questionsObject[currentQuestionIndex].answer
  ) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});

function correctChoice() {
  answerEl.setAttribute("class", "correctChoice");
  answerTextEl.textContent = "Correct! Keep going";
  answerImgEl.setAttribute("src", "./assets/images/correct_answer.png");
  correctAnswersCount++;
  correctCountSpanEl.textContent = correctAnswersCount;
  questionsRemainingCount--;
  questionsRemainingCountSpanEl.textContent = questionsRemainingCount;
  currentQuestionIndex++;
  setQuestions();
}

function incorrectChoice() {
  // Subtract 10 seconds from time
  remainingSeconds -= 10;
  answerEl.setAttribute("class", "wrongChoice");
  answerTextEl.textContent = "Incorrect! Oops!";
  answerImgEl.setAttribute("src", "./assets/images/wrong_answer.png");
  wrongAnswersCount++;
  wrongCountSpanEl.textContent = wrongAnswersCount;
  questionsRemainingCount--;
  questionsRemainingCountSpanEl.textContent = questionsRemainingCount;
  currentQuestionIndex++;
  setQuestions();
}

// Function to clear the main div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function endQuiz() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);
  stopTimer();
  createEndQuizContent();
}

var endMessageEl = document.createElement("h1");
var submitFormEl = document.createElement("form");
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

  mainDivEl.appendChild(endMessageEl);
  mainDivEl.appendChild(submitFormEl);
  submitFormEl.appendChild(scoreLabelEl);
  scoreLabelEl.appendChild(scoreEl);
  submitFormEl.appendChild(nameLabelEl);
  submitFormEl.appendChild(nameInputEl);
  submitFormEl.appendChild(submitNameBtnEl);
}
function goodJobMessage() {
  endMessageEl.textContent =
    "Nice Job! You Are All Done With " + remainingSeconds + " seconds left!";
  scoreEl.textContent = remainingSeconds;
  timerCountSpanEl.textContent = remainingSeconds + " seconds";
}

function outOfTimeMessage() {
  endMessageEl.textContent = "You ran out of time... Better Luck Next Time";
  scoreEl.textContent = 0;
}
