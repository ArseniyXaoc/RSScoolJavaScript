import {
    HadleEvent,
} from './HendlerEvent';

import {
    EventObserver,
} from './observer';

import {
    Statistic,
} from './statistic';

const statistic = new Statistic();

const StartButtonString = 'Start';
const buttonTrainPlay = document.querySelector('.checkbox');
const observer = new EventObserver();
const mainPadeCard = document.querySelector('.main-page');
const cardMainContainer = document.querySelector('.wrapper');
const toggleMenu = document.getElementById('menu__toggle');
const startButton = document.querySelector('.start-play');
const soundCorrect = document.querySelector('.audio-correct');
const soundError = document.querySelector('.audio-error');
const soundSuccess = document.querySelector('.audio-success');
const soundFailure = document.querySelector('.audio-failure');
const statisticLink = document.querySelector('.navigation__link_statistic');
const statisticOverflow = document.querySelector('.overflow-st');
const darkening = document.querySelector('.menu_out');
const randomArrayForPlay = [0, 1, 2, 3, 4, 5, 6, 7];
let iterator = 0;
let currentPageIsMainPage= true;
let cards;
let playTheGame;
let started = false;
let saveSelectedCardNumber;
let envisionedCard;
let fail = false;
let numberOfCardPage;

const mainCard = [...document.querySelectorAll('.card__item')];
const mainPageLink = document.querySelector('.navigation__link_top');
const otherPageLink = document.querySelector('.menu__box');
const score = document.querySelector('.score');
darkening.addEventListener('click', () => {
    toggleMenu.checked = false;
});

statistic.clean.addEventListener('click', () => {
    localStorage.setItem('statisticArray', null);
    statistikShow();
});

function clearElement(elementForClean) {
    while (elementForClean.firstChild) {
        elementForClean.removeChild(elementForClean.firstChild);
    }
}

function clearPage() {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of mainPadeCard.children) {
        item.firstElementChild.classList.remove('disabled');
    }
    startButton.innerText = StartButtonString;
    clearElement(score);
}

const sortStatistic = (event) => {
    statistic.sort(event);
};

const statistikShow = () => {
    if (localStorage.getItem('statisticArray')) statistic.statisticArray = JSON.parse(localStorage.getItem('statisticArray'));
    if (localStorage.getItem('statisticArray') === 'null') {
        statistic.statisticArray = [{
            word: '',
            translation: '',
            category: '',
            click: 0,
            correct: 0,
            wrong: 0,
            errors: 0,
        }];
    }
    clearElement(mainPadeCard);
    statisticOverflow.classList.remove('hide');
    statistic.run.addEventListener('click', sortStatistic);
    statistic.staticAddToPage(); 
};

statisticLink.addEventListener('click', statistikShow);

function addImage(f) {
    const star = document.createElement('img');
    star.setAttribute('src', './img/star.svg');
    const starWin = document.createElement('img');
    starWin.setAttribute('src', './img/star-win.svg');
    const success = document.createElement('img');
    success.setAttribute('src', './img/success.jpg');
    const failure = document.createElement('img');
    failure.setAttribute('src', './img/failure.jpg');
    switch (f) {
    case 'win':
        return starWin;
    case 'loose':
        return star;
    case 'success':
        return success;
    case 'failure':
        return failure;
    default:
        break;
    }
    return null;
}

function startGame() {
    startButton.innerText = 'Repeat';

    started = true;
    const soundPage = [...document.querySelectorAll('.audio')];
    if (soundPage[randomArrayForPlay[iterator]]) soundPage[randomArrayForPlay[iterator]].play();
    envisionedCard = randomArrayForPlay[iterator];
}

function endingTheGame(result) {
    clearElement(mainPadeCard);
    if (result === 'failure') soundFailure.play();
    else soundSuccess.play();
    mainPadeCard.prepend(addImage(result));
    setTimeout(() => {
        clearElement(score);
        mainPageLink.click();
        buttonTrainPlay.click();
    }, 3000);
}

const startGameEvent = function clickStartGameEvent(event) {
    if (started) {
        const saveSelectedCard = event.target.closest('.flip-container');
        saveSelectedCardNumber = event.target.closest('.flip-container').dataset.number;
        const textInCard = saveSelectedCard.firstElementChild.children[1].firstElementChild.innerHTML;
        const textInCardTranslate = saveSelectedCard.firstElementChild.children[2].firstElementChild.innerText;
        const maximumNumbersCards = 8;

        if (Number(saveSelectedCardNumber) === envisionedCard) {
            const click = 0;
            const correct = 1;
            const wrong = 0;
            statistic.statisticAddWord(textInCard, textInCardTranslate, numberOfCardPage, click, correct, wrong);
            score.prepend(addImage('win'));
            soundCorrect.play();
            iterator += 1;
            saveSelectedCardNumber = null;
            saveSelectedCard.classList.add('disabled');
            setTimeout(() => {
                startGame();
            }, 1000);

            if (iterator === maximumNumbersCards) {
                iterator = 0;
                if (fail) {
                    endingTheGame('failure');
                } else {
                    endingTheGame('success');
                }
            }
        } else {
            const click = 0;
            const correct = 0;
            const wrong = 1;
            statistic.statisticAddWord(textInCard, textInCardTranslate, numberOfCardPage, click, correct, wrong);
            score.prepend(addImage('loose'));
            soundError.play();
            fail = true;
        }
    }
};

function playGame() { // игра
    clearPage();
    mainPadeCard.addEventListener('click', startGameEvent);
    startButton.addEventListener('click', startGame);
}

buttonTrainPlay.addEventListener('click', () => {
    mainPadeCard.removeEventListener('click', startGameEvent);
    if (currentPageIsMainPage) document.querySelector('.start-play').classList.toggle('.hide');
    document.querySelector('.start-play').classList.toggle('hide');
    iterator = 0;
    randomArrayForPlay.sort(() => Math.random() - 0.5);
    if (!playTheGame) {
        playGame();
        observer.subscribe(HadleEvent.flipAllCard);
        observer.broadcast(cards);
        playTheGame = !playTheGame;
    } else {
        observer.broadcast(cards);
        observer.unsubscribe(HadleEvent.flipAllCard);
        playTheGame = !playTheGame;
    }
});

clearElement(cardMainContainer);
cardMainContainer.appendChild(mainPadeCard);

function events() {
    cards = [...document.querySelectorAll('.flipper_font')];
    const cardFlipperBack = [...document.querySelectorAll('.flipper_back')];
    const flipContainer = document.querySelector('.card');
    flipContainer.addEventListener('touchstart', HadleEvent.playSoundCard);
    flipContainer.addEventListener('click', HadleEvent.playSoundCard);
    flipContainer.addEventListener('click', HadleEvent.flipOneCard);
    cardFlipperBack.forEach((item) => {
        item.addEventListener('mouseout', (event) => {
            if (event.relatedTarget.classList.contains('main-page') || event.relatedTarget.classList.contains('flip-container')) {
                HadleEvent.flipOneCard(event);
            }
        });
    });
}

function goToPage(part, page) {
    statisticOverflow.classList.add('hide');
    clearElement(page);
    HadleEvent.createThemeCard(part, page);
}

function goToPageEvents(event) {
    toggleMenu.checked = false;
    const target = event.target.closest('.card__item_selector');
    if (target === null) return;
    numberOfCardPage = target.dataset.pageNumber;
    goToPage(numberOfCardPage, mainPadeCard);
    events();
    currentPageIsMainPage= false;
    if (!currentPageIsMainPage) document.querySelector('.start-play').style.visibility = 'visible';
    mainPadeCard.removeEventListener('click', goToPageEvents);
    observer.broadcast(cards);
}

mainPadeCard.addEventListener('click', goToPageEvents);
otherPageLink.addEventListener('click', goToPageEvents);

mainPageLink.addEventListener('click', () => {
    statistic.run.removeEventListener('click', sortStatistic);
    statisticOverflow.classList.add('hide');
    clearElement(mainPadeCard);
    mainCard.forEach((item) => {
        mainPadeCard.appendChild(item);
    });
    currentPageIsMainPage= true;
    if (currentPageIsMainPage) document.querySelector('.start-play').style.visibility = 'hidden';
    mainPadeCard.addEventListener('click', goToPageEvents);
});

export {
    playTheGame,
    cards,
    mainCard,
    currentPageIsMainPage,
    numberOfCardPage,
    statistic,
};
