const rules = {
    rock : "scissors",
    paper : "rock",
    scissors : "paper"
}
const getUserChoice = function() {
    const userChoice = prompt("Enter your choice: ").trim().toLowerCase()
    return userChoice
}
const getComputerChoice = function() {
    const computerChoice = ["rock", "paper", "scissors"]
    const choice = Math.floor(Math.random() * computerChoice.length)
    console.log(`Computer play: ${computerChoice[choice]}`)
    return computerChoice[choice]
}
let userScore = 0
let computerScore = 0
const playRound = function() {
    const userSelection = getUserChoice()
    const computerSelection = getComputerChoice()
    if (rules[userSelection] === computerSelection) {
        userScore += 1
        console.log(`
        ${userSelection} beats ${computerSelection}. You Win.
        User: ${userScore}  ||  Computer: ${computerScore}\n`)
    } else if (userSelection === computerSelection) {
        console.log(`
        Draw!
        User: ${userScore}  ||  Computer: ${computerScore}\n`)
    } else {
        computerScore += 1
        console.log(`
        ${computerSelection} beats ${userSelection}. You Lose.
        User: ${userScore}  ||  Computer: ${computerScore}\n`)
    }
}

console.log("Welcome to a quick game of rock! paper! scissors!")
const noOfRounds = parseInt(prompt("How many rounds do you want to go?: "))
const playGame = function () {
    for (let i = 0; i < noOfRounds; i++) {
        playRound()
    }
    console.log(`
    GAME!
    User: ${userScore}  ||  Computer: ${computerScore}`)
}
playGame()
