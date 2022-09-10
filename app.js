let isSecondCardFlipped = false;

const difficultySelector = document.querySelectorAll('.difficulty');
const gameContainer = document.querySelector('#container');

const colorsHard = ['red', 'blue', 'yellow', 'green', 'purple', 'brown', 'black', 'darkorange', 'teal', 'cyan', 'grey', 'olive', 'fuchsia', 'white', 'salmon', 'red', 'blue', 'yellow', 'green', 'purple', 'brown', 'black', 'darkorange', 'teal', 'cyan', 'grey', 'olive', 'fuchsia', 'white', 'salmon'];
const colorsMedium = ['red', 'blue', 'yellow', 'green', 'purple', 'brown', 'darkorange', 'teal', 'grey', 'fuchsia', 'red', 'blue', 'yellow', 'green', 'purple', 'brown', 'darkorange', 'teal', 'grey', 'fuchsia'];
const colorsEasy = ['red', 'blue', 'yellow', 'green', 'purple', 'red', 'blue', 'yellow', 'green', 'purple'];

const startGame = (difficulty) => {
    difficultySelector.forEach((button) => button.disabled = true);

    let numberOfCards;
    let colors;

    if (difficulty === 'hard') {
        numberOfCards = colorsHard.length;
        colors = colorsHard;
    } else if (difficulty === 'medium') {
        numberOfCards = colorsMedium.length;
        colors = colorsMedium;
    } else if (difficulty === 'easy') {
        numberOfCards = colorsEasy.length;
        colors = colorsEasy;
    };

    colors.sort(() => 0.5 - Math.random());

    let cardOne;
    let cardTwo;

    const checkPair = () => {
        if (cardOne.style.backgroundColor === cardTwo.style.backgroundColor) {
            gameContainer.removeChild(cardOne);
            gameContainer.removeChild(cardTwo);
        } else {
            cardOne.style.backgroundColor = '';
            cardTwo.style.backgroundColor = '';
            cardOne.innerText = '?';
            cardTwo.innerText = '?';
        };

        cardOne = null;
        cardTwo = null;

        isSecondCardFlipped = false;

        if (gameContainer.hasChildNodes() === false) {
            difficultySelector.forEach((button) => button.disabled = false);
            
        };
    };

    const cardFlip = (card) => {
        if (!cardOne && isSecondCardFlipped === false) {
            cardOne = card;
            cardOne.innerText = '';
            cardOne.style.backgroundColor = colors[Object.values(cards).indexOf(cardOne)];
        } else if (cardOne && isSecondCardFlipped === false) {
            isSecondCardFlipped = true;
            cardTwo = card;
            cardTwo.innerText = '';
            cardTwo.style.backgroundColor = colors[Object.values(cards).indexOf(cardTwo)];
            setTimeout(checkPair, 1000);
        }
    };

    for (let i = 0; i < numberOfCards; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.innerText = '?';
        gameContainer.appendChild(card);
    };

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.addEventListener('click', () => cardFlip(card)));
};

difficultySelector.forEach((button) => {
    button.addEventListener('click', () => startGame(button.getAttribute('id')));
});