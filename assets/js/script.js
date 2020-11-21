// global variables
var remainingSeconds = 60;
var currentQuestionIndex = 0;
var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var questionsRemainingCount = 10;
var timer;

// retrieving our scores and converting it back into an array
var pastScores = JSON.parse(localStorage.getItem("scores"));

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
    choices: ["The World Wide Web Consortium", "IBM", "Microsoft", "Apple"],
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

  timerCountSpanEl.textContent = remainingSeconds + " seconds";
  correctCountSpanEl.textContent = correctAnswersCount;
  wrongCountSpanEl.textContent = wrongAnswersCount;
  questionsRemainingCountSpanEl.textContent = questionsRemainingCount;

  mainDivEl.appendChild(quizTitleEl);
  mainDivEl.appendChild(quizDirectionsEl);
  mainDivEl.appendChild(quizStartBtnEl);

  // add event listeners to button
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
var answerBoxEl = document.createElement("div");
var answerImgEl = document.createElement("img");
var answerTextEl = document.createElement("span");

function getQuestions() {
  // set text content of elements
  mainDivEl.setAttribute("style", "background: #ccd6dd;");
  answerEl.classList.add("d-flex", "justify-content-center");
  answerBoxEl.classList.add("answerBox");
  answerImgEl.classList.add("emojiImg");

  // append elements
  mainDivEl.appendChild(questionLabelEl);
  mainDivEl.appendChild(questionTextEl);
  mainDivEl.appendChild(listEl);
  mainDivEl.appendChild(answerEl);
  answerEl.appendChild(answerBoxEl);
  answerBoxEl.appendChild(answerImgEl);
  answerBoxEl.appendChild(answerTextEl);

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
      endQuiz();
    }
    timerCountSpanEl.textContent = remainingSeconds + " seconds";
    wrongChoice();
  } else {
    correctChoice();
  }
  setTimeout(function () {
    answerEl.classList.add("hide");
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
  answerEl.classList.remove("hide");
  answerBoxEl.setAttribute("style", "background: #34a853");
  answerTextEl.textContent = "Correct! Keep going";
  answerImgEl.setAttribute("src", "./assets/images/correct_answer.png");
  correctAnswersCount++;
  correctCountSpanEl.textContent = correctAnswersCount;
}

function wrongChoice() {
  answerEl.classList.remove("hide");
  answerBoxEl.setAttribute("style", "background: #ea4335");
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
var endContainer = document.createElement("div");
var endMessageEl = document.createElement("h2");
var submitFormEl = document.createElement("form");
var scoreLabelEl = document.createElement("label");
var scoreEl = document.createElement("span");
var lineBreak = document.createElement("br");
var nameLabelEl = document.createElement("label");
var nameInputEl = document.createElement("input");
var submitNameBtnEl = document.createElement("button");
var inputErrorAlertEl = document.createElement("h5");

function createEndQuizContent() {
  scoreLabelEl.textContent = "Your final score is: ";
  nameLabelEl.textContent = "Enter your name: ";
  submitNameBtnEl.textContent = "Submit";
  nameInputEl.setAttribute("type", "text");
  nameInputEl.setAttribute("placeholder", "e.g., John Doe");
  nameInputEl.value = "";
  inputErrorAlertEl.classList.add("hide", "inputError");
  endContainer.classList.add("endScreenContainer");
  scoreLabelEl.setAttribute("id", "finalScoreLabel");
  scoreEl.setAttribute("id", "finalScore");

  mainDivEl.appendChild(endContainer);
  endContainer.appendChild(endMessageEl);
  endContainer.appendChild(submitFormEl);
  endContainer.appendChild(scoreLabelEl);
  scoreLabelEl.appendChild(scoreEl);
  endContainer.appendChild(lineBreak);
  endContainer.appendChild(nameLabelEl);
  endContainer.appendChild(nameInputEl);
  endContainer.appendChild(submitNameBtnEl);
  endContainer.appendChild(inputErrorAlertEl);

  submitNameBtnEl.addEventListener("click", checkUserInput);
}

function goodJobMessage() {
  endMessageEl.textContent =
    "Nice Job! You Are All Done With " + remainingSeconds + " seconds left!";
  scoreEl.textContent = remainingSeconds;
  timerCountSpanEl.textContent = remainingSeconds + " seconds";
  mainDivEl.setAttribute(
    "style",
    "background: #34a853; padding-top: 30px; padding-bottom: 30px;"
  );
}

function outOfTimeMessage() {
  endMessageEl.textContent = "You ran out of time... Better Luck Next Time";
  remainingSeconds = 0;
  scoreEl.textContent = remainingSeconds;
  timerCountSpanEl.textContent = remainingSeconds + " seconds";
  mainDivEl.setAttribute(
    "style",
    "background: #ea4335; padding-top: 30px; padding-bottom: 30px;"
  );
}

// Function to validate user input when submitting score
function checkUserInput() {
  if (nameInputEl.value === "") {
    // input is left blank
    inputErrorAlertEl.classList.remove("hide");
    inputErrorAlertEl.textContent = "You must enter your name to proceed";
    setTimeout(function () {
      inputErrorAlertEl.classList.add("hide");
    }, 2000);
    submitNameBtnEl.addEventListener("click", checkUserInput);
  } else {
    saveUserScore();
  }
}

// Function to save user's name and score to local storage as a key-value pair
function saveUserScore() {
  if (pastScores === null) {
    // no scores exist in local storage
    pastScores = [];
  }

  var newScoreObj = {
    name: nameInputEl.value,
    score: remainingSeconds,
  };

  pastScores.push(newScoreObj);
  // storing our array as a string
  localStorage.setItem("scores", JSON.stringify(pastScores));

  displayHighscores();
}

// Function to display the scores saved in local storage when the quiz is over or when the "View Leaderboard" button is clicked
function displayHighscores() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);

  // create content
  var highscoresTitleEl = document.createElement("h1");
  var highscoresListEl = document.createElement("table");
  var tblHeaderEl = document.createElement("thead");
  var highscoresTableRow = document.createElement("tr");
  var nameColHeaderEl = document.createElement("th");
  var scoreColHeaderEl = document.createElement("th");
  var tblBodyEl = document.createElement("tbody");
  var backBtnEl = document.createElement("button");
  var clearBtnEl = document.createElement("button");
  highscoresTitleEl.textContent = "Highscores";
  backBtnEl.textContent = "Back to Beginning";
  clearBtnEl.textContent = "Clear Highscores";
  nameColHeaderEl.textContent = "Player";
  scoreColHeaderEl.textContent = "Score";
  mainDivEl.setAttribute("style", "background: lightgrey;");
  highscoresListEl.setAttribute("id", "highscoresList");

  mainDivEl.appendChild(highscoresTitleEl);
  mainDivEl.appendChild(highscoresListEl);
  highscoresListEl.appendChild(tblHeaderEl);
  tblHeaderEl.appendChild(nameColHeaderEl);
  tblHeaderEl.appendChild(scoreColHeaderEl);
  highscoresListEl.appendChild(tblBodyEl);
  mainDivEl.appendChild(backBtnEl);
  mainDivEl.appendChild(clearBtnEl);

  if (localStorage.getItem("scores") !== null) {
    // if scores exist in local storage

    // Initialize maximum score element
    var highScore = pastScores[0].score;

    for (var i = 0; i < pastScores.length; i++) {
      // create element to hold each score
      var newTableRow = document.createElement("tr");
      var newNameEl = document.createElement("td");
      var newScoreEl = document.createElement("td");

      newNameEl.textContent = pastScores[i].name;
      newScoreEl.textContent = pastScores[i].score;

      newTableRow.appendChild(newNameEl);
      newTableRow.appendChild(newScoreEl);

      // list highscores in descending order
      if (pastScores[i].score >= highScore) {
        tblBodyEl.prepend(newTableRow);
        highScore = pastScores[i].score;
      } else {
        tblBodyEl.appendChild(newTableRow);
      }
    }
  } else {
    var noHighscoresEl = document.createElement("tr");
    var noHighscoresTextEl = document.createElement("td");
    noHighscoresTextEl.textContent = "You do not have any highscores yet!";
    noHighscoresTextEl.setAttribute("colspan", "2");
    noHighscoresEl.appendChild(noHighscoresTextEl);
    tblBodyEl.appendChild(noHighscoresEl);
  }

  // add event listeners to the two buttons
  backBtnEl.addEventListener("click", backToBeginning);
  clearBtnEl.addEventListener("click", clearHighscoresList);
}

function backToBeginning() {
  // Remove content in main div
  removeAllChildNodes(mainDivEl);
  resetVariables();
  displayQuizInstructions();
}

function resetVariables() {
  remainingSeconds = 60;
  currentQuestionIndex = 0;
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  questionsRemainingCount = 10;
  mainDivEl.setAttribute("style", "background: #fbbc05;");
}

function clearHighscoresList() {
  localStorage.removeItem("scores");
  // empty the pastScores array
  pastScores = [];
  displayHighscores();
}

// Function to clear the main div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
