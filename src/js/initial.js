import {
    HadleEvent
} from "./HendlerEvent";

import {
    EventObserver
} from "./observer";

import {
    Statistic
} from './statistic';

const statistic = new Statistic;

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
const randomMassForPlay = [0, 1, 2, 3, 4, 5, 6, 7];
let iterator = 0;
let mainPageFlag = true;
let cards;
let plapGame;
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
    toggleMenu.checked = false
});


function clearPage(elementForClean) {
    while (elementForClean.firstChild) {
        elementForClean.removeChild(elementForClean.firstChild);
    }
}

function clear() {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of mainPadeCard.children) {
        item.firstElementChild.classList.remove('disabled');
    }
    startButton.innerText = 'Start';
    clearPage(score);
}

statisticLink.addEventListener('click', () => {
    clearPage(mainPadeCard);
    statisticOverflow.classList.remove('hide');
    statistic.run.addEventListener('click', (event) => {
        statistic.sort(event);
    });
    statistic.staticAddToPage(); // статистика

});

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

function goPlay() {
    startButton.innerText = 'Repeat';
    
    started = true;
    const soundPage = [...document.querySelectorAll('.audio')];
    if (soundPage[randomMassForPlay[iterator]]) soundPage[randomMassForPlay[iterator]].play();
    envisionedCard = randomMassForPlay[iterator];
}

function endingTheGame(result) {
    clearPage(mainPadeCard);
    if (result === 'failure') soundFailure.play();
    else soundSuccess.play();
    mainPadeCard.prepend(addImage(result));
    setTimeout(() => {
        clearPage(score);
        mainPageLink.click();
        buttonTrainPlay.click();
    }, 3000)
}

const StartGameEvent = function clickStartGameEvent(event) {
    if (started) {
        const saveSelectedCard = event.target.closest('.flip-container');
        saveSelectedCardNumber = event.target.closest('.flip-container').dataset.number;
        const textInCard = saveSelectedCard.firstElementChild.children[1].firstElementChild.innerHTML;
        const textInCardTranslate = saveSelectedCard.firstElementChild.children[2].firstElementChild.innerText;

        if (Number(saveSelectedCardNumber) === envisionedCard) {
            statistic.statisticCashWord(textInCard, textInCardTranslate, numberOfCardPage, 0, 1, 0);
            console.log(textInCard, textInCardTranslate);
            score.prepend(addImage("win"));
            soundCorrect.play();
            iterator += 1;
            saveSelectedCardNumber = null;
            saveSelectedCard.classList.add('disabled');
            setTimeout(() => {
                goPlay();
            }, 1000);

            if (iterator === 8) {
                iterator = 0
                if (fail) {
                    endingTheGame('failure');
                } else {
                    endingTheGame('success');
                }
            }

        } else {
            statistic.statisticCashWord(textInCard, textInCardTranslate, numberOfCardPage, 0, 0, 1);
            score.prepend(addImage("loose"));
            soundError.play();
            fail = true;
        }
    }
};

function playGame() { // игра
    clear();
    mainPadeCard.addEventListener('click', StartGameEvent);
    startButton.addEventListener('click', goPlay);
}

buttonTrainPlay.addEventListener('click', () => {
    mainPadeCard.removeEventListener('click', StartGameEvent);
    if (mainPageFlag) document.querySelector('.start-play').style.visibility = 'hidden';
    document.querySelector('.start-play').classList.toggle('hide');
    iterator = 0;
    randomMassForPlay.sort(() => Math.random() - 0.5);
    if (!plapGame) {
        playGame();
        observer.subscribe(HadleEvent.flipAllCard);
        observer.broadcast(cards);
        plapGame = !plapGame;
    } else {
        observer.broadcast(cards);
        observer.unsubscribe(HadleEvent.flipAllCard);
        plapGame = !plapGame
    }
});



clearPage(cardMainContainer);
cardMainContainer.appendChild(mainPadeCard);

function goToPage(part, page) { // переход на страницу
    statisticOverflow.classList.add('hide');
    clearPage(page);
    HadleEvent.createThemeCard(part, page);
}

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
    })
}



function goToPageEvents(event) { // перешли на страницу
    toggleMenu.checked = false;
    const target = event.target.closest('.card__item_sel');
    if (target === null) return;
    numberOfCardPage = target.dataset.pageNumber;
    goToPage(numberOfCardPage, mainPadeCard);
    events();
    mainPageFlag = false;
    if (!mainPageFlag) document.querySelector('.start-play').style.visibility = 'visible';
    mainPadeCard.removeEventListener('click', goToPageEvents);
    observer.broadcast(cards);
}

mainPadeCard.addEventListener('click', goToPageEvents);
otherPageLink.addEventListener('click', goToPageEvents);

mainPageLink.addEventListener('click', () => {
    statisticOverflow.classList.add('hide');
    clearPage(mainPadeCard);
    mainCard.forEach((item) => {
        mainPadeCard.appendChild(item);
    })
    mainPageFlag = true;
    if (mainPageFlag) document.querySelector('.start-play').style.visibility = 'hidden';
    mainPadeCard.addEventListener('click', goToPageEvents);
})


export {
    plapGame,
    cards,
    mainCard,
    mainPageFlag,
    numberOfCardPage,
    statistic,
}