const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

const cardColors = {
    'A': 'red',
    'B': 'green',
    'C': 'blue',
    'D': 'yellow',
    'E': 'purple',
    'F': 'orange',
    'G': 'pink',
    'H': 'cyan'
};

const cards = Object.keys(cardColors).flatMap(key => [key, key]);
let firstCard, secondCard;
let lockBoard = false;

restartButton.addEventListener('click', restartGame);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.classList.add('shuffling');
    gameBoard.innerHTML = '';
    shuffle(cards);
    setTimeout(() => {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.card = card;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
        gameBoard.classList.remove('shuffling');
    }, 500);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.style.backgroundColor = cardColors[this.dataset.card];

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    resetBoard();
    createBoard();
}

createBoard();
