const games = ["rock", "paper", "scissors"];

const form = document.querySelector("form");
form.addEventListener("submit", nameInpute);

const inputName = document.querySelector("input");
const userName = document.querySelector("h4");


function nameInpute(event) {
    event.preventDefault();
    userName.innerText = inputName.value;
    form.reset();
}

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const result = document.querySelector("#result");
const playerScoreElement = document.querySelector("#playerScore");
const computerScoreElement = document.querySelector("#computerScore");

let playerScore = 0;
let computerScore = 0;

rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));

async function playRound(playerChoice) {

    const computerChoice = computerPlay();

    const winner = getWinner(playerChoice, computerChoice);
    if (winner === "You win!") {
        playerScore++;
    } else if (winner === "You lose!") {
        computerScore++;
    }

    result.innerText = `You chose ${playerChoice}. The computer chose ${computerChoice}. ${winner}`;
    playerScoreElement.innerText = `Player Score: ${playerScore}`;
    computerScoreElement.innerText = `Computer Score: ${computerScore}`;

    if (computerScore === 1) {
        postScore({ name: userName.innerText, score: playerScore }).then(()=>{
            getHighscores();
            restart();
        });
    }
}

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";

    }

}

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restart);

function restart() {
    playerScore = 0;
    computerScore = 0;
    result.innerText = "";
    playerScoreElement.innerText = "Player score: 0";
    computerScoreElement.innerText = "Computer score:  0";
    userName.innerText = "";
    form.reset();
}

async function getHighscores() {
    const url = 'http://localhost:3001/highscore';

    const response = await fetch(url);
    const scores = await response.json();

    displayScore(scores);

}

async function postScore(score) {
    const url = 'http://localhost:3001/highscore';

    console.log("New post", score);

    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(score)
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

function displayScore(scores) {
    const scoreList = document.querySelector("#score-list");
        scoreList.innerHTML = " ";

    for (const score of scores) {
       const listItem = document.createElement("li");
        listItem.textContent = `${score.name}: ${score.score}`;
        scoreList.appendChild(listItem);

    }

}
getHighscores();