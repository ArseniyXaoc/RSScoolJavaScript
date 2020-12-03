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
const soundCorrect = document.querySelector('.audio-correct');
const soundError = document.querySelector('.audio-error');
const soundSuccess = document.querySelector('.audio-success');
const soundFailure = document.querySelector('.audio-failure');
const darkening = document.querySelector('.menu_out');
let randomMassForPlay = [0, 1, 2, 3, 4, 5, 6, 7];
let iterator = 0;
let foo;
const pageArr = [...mainPadeCard.childNodes];
let mainPageFlag;
let cards;
let plapGame;
let mainCard = [...document.querySelectorAll('.card__item')];
const mainPageLink = document.querySelector('.navigation__link_top');
const otherPageLink = document.querySelector('.menu__box');

darkening.addEventListener('click', () => toggleMenu.checked = false);

function playGame(params) { // игра

    const score = document.querySelector('.score');
    let saveSelectedCardNumber;
    let envisionedCard;
    let started = false;
    let fail = false;

    function clear() {
        
        for (let item of mainPadeCard.children) {
            console.log(item.firstElementChild);
            item.firstElementChild.classList.remove('disabled');
        }
        startButton.innerText = 'Start';
        clearPage(score);
    }

    clear();

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
                break;
            case 'loose':
                return star;
                break;
            case 'success':
                return success
                break;
            case 'failure':
                return failure
                break;

            default:
                break;
        }
        
    }

    foo = function clickStartGameEvent(event) {
        if (started) {
            const saveSelectedCard = event.target.closest('.flip-container');
            saveSelectedCardNumber = event.target.closest('.flip-container').dataset.number;

            if (saveSelectedCardNumber == envisionedCard) {
                score.prepend(addImage("win"));
                soundCorrect.play();
                iterator = iterator + 1;
                saveSelectedCardNumber = null;
                saveSelectedCard.classList.add('disabled');
                setTimeout(() => {
                    goPlay();
                }, 1000);

                if (iterator === 8) {
                    iterator = 0
                    
                    if (fail) {
                        clearPage(mainPadeCard);
                        soundFailure.play();
                        mainPadeCard.prepend(addImage('failure'));
                        setTimeout(() => {
                            clearPage(score);
                            mainPageLink.click();
                            buttonTrainPlay.click();
                        }, 3000)
                                    
                        
                    } else {
                        clearPage(mainPadeCard);
                        soundSuccess.play();
                        mainPadeCard.prepend(addImage('success'));
                        setTimeout(() => {
                            clearPage(score);
                            mainPageLink.click();
                            buttonTrainPlay.click();
                        }, 3000)
                       
                    }


                }

            } else {
                score.prepend(addImage("loose"));
                soundError.play();
                fail = true;
            }
        }
    };

    mainPadeCard.addEventListener('click', foo);
    startButton.addEventListener('click', goPlay);

    function goPlay(params) {
        startButton.innerText = 'Repeat';
        started = true;
        const soundPage = [...document.querySelectorAll('.audio')];
        soundPage[randomMassForPlay[iterator]].play();
        envisionedCard = randomMassForPlay[iterator];
    }
}
//observer.subscribe(HadleEvent.flipAllCard);
buttonTrainPlay.addEventListener('click', () => {
    mainPadeCard.removeEventListener('click', foo);
    document.querySelector('.start-play').classList.toggle('hide');
    iterator = 0;
    randomMassForPlay.sort((a, b) => Math.random() - 0.5);
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