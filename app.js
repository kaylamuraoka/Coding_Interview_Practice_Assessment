// Declaration of global variables
var countdownCount = 60;

// Declaration of global elements
var countdownEl = document.querySelector("#countdown");
var mainDivEl = document.querySelector("#main");
var timerHighscoresDivEl = document.querySelector("timerHighscoresDiv");
var questionDivEl = document.querySelector("#questionDiv");
var questionEl = document.querySelector("#question");
var listEl = document.querySelector("#optionsList");
var optionA = document.querySelector("#optionA");
var optionB = document.querySelector("#optionB");
var optionC = document.querySelector("#optionC");
var optionD = document.querySelector("#optionD");
var answerEl = document.querySelector("answerEl");
var finishQuizDivEl = document.querySelector("#finishQuizDiv");
var highscoresDivEl = document.querySelector("#highscores");
var backToBeginningBtnEl = document.querySelector("#backToBeginning");
var clearLeaderboardBtn = document.querySelector("#clearLeaderboard");
var questionNumberEl = document.querySelector("#questionNumber");

// This  store the details the questions for the quiz.
var questions = [
  // Question 1
  {
    q: "What does HTML stand for?",
    choices: [
      "Hey Too Much Layout.",
      "Hey That's My Lunch",
      "Hyper Text Markup Language",
      "Home Tool Makeshit Ladder",
    ],
    a: "C",
    // explanation: "",
  },
  // Question 2
  {
    q: "What does CSS stand for?",
    choices: [
      "Chicken Salad Sandwich",
      "Cascading Style Sheets",
      "Cool Street Style",
      "Computer Style Sheets",
    ],
    a: "B",
  },
  // Question 3
  {
    q: "Who is responsible for making the Web standards?",
    choices: ["The World Wide Web Consortium", "IBM", "Microsofe", "Apple"],
    a: "A",
  },
  // Question 4
  {
    q: "What is the correct HTML element for the largest heading?",
    choices: ["<large>", "<head>", "<jumbo>", "<h1>"],
    a: "D",
  },
  // Question 5
  {
    q:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    choices: [
      "In the <head> section",
      "In the <body> section",
      "You should NEVER refernce extenal stylesheets in an HTML document",
      "At the end of the document",
    ],
    a: "A",
  },
  // Question 6
  {
    q: "The Bootstrap grid system is based on how many columns?",
    choices: ["6", "8", "10", "12"],
    a: "D",
  },
  // Question 7
  {
    q:
      "What is the correct syntax for referring to an external JavaScript file?",
    choices: [
      '<script src="script.js">',
      '<script source="script.js">',
      '<script type="script.js">',
      '<script ref="script.js">',
    ],
    a: "A",
    // explanation: 'The "src" term is used to refer to any JavaScript file.',
  },
  // Question 8
  {
    q: "What scripting language is jQuery written in?",
    choices: ["C++", "PHP", "JavaScript", "Python"],
    a: "C",
  },
  // Question 9
  {
    q: 'In JavaScript what is the result of 2 + "2"?',
    choices: ["4", '"4"', "22", '"22"'],
    a: "C",
  },
  // Question 10
  {
    q: "How is document type initialized in HTML5?",
    choices: ["<!DOCTYPE HTML>", "<HTML>", "</DOCTYPE>", "</DOCTYPE html>"],
    a: "A",
  },
];
mainDivEl.addEventListener("load", renderPage1());

function renderPage1() {
  mainDivEl = document.querySelector("#main");
  // Adding h1 Element to Header
  var titleEl = document.createElement("h1");
  titleEl.textContent = "Coding Interview Practice Assessment";
  mainDivEl.appendChild(titleEl);

  // Adding p Element to Header
  var quizDescriptionEl = document.createElement("p");
  quizDescriptionEl.textContent =
    "Try your best to answer the following code-related questions within the 60 second time limit. Remember to keep in mind that incorrect answers will penalize your remaining time by ten seconds";
  mainDivEl.appendChild(quizDescriptionEl);

  // Create start button
  var startBtnEl = document.createElement("button");
  startBtnEl.textContent = "Start Quiz";
  mainDivEl.appendChild(startBtnEl);
  startBtnEl.addEventListener("click", startQuiz);
}

function startQuiz() {
  // hide first page content
  mainDivEl.classList.add("hide");
  //start at the beginning of the question array index
  var questionsIndex = 0;
  //unhide the question container
  questionDivEl.classList.remove("hide");
  startTimer();
  if (questionsIndex === questions.length) {
    clearInterval(countdown);
    return;
  }
  questionNumberEl.textContent = questionsIndex + 1;
  questionEl.textContent = questions[questionsIndex].q;
  optionA.textContent = questions[questionsIndex].choices[0];
  optionB.textContent = questions[questionsIndex].choices[1];
  optionC.textContent = questions[questionsIndex].choices[2];
  optionD.textContent = questions[questionsIndex].choices[3];
}

function setQuestions() {
  if (questionsIndex === questions.length) {
    clearInterval(countdown);
    return;
  }
  questionNumberEl.textContent = questionsIndex + 1;
  questionEl.textContent = questions[questionsIndex].q;
  optionA.textContent = questions[questionsIndex].choices[0];
  optionB.textContent = questions[questionsIndex].choices[1];
  optionC.textContent = questions[questionsIndex].choices[2];
  optionD.textContent = questions[questionsIndex].choices[3];
}

optionA.addEventListener("click", function () {
  if (optionA.getAttribute("questionAnswer") === questions[questionsIndex].a) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});

optionB.addEventListener("click", function () {
  if (optionB.getAttribute("questionAnswer") === questions[questionsIndex].a) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});
optionC.addEventListener("click", function () {
  if (optionC.getAttribute("questionAnswer") === questions[questionsIndex].a) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});

optionD.addEventListener("click", function () {
  if (optionD.getAttribute("questionAnswer") === questions[questionsIndex].a) {
    correctChoice();
  } else {
    incorrectChoice();
  }
});

function startTimer() {
  countdownEl.textContent = countdownCount + " seconds left";
  var countdown = window.setInterval(function () {
    countdownEl.textContent = countdownCount + " seconds left";
    countdownCount--;
    if (countdownCount === 0) {
      endQuiz();
      clearInterval(countdown);
    }
    // Changing the color of the coundtdown at 10 sec mark
    if (countdownCount < 10 && countdownCount >= 5) {
      countdownEl.setAttribute("style", "color: crimson");
    } else if (countdownCount < 5) {
      countdownEl.setAttribute("style", "color: red");
    } else {
      countdownEl.setAttribute("style", "color: inherit");
    }
  }, 1000);
}

function correctChoice() {
  answerEl.textContent = "Correct! Keep going";
  answerEl.setAttribute("class", "correctAnswerText");
  questionsIndex++;
  setQuestions();
}

function incorrectChoice() {
  answerEl.textContent = "Incorrect! Oops!";
  answerEl.setAttribute("class", "wrongAnswerText");
  countdownCount -= 10;
  questionsIndex++;
  setQuestions();
}

function endQuiz() {
  // hide first page content
  questionDivEl.classList.add("hide");

  // show question div
  finishQuizDivEl.classList.remove("hide");

  var submitScoreBtnEl = document.querySelector("#submitScore");
  submitScoreBtnEl.addEventListener("click", addToLeaderboard);
}

function addToLeaderboard() {
  var name = document.querySelector("#name").value;
  var score = document.querySelector("#score");

  if (name === "") {
    displayMessage("error", "Name cannot be blank");
  } else {
    localStorage.setItem("name", name);
    localStorage.setItem("score", score);
    showLeaderboard();
  }
}

function showLeaderboard() {
  finishQuizDivEl.classList.add("hide");
  timerHighscoresDivEl.classList.add("hide");

  highscoresDivEl.classList.remove("hide");

  var name = localStorage.getItem("name");
  var score = localStorage.getItem("score");
  if (!name || !score) {
    var emptyInputAlert = document.createElement("p");
    emptyInputAlert.textContent = "You need to include your name";
    highscoresDivEl.append(emptyInputAlert);
  } else {
    document.querySelector("#userName").textContent = name;
    document.querySelector("#userScore").textContent = score;
  }
  backToBeginningBtnEl = document.querySelector("#backToBeginning");
  clearLeaderboardBtn.addEventListener("click", clearLeaderboard);
}
function clearLeaderboard() {
  document.querySelector("leaderboard").empty();
}
