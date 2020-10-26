//Hamb
let Pets;
let checkbox = document.querySelector('#menu__toggle');
let overlay = document.querySelector("div.hamburger-menu > div");
let card_ul = document.querySelector(".card__ul");
let fullPetsList = [];
let copyFullPetsList = [];
console.log(checkbox);

overlay.addEventListener('click', () => checkbox.checked = false);

//JSON load Pets.json----------------------------------------------------
let requestURL = 'http://localhost:5500/shelter/pages/main/pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';


request.onload = function () {
    Pets = request.response;
    console.log(Pets);

    function fullPets (){
        let tempArr = [];
        for (let i = 0; i < 6; i++) {
            const newPets = Pets;
            for (let j = Pets.length; j > 0; j--) {
                let randId = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randId, 1)[0];
                newPets.push(randElem);
            }
            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    };
    console.log(fullPets());
    let endPets = sort6(fullPets());
    console.log(endPets);
    createcard(endPets);
    


}
request.send();

function sort6  (list)  {
    
    let length = list.length;
    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, a) => {
                return item.name === stepList.name && (a !== j);
            });

            if (duplicatedItem !== undefined) {
                const a = (i * 6) + j;
                const randList = Math.trunc(a / 8);
                list.splice(randList * 8, 0, list.splice(a)[0]);
                sort6(list);
            }
        }
    }
    return list;
}

function createcard(endPets) {
    
    console.log(card_ul);
    card_ul.innerHTML ='';

    for(let i = 0; i<48; i++){
        const cardsItem = document.createElement("li");
        cardsItem.classList.add('card__item')
        cardsItem.innerHTML =
        `<img class="card__img" src="${endPets[i].img}" alt="cat">
        <p class="card__text">${endPets[i].name}</p>
        <a href="" class="card__button button">Learn more</a>`;

        card_ul.appendChild(cardsItem);

    }

    for(let i = 8; i<48; i++){
        card_ul.children[i].classList.add('visually-hidden');
    }


    
}




//-----------------------------------------------------------------------------