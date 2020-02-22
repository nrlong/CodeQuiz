let quizContainer = $("#questions");
let resultsContainer = $("#gameover");
let submitButton = $("#submit");
let timeLink = $("#time");
let time = myQuestions.length * 15;
let choiceEl = $("#choices");
let currentQuestionIndex = 0;
let initials = $("#initials");


let startBtn = $("#start");
let timer;

let feedbackID = $("#feedback");

//Function to build the quiz
function buildQuiz(){
   let startScreen = $("#start-screen");
   startScreen.addClass("hide");

   quizContainer.removeClass();

   timer = setInterval(clockTick, 1000);

   timeLink.textContent = time;

   getQuestion();
}

function getQuestion(){

    let currentQuestion = myQuestions[currentQuestionIndex];

    let questionTitle = $("#question-title");
    questionTitle.textContent = currentQuestion.question;

    choiceEl.innerHTML ="";

    currentQuestion.answers.forEach(function(choice, i){
        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;

        choice.appendChild(choiceNode);
    });
}


function questionClick(){
    if(this.value !== questions[currentQuestionIndex].correctAnswer){

        time -= 15;

        if (time < 0){
            time = 0;
        }

        timeLink.textContect = time;

        sfxWrong.play();

        feedbackID.textContent = "Wrong!";

    }else {
        sfxRight.play();

        feedbackID.textContent = "Correct!!";
    }

    feedbackID.setAttribute("class", "feedback");
    setTimeout(function (){
        feedbackID.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if(currentQuestionIndex === myQuestions.length){
        quizEnd();
    }else {
        getQuestion();
    } 
} 

function quizEnd(){
    clearInterval(timer);

    let endScreen = $("#gameover");
    endScreen.removeAttribute("class");

    let finalScore = $("#final");
    finalScore.textContect = time;

    questions.setAttribute("class", "hide");
}

function clockTick(){
    time--;
    timer.textContent = time;

    if (time <= 0){
        quizEnd();
    }
}

function saveHighScore(){
    let initials = initials.value.trim();

    if (initials !== ""){
        let highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];

        let newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }
}

function checkForEnter(event){
    if (event.key === "Enter"){
        saveHighScore();
    }
}

submitButton.onclick = saveHighScore;

startBtn.onclick = buildQuiz();

initials.onkeyup = checkForEnter;