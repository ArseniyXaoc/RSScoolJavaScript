import {
    plapGame,
    mainCard,
    mainPageFlag,
    numberOfCardPage,
} from './initial';
import {
    cards1
} from './cards';
import {
    Statistic
} from './statistic';

const statistic = new Statistic;

const card = Array(8);

class HendlerEvent {
    constructor() {
        this.buttonStart = null;
    }

    // eslint-disable-next-line class-methods-use-this
    playSoundCard(event) {
        if (plapGame) return;
        if (event.target.classList.contains('flipper_back')) return;
        if (event.target.classList.contains('card__image_back')) return;
        //console.log(statistic.statisticArray);
        if (event.target.closest('.flip-container')) {
            const target = event.target.closest('.flip-container');
            const textInCard = target.firstElementChild.children[1].firstElementChild.innerText;
            const textInCardTranslate = target.firstElementChild.children[2].firstElementChild.innerText;
            
            statistic.statisticCashWord(textInCard, textInCardTranslate, numberOfCardPage,1, 0, 0);
            
            target.childNodes[1].childNodes[1].play();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    flipOneCard(event) {
        if (event.target.classList.contains('rotateCard') || event.target.classList.contains("flipper_back")) {
            const target = event.target.closest('.flip-container');
            if (!plapGame) {
                if (event.type === 'click' || event.type === 'mouseout') {
                    target.classList.toggle('flip')
                } else target.classList.toggle('hover');
            }
        }
    }

    // eslint-disable-next-line class-methods-use-this
    flipAllCard(cards) {
        if (cards && !mainPageFlag) {
            cards.forEach((item) => {
                item.classList.toggle('train');
                const flipContainer = item.closest('.flip-container');
                item.childNodes[1].classList.toggle('hidden');
                item.childNodes[5].classList.toggle('hidden');
                item.childNodes[3].classList.toggle('card__image__play');
                if (flipContainer.className === 'flip-container flip') {
                    flipContainer.classList.toggle('flip');
                }
            });
        } else {
            mainCard.forEach(item => {
                item.classList.toggle('play');
            })
        };
    }

    // eslint-disable-next-line class-methods-use-this
    createThemeCard(part, pege) {
        for (let i = 0; i < 8; i += 1) {
            card[i] = document.createElement('div');
            card[i].classList.add("card__item", "card__f")
            card[i].innerHTML =
                `<div class="flip-container" data-number = "${i}">
                    <div class="flipper">
                        <audio class="audio" src="${cards1[part][i].audioSrc}"></audio>
                        <div class="flipper_font">
                            <span>${cards1[part][i].word}</span>
                            <img src ='../${cards1[part][i].image}' class="card__image">
                            <div class="rotateCard"><img class="rotateCard" src="../img/rotate.svg" alt=""></div>
                        </div>
                        <div class="flipper_back">
                            <span>${cards1[part][i].translation}</span><img src ='../${cards1[part][i].image}' class="card__image card__image_back">
                        </div>                        
                    </div>
                </div>`
            pege.appendChild(card[i]);
        }
    }
}

const HadleEvent = new HendlerEvent;

export {
    HadleEvent
}