function getHighScore(){
    let highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];

    highscores.sort(function(a,b){
        return b.score - a.score;
    });

    highscores.forEach(function(score){
        let liTag = document.createElement("li");
        liTag.textContent = (score.initials + " - " + score.score);

        let olEl = $("#highscore");
        olEl.append(liTag);
    });
}

function clearHighScores (){
    window.localStorage.removeItem("highscore");
    window.location.reload();
}

$("#reset").click(clearHighScores);

getHighScore();