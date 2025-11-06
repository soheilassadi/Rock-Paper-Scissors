let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resetButton = document.getElementById('reset');
const scoreParagraph = document.getElementById('score');
const movesParagraph = document.getElementById('moves');
const resultParagraph = document.getElementById('result');

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 0.33) {
        computerMove = 'Rock';
    } else if (randomNumber >= 0.33 && randomNumber < 0.66) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }
    return computerMove;
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = "Tie!";
        } else if (computerMove === 'Paper') {
            result = "Computer wins!";
        } else {
            result = "You win!";
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = "You win!";
        } else if (computerMove === 'Paper') {
            result = "Tie!";
        } else {
            result = "Computer wins!";
        }
    } else {
        if (computerMove === 'Paper') {
            result = "You win!";
        } else if (computerMove === 'Scissors') {
            result = "Tie!";
        } else {
            result = "Computer wins!";
        }
    }

    if (result === "You win!") {
        score.wins += 1;
    } else if (result === "Computer wins!") {
        score.losses += 1;
    } else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateResultElement(result);
    updateMovesElement(playerMove, computerMove);
    updateScoreElement();

}

function updateScoreElement() {
    scoreParagraph.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties} `;
}

function updateMovesElement(playerMove, computerMove) {
    movesParagraph.innerHTML = `You 
    <img src="/images/${playerMove.toLowerCase()}-emoji.png" class="move-icon">
    Computer 
    <img src="/images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">`;
}

function updateResultElement(result) {
    resultParagraph.textContent = result;
}

rockButton.addEventListener('click', () => {
    const computerMove = pickComputerMove();
    playGame('Rock');
});


paperButton.addEventListener('click', () => {
    const computerMove = pickComputerMove();
    playGame('Paper');
});


scissorsButton.addEventListener('click', () => {
    const computerMove = pickComputerMove();
    playGame('Scissors');
});

resetButton.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateResultElement('');
    //updateMovesElement('', '');
    movesParagraph.textContent = '';
    updateScoreElement();
    alert('Score has been reset!');
});
