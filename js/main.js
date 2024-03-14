/**
 * - Login identify
 * - Set user name
 */

if (sessionStorage.getItem("user")) {
  const user = document.getElementById("user-name");
  user.innerHTML = sessionStorage.getItem("user");
} else {
  window.location.href = "/Quiz/login.html";
}
const category = document.querySelector(".quiz-info");
const questionCount = document.querySelector(".count");
const quizLabel = document.querySelector(".quiz-label");
const answersArea = document.querySelector(".answers-area");
const bullets = document.querySelector(".bullets");
const results = document.querySelector(".results");
const submitButton = document.querySelector(".submit-button");

//
let questions;
let count = 0;
let currentIndex = 0;
let rightAnswers = 0;

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status === 200) {
    questions = JSON.parse(this.responseText);
    count = questions.length;

    //Show Count
    questionCount.innerHTML = count;

    AddQuestion(questions);
    AddBullets(count);
  }
};
request.open("GET", "data/quiz.json");
request.send();

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  let answers = document.querySelectorAll('input[type="radio"]');
  let answers_chosed = "";

  answers.forEach((ele) => {
    if (ele.checked) answers_chosed = ele.dataset.answer;
  });

  if (answers_chosed) {
    checkAnswer(answers_chosed, questions[currentIndex].answer);

    quizLabel.innerHTML = "";
    answersArea.innerHTML = "";
    currentIndex++;

    AddQuestion(questions);

    bullets.children[currentIndex].classList.add("on");

    showResults();
  }
});

function AddQuestion(questions) {
  let questionObj = questions[currentIndex];
  console.log(questionObj);

  // Add Question Label
  quizLabel.innerHTML = `<h2>${questionObj.question}</h2>`;

  //Add Anwser
  let answerCount = questionObj.options.length;
  for (let answerNum = 0; answerNum < answerCount; answerNum++) {
    //Create Container For Each Answer
    let answerContainer = document.createElement("div");

    // Add Class To Css Style
    answerContainer.classList.add("answer");

    //Create input Type Radio
    let input = document.createElement("input");

    //Set Attribute
    input.setAttribute("type", "radio");
    input.setAttribute("name", "question");
    input.setAttribute("id", `answer_${answerNum}`);
    input.setAttribute("name", "question");
    input.setAttribute("name", "question");
    input.setAttribute("data-answer", questionObj.options[answerNum]);

    //Create Label
    let label = document.createElement("label");
    label.setAttribute("for", `answer_${answerNum}`);
    label.innerHTML = questionObj.options[answerNum];

    //Add input to answerContainer
    answerContainer.appendChild(input);
    answerContainer.appendChild(label);

    //Add answerContainer to answersArea
    answersArea.appendChild(answerContainer);
  }

  // Add Answers
}
function AddBullets(count) {
  for (let i = 0; i < count; i++) {
    let span = document.createElement("span");
    if (i === 0) span.classList.add("on");
    bullets.appendChild(span);
  }
}
function checkAnswer(answers_chosed, answer) {
  if (answers_chosed === answer) rightAnswers++;
}
function showResults() {
  if (currentIndex + 1 === count) {
    questionCount.remove();
    quizLabel.remove();
    answersArea.remove();
    bullets.remove();
    submitButton.remove();
    results.classList.add("active");
    results.innerHTML = `Your Score is ${rightAnswers}`;
  }
}
