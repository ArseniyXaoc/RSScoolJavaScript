import {
    dontFlip, cards
} from './initial';

import {
    cards1
} from './cards';

let card = Array(8);
class HendlerEvent {
    constructor(){
    }
    
    flipOneCard(event) {
        if (event.target.closest('.flip-container')) {
            const target = event.target.closest('.flip-container');
            if (!dontFlip) {
                console.log(event.type);
                if (event.type === 'click' || event.type === 'mouseout') {
                    target.classList.toggle('flip')
                } else target.classList.toggle('hover');
            }
        }
    }

    flipAllCard(cards) {
        cards.forEach((item) => {
            item.classList.toggle('train');
            const flipContainer = item.closest('.flip-container');
            if (flipContainer.className === 'flip-container flip') {
                flipContainer.classList.toggle('flip');
            }
        });
    }

    createThemeCard(part, pege) {
        
        for (let i = 0; i < 8; i++) {
            card[i] = document.createElement('div');
            card[i].classList.add("card__item", "card__f")
            card[i].innerHTML =
                `<div class="flip-container">
                    <div class="flipper">
                        <div class="flipper_font">${cards1[part][i].word}<img src ='../${cards1[part][i].image}' class="card__image">
                        </div>
                        <div class="flipper_back">${cards1[part][i].word}<img src ='../${cards1[part][i].image}' class="card__image">
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