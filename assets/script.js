let quizContainer = $("questions");
let resultsContainer = $("gameover");
let submitButton = $("submit");
let timeLink = $("time");
let time = myQuestions.length * 15;

let startBtn = $("start");
let timer;

//Function to build the quiz
function buildQuiz(){
   let startScreen = $("start-screen");
   startScreen.addClass("class", "hide");

   quizContainer.removeClass();

   timer = setInterval(clockTick, 1000);

   timeLink.textContent = time;

   getQuestions();
}

function getQuestion(){

    

}

//function to show the results
function showResults(){

}

function clockTick(){
    time--;
    timeLink.textContent = time;
}

//output
buildQuiz();

startBtn.onclick = buildQuiz;

//submit button
submitButton.add("click", showResults);