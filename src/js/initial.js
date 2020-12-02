import {
    cards1
} from './cards';

import {
    HadleEvent
} from "./HendlerEvent";
import {
    EventObserver
} from "./observer";

const buttonTrainPlay = document.querySelector('.checkbox');
const observer = new EventObserver();
const mainPadeCard = document.querySelector('.main-page');
const cardMainContainer = document.querySelector('.wrapper');
const toggleMenu = document.getElementById('menu__toggle');
const startButton = document.querySelector('.start-play');
let randomMassForPlay = [0, 1, 2, 3, 4, 5, 6, 7];
let iterator = 0;

const pageArr = [...mainPadeCard.childNodes];

let mainPageFlag;
let cards;
let plapGame;
let mainCard = [...document.querySelectorAll('.card__item')];
const mainPageLink = document.querySelector('.navigation__link_top');
const otherPageLink = document.querySelector('.menu__box');

function playGame(params) {
    let saveSelectedCard;
    let envisionedCard;
    let started = false;

    mainPadeCard.addEventListener('click', clickStartGameEvent);

    function clickStartGameEvent(event) {
        if(started){
            saveSelectedCard = event.target.closest('.flip-container').dataset.number;
            console.log(saveSelectedCard);
            console.log(envisionedCard);
            if(saveSelectedCard ==  envisionedCard){
                iterator = iterator === 7 ? 0 : iterator + 1;
            }            
        }
    };   

    startButton.addEventListener('click', goPlay);

    function goPlay(params) {
        started = true;
        const soundPage = [...document.querySelectorAll('.audio')];
        soundPage[randomMassForPlay[iterator]].play();
        envisionedCard = randomMassForPlay[iterator];        
        
    }
}
//observer.subscribe(HadleEvent.flipAllCard);

buttonTrainPlay.addEventListener('click', () => {
    document.querySelector('.start-play').classList.toggle('hide');
    iterator = 0;
    randomMassForPlay.sort((a, b) => Math.random() - 0.5);
    console.log(randomMassForPlay);
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

mainPageLink.addEventListener('click', () => {
    clearPage(mainPadeCard);
    mainCard.forEach((item) => {
        mainPadeCard.appendChild(item);
    })
    mainPageFlag = true;
    mainPadeCard.addEventListener('click', goToPageEvents);
})

clearPage(cardMainContainer);

function clearPage(elementForClean) {
    while (elementForClean.firstChild) {
        elementForClean.removeChild(elementForClean.firstChild);
    }
}

cardMainContainer.appendChild(mainPadeCard);

function goToPage(part, page) { // переход на страницу
    clearPage(page);
    HadleEvent.createThemeCard(part, page);
}

mainPadeCard.addEventListener('click', goToPageEvents);
otherPageLink.addEventListener('click', goToPageEvents);

function goToPageEvents(event) { // перешли на страницу
    toggleMenu.checked = false;
    console.dir(toggleMenu);
    let target = event.target.closest('.card__item_sel');
    let numberOfCardPage = target.dataset.pageNumber;
    goToPage(numberOfCardPage, mainPadeCard);
    events();
    mainPageFlag = false;
    mainPadeCard.removeEventListener('click', goToPageEvents);
    observer.broadcast(cards);
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

export {
    plapGame,
    cards,
    mainCard,
    mainPageFlag,
}