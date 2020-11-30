import {
    cards1
} from './cards';
import '../img/angry.jpg';
import '../img/bird.jpg';
import '../img/blouse.jpg';
import '../img/boot.jpg';
import '../img/cat.jpg';
import '../img/chick.jpg';
import '../img/chicken.jpg';
import '../img/coat.jpg';
import '../img/cry.jpg';
import '../img/dance.jpg';
import '../img/dive.jpg';
import '../img/dog.jpg';
import '../img/dolphin.jpg';
import '../img/draw.jpg';
import '../img/dress.jpg';
import '../img/fish.jpg';
import '../img/fish1.jpg';
import '../img/fly.jpg';
import '../img/frog.jpg';
import '../img/happy.jpg';
import '../img/horse.jpg';
import '../img/hug.jpg';
import '../img/jump.jpg';
import '../img/laugh.jpg';
import '../img/lion.jpg';
import '../img/mouse.jpg';
import '../img/open.jpg';
import '../img/pig.jpg';
import '../img/play.jpg';
import '../img/point.jpg';
import '../img/rabbit.jpg';
import '../img/ride.jpg';
import '../img/run.jpg';
import '../img/sad.jpg';
import '../img/sheep.jpg';
import '../img/shirt.jpg';
import '../img/shoe.jpg';
import '../img/sing.jpg';
import '../img/skip.jpg';
import '../img/skirt.jpg';
import '../img/smile.jpg';
import '../img/success.jpg';
import '../img/surprised.jpg';
import '../img/swim.jpg';
import '../img/tired.jpg';
import '../img/turtle.jpg';
import {HadleEvent} from "./HendlerEvent";
import {EventObserver} from "./observer";

const buttonTrainPlay = document.querySelector('.checkbox');
const observer = new EventObserver();
observer.subscribe(HadleEvent.flipAllCard);
let cards;
let dontFlip;

buttonTrainPlay.addEventListener('click', () => {
    observer.broadcast(cards);
    dontFlip = !dontFlip;
});

const mainPadeCard = document.querySelector('.main-page');
const cardMainContainer = document.querySelector('.wrapper');

clearPage(cardMainContainer);

function clearPage(elementForClean) {
    while (elementForClean.firstChild) {
        elementForClean.removeChild(elementForClean.firstChild);
    }
}

cardMainContainer.appendChild(mainPadeCard);
console.log(mainPadeCard);

function goToPage(part, page) { // переход на страницу
    clearPage(page);
    HadleEvent.createThemeCard(part, page);
}

mainPadeCard.addEventListener('click', function go(){ // перешли на страницу
    goToPage(1, mainPadeCard);
    events();
    mainPadeCard.removeEventListener('click', go);
});

function events () {
    cards = [...document.querySelectorAll('.flipper_font')];
    const cardFlipperBack = [...document.querySelectorAll('.flipper_back')];
    const flipContainer = document.querySelector('.card');    
    flipContainer.addEventListener('touchstart', HadleEvent.flipOneCard);
    flipContainer.addEventListener('click', HadleEvent.flipOneCard);
    cardFlipperBack.forEach((item) => {
        item.addEventListener('mouseout', (event) => {
            console.log(event.relatedTarget);
            if(event.relatedTarget === document.){
                console.log('asd');
                HadleEvent.flipOneCard(event);
            }
            
        });   
    })
}

export {
    dontFlip,
    cards
}  