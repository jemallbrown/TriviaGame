(function() {

  setTimeout(function(){ alert("times up and you loose"); }, 30000);

  console.log("in the function")

  // i need to create the questions for the quiz
  // gave up on scripting the questions using $ajax and found tutorial on web

var myQuestions = [
{
  question: "What is the name of the very first video uploaded to YouTube?",
  answers: {
      a: "Me at the zoo",
      b: "tribute",
      c: "carrie rides a truck",
      d: "Her new puppy from great grandpa vern."
},
  correct_answer: "a"
},

{
  question: "In 2013 how much money was lost by Nigerian scams?",
  answers: {
      a: "$2.7 Billion",
      b: "$956 Million",
      c: "$95 Million",
      d: "$12.7 Billion"
},
  correct_answer: "d"
},

{
  question: "What is the unit of currency in Laos?",
  answers: {
      a: "Dollar",
      b: "Kip",
      c: "Konra",
      d: "Ruble",
},
  correct_answer: "b"
},

{
  question: "What is the romanized Japanese word for university?",
  answers: {
      a: "Shokudou",
      b: "Jimusho",
      c: "Daigaku",
      d: "Toshokan",
},
  correct_answer: "c"
}
];
console.log(myQuestions);

function buildQuiz() {

  console.log('inside build quiz function')
  // we'll need a place to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // we'll want to store the list of answer choices
    const answers = [];

    // Tutorial explained that The forEach() method calls a provided function once for each element in an array, in order.
    // this is how we are calling the quesitons and answers from the array which I built above
   // Here I am using template literals per the tutorial.  
  // Template literals are enclosed by the back-tick (` `)  (grave accent) character instead of double or single quotes. 
  // Template literals can contain placeholders. These are indicated by the dollar sign and curly braces (${expression}).

    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
         </label>`
          );
      }

    // add this question and its answers to the output
    // The join expression takes the list of answers and puts them together in one string that can 
    // output into the answers div.

    output.push(
      `<div class="slide">
         <div class="question"> ${currentQuestion.question} </div>
         <div class="answers"> ${answers.join("")} </div>
       </div>`
    );
  });

  

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');

  console.log("build quiz function completed");
}

function showResults() {
  console.log('Entered the show results funtion')
  // gather answer containers from the quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;

  // start building the HTML for each question. We’ll need to loop through each question
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQuestion.correct_answer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = "lightgreen";

    } else {
      // if answer is wrong or blank
      // color the answers red
      answerContainers[questionNumber].style.color = "red";
    }
  });

  // show number of correct answers out of total.  

  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

console.log('creating continer for quiz, results and submit button')
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

// display quiz right away
buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

// on submit, show results
submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
})();