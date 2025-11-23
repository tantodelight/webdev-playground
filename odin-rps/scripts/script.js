const rules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};
const sect1 = document.querySelector(".sect1");
const sect2 = document.querySelector(".sect2");
const gameTitle = document.querySelector(".title");
gameTitle.textContent = "Rock Paper Scissors";

const instruction = document.querySelector(".instruction");
instruction.textContent = "Choose your weapon";

const matchUp = document.querySelector(".matchUp");
const winOrLose = document.querySelector(".winOrLose");
const scoreBoard = document.querySelector(".scoreBoard");

let userScore = 0;
let computerScore = 0;
let draw = 0;

const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
};

const replay = document.querySelector(".replay");
const playRound = function() {
    const buttonsDiv = document.querySelector(".buttons");
    const computerSelection = getComputerChoice();

    // Attach a one-time listener for this round
    const handleClick = (event) => {
        sect1.classList.add("hidden");
        sect2.classList.remove("hidden");
        const clickedButton = event.target;
        if (clickedButton.tagName !== "BUTTON") return;

        const userSelection = clickedButton.textContent.toLowerCase();
        
        matchUp.textContent = `${userSelection} v/s ${computerSelection}`;
        
        if (rules[userSelection] === computerSelection) {
            userScore += 1;
            winOrLose.innerHTML = `<span class="win">You Win!🎉</span>`;
        } else if (userSelection === computerSelection) {
            winOrLose.textContent = "Draw!";
            draw += 1;
        } else {
            computerScore += 1;
            winOrLose.innerHTML = `<span class="lose">You Lose.</span>`;
        }
        
        scoreBoard.textContent = `Win: ${userScore} Lose: ${computerScore} Draw: ${draw}`;
        buttonsDiv.removeEventListener("click", handleClick);
    };

    buttonsDiv.addEventListener("click", handleClick);
};

// play again
replay.addEventListener('click', () => {
    sect1.classList.remove("hidden");
    sect2.classList.add("hidden");
    playRound();
})
// start
playRound();

