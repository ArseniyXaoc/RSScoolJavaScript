import {
    playTheGame,
    mainCard,
    currentPageIsMainPage,
    numberOfCardPage,
    statistic,
} from './initial';
import {
    cards1,
} from './cards';

// const card = Array(8);

class GameInteractionHendlerEvent {
    constructor() {
        this.buttonStart = null;
        this.card = Array(8);
    }

    playSoundCard(event) {
        if (playTheGame) return;
        if (event.target.classList.contains('flipper_back')) return;
        if (event.target.classList.contains('card__image_back')) return;
        if (event.target.closest('.flip-container')) {
            const target = event.target.closest('.flip-container');
            const textInCard = target.querySelector('.card_english_word').innerText;
            const textInCardTranslate = target.querySelector('.card_russian_word').innerText;
            statistic.statisticAddWord(textInCard, textInCardTranslate, numberOfCardPage, 1, 0, 0);
            target.childNodes[1].childNodes[1].play();
        }
    }

    flipOneCard(event) {
        if (event.target.classList.contains('rotateCard') || event.target.classList.contains('flipper_back')) {
            const target = event.target.closest('.flip-container');
            if (!playTheGame) {
                if (event.type === 'click' || event.type === 'mouseout') target.classList.toggle('flip');
                else target.classList.toggle('hover');
            }
        }
    }

    flipAllCard(cards) {
        if (cards && !currentPageIsMainPage) {
            cards.forEach((item) => {
                const cardEnglishWord = item.childNodes[1];
                const cardRotateButton = item.childNodes[5];
                const cardImage = item.childNodes[3];
                item.classList.toggle('train');
                const flipContainer = item.closest('.flip-container');
                cardEnglishWord.classList.toggle('hidden');
                cardRotateButton.classList.toggle('hidden');
                cardImage.classList.toggle('card__image__play');
                if (flipContainer.className === 'flip-container flip') {
                    flipContainer.classList.toggle('flip');
                }
            });
        } else {
            mainCard.forEach((item) => {
                item.classList.toggle('play');
            });
        }
    }

    createThemeCard(numberOfpege, currentPageContainer) {
        for (let i = 0; i < 8; i += 1) {
            this.card[i] = document.createElement('div');
            this.card[i].classList.add('card__item', 'card__f');
            this.card[i].innerHTML = `<div class="flip-container" data-number = "${i}">
                    <div class="flipper">
                        <audio class="audio" src="${cards1[numberOfpege][i].audioSrc}"></audio>
                        <div class="flipper_font">
                            <span class ='card_english_word'>${cards1[numberOfpege][i].word}</span>
                            <img src ='../${cards1[numberOfpege][i].image}' class="card__image">
                            <div class="rotateCard"><img class="rotateCard" src="../img/rotate.svg" alt=""></div>
                        </div>
                        <div class="flipper_back">
                            <span class ='card_russian_word'>${cards1[numberOfpege][i].translation}</span><img src ='../${cards1[numberOfpege][i].image}' class="card__image card__image_back">
                        </div>                        
                    </div>
                </div>`;
                currentPageContainer.appendChild(this.card[i]);
        }
    }
}

const HadleEvent = new GameInteractionHendlerEvent();

export {
    HadleEvent,
};
