import {
    plapGame,
    cards,
    mainCard,
    mainPageFlag,
} from './initial';

import {
    cards1
} from './cards';


let card = Array(8);

class HendlerEvent {
    constructor() {}

    playSoundCard(event) {
        if (event.target.closest('.flip-container')) {
            const target = event.target.closest('.flip-container');
            target.childNodes[1].childNodes[1].play();}
    }

    flipOneCard(event) {   
      
        if (event.target.classList.contains('rotateCard') || event.target.classList.contains("flipper_back")) {
            const target = event.target.closest('.flip-container');
            //target.childNodes[1].childNodes[1].play();
            if (!plapGame) {
                console.log(event.type);
                if (event.type === 'click' || event.type === 'mouseout') {
                    target.classList.toggle('flip')
                } else target.classList.toggle('hover');
            }
        }
    }

    flipAllCard(cards) {

        if (cards && !mainPageFlag) {
            cards.forEach((item) => {
                item.classList.toggle('train');
                const flipContainer = item.closest('.flip-container');
                item.childNodes[1].classList.toggle('hidden');
                item.childNodes[5].classList.toggle('hidden');
                item.childNodes[3].classList.toggle('card__image__play');
                console.log(item.childNodes);
                if (flipContainer.className === 'flip-container flip') {
                    flipContainer.classList.toggle('flip');
                }
            });
        } else {
            //console.log(mainCard);
            mainCard.forEach(item => {
                item.classList.toggle('play');
            })
        };
    }

    createThemeCard(part, pege) {

        for (let i = 0; i < 8; i++) {
            card[i] = document.createElement('div');
            card[i].classList.add("card__item", "card__f")
            card[i].innerHTML =
                `<div class="flip-container">
                    <div class="flipper">
                        <audio class="audio" src="${cards1[part][i].audioSrc}"></audio>
                        <div class="flipper_font">
                            <span>${cards1[part][i].word}</span>
                            <img src ='../${cards1[part][i].image}' class="card__image">
                            <div class="rotateCard"><img class="rotateCard" src="../img/rotate.svg" alt=""></div>
                        </div>
                        <div class="flipper_back">
                            <span>${cards1[part][i].translation}</span><img src ='../${cards1[part][i].image}' class="card__image">
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