//Hamb
let Pets;
let checkbox = document.querySelector('#menu__toggle');
let overlay = document.querySelector("div.hamburger-menu > div");
let card_ul = document.querySelector(".card__ul");
let fullPetsList = [];
let copyFullPetsList = [];
console.log(checkbox);
let numCardOnPage;
const bodyWidth = document.querySelector('body').offsetWidth;
numCardOnPage = bodyWidth >= 1280 ? 8 : bodyWidth >= 768 ? 6 : 3;
console.log(numCardOnPage);
const btn_last_page = document.querySelector(".arrow__fullright");
const btn_first_page = document.querySelector(".arrow__fullleft");
console.log(btn_first_page);
const btn_right = document.querySelector(".arrow__right");
const btn_left = document.querySelector(".arrow__left");
let numofpages = 1;
pagesShowNum = document.querySelector("body > div > div.wrap_color > div > section > div.pets__switch > button:nth-child(3)");
const popup = document.querySelector(".popup");
const popupbtn = document.querySelector(".card__ul");
const wr2 = document.querySelector(".wr2");





overlay.addEventListener('click', () => {
    checkbox.checked = false;
    document.body.style.overflow = 'auto';
});

checkbox.addEventListener('change', () => {
    if(checkbox.checked === true){
        document.body.style.overflow = 'hidden';
    }
    else document.body.style.overflow = 'auto';
})



//JSON load Pets.json----------------------------------------------------
let requestURL = '../main/pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';


request.onload = function () {
    Pets = request.response;
    console.log(Pets);

    function fullPets() {
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

    popupbtn.addEventListener('click', popup_create);

//Popup
    function popup_create(event) {
        let id = event.target.closest('li');
        console.log(id.children[1].innerText);
        console.log(Pets);
        let indexOfPet = Pets.find((item, index, array) =>{            
            if(Pets[index].name === id.children[1].innerText){
                return true;
            }
        });
        console.log(indexOfPet);

        const name = indexOfPet.name;
        const img = indexOfPet.img;
        const type = indexOfPet.type;
        const breed = indexOfPet.breed;
        const description = indexOfPet.description;
        const age = indexOfPet.age;
        const inoculations = indexOfPet.inoculations;
        const diseases = indexOfPet.diseases;
        const parasites = indexOfPet.parasites;
        
    
        popup.innerHTML = `
        <button class="popup__close"><img src="../../assets/icons/Vector.png" alt=""></button>
        <div class="popup__img"><img src="${img}" alt=""></div>
        <div class="popup__text">
            <div class="popup__text_wrapper">
                <h3 class="popup__name">${name}</h3>
                <h4 class="popup__type">${type} - ${breed}</h4>
                <h5 class="popup__description">${description}</h5>
                <ul>
                    <li class="popup_list"><span class="popup__Age popup__param">Age: <span class="popup__param2">${age}</span></span></li>
                    <li class="popup_list"><span class="popup__Inoculations popup__param">Inoculations:<span class="popup__param2">${inoculations}</span></span></li>
                    <li class="popup_list"><span class="popup__Diseases popup__param">Diseases: <span class="popup__param2">${diseases}</span></span></li>
                    <li class="popup_list"><span class="popup__Parasites popup__param">Parasites: <span class="popup__param2">${parasites}</span></span></li>
                </ul>
            </div>
        </div>`;
        const popupclose = document.querySelector(".popup__close");
    
        
        popup.classList.add('popup__show');
        wr2.classList.add('back_black');
        document.body.style.overflow = 'hidden';
        console.log(popupclose);
        popupclose.addEventListener('click', () => {
            popup.classList.remove('popup__show');
            wr2.classList.remove('back_black');
            document.body.style.overflow = 'auto';
        })
    
        wr2.addEventListener('click', () => {
            popup.classList.remove('popup__show');
            wr2.classList.remove('back_black');
            document.body.style.overflow = 'auto';
        })
    }
//Popup end


}
request.send();

function sort6(list) {

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
    card_ul.innerHTML = '';

    for (let i = 0; i < 48; i++) {
        const cardsItem = document.createElement("li");
        cardsItem.classList.add('card__item')
        cardsItem.innerHTML =
            `<img class="card__img" src="${endPets[i].img}" alt="cat">
        <p class="card__text">${endPets[i].name}</p>
        <a href="" class="card__button button">Learn more</a>`;
        card_ul.appendChild(cardsItem);
    }
    cardonpages(bodyWidth);
}

function cardonpages(width) {
    console.log(width);
    const numCardOnPage = width >= 1280 ? 8 : width >= 768 ? 6 : 3;
    for (let i = numCardOnPage; i < 48; i++) {
        card_ul.children[i].classList.add('visually-hidden');
    }
}

window.addEventListener('resize', function (event) {

    let width = document.querySelector('body').offsetWidth;
    numCardOnPage = width >= 1280 ? 8 : width >= 768 ? 6 : 3;
    console.log(numCardOnPage);
    for (let i = numCardOnPage; i < 48; i++) {
        card_ul.children[i].classList.add('visually-hidden');
    }

    for (let i = 0; i < numCardOnPage; i++) {
        card_ul.children[i].classList.remove('visually-hidden');
    }
});

function lastpage() {
    numofpages = 48 / numCardOnPage;
    pagesShowNum.innerText = numofpages;

    console.log(numCardOnPage);
    for (let i = 0; i < 48 - numCardOnPage; i++) {
        card_ul.children[i].classList.add('visually-hidden');
    }
    for (let i = 48 - numCardOnPage; i < 48; i++) {
        card_ul.children[i].classList.remove('visually-hidden');
    }
    btn_last_page.classList.add("arrow_unactiv");
    btn_last_page.classList.remove("arrow_active");
    btn_last_page.setAttribute("disabled", "true");

    btn_right.classList.add("arrow_unactiv");
    btn_right.classList.remove("arrow_active");
    btn_right.setAttribute("disabled", "true");


    btn_first_page.classList.add("arrow_active");
    btn_first_page.classList.remove("arrow_unactiv");
    btn_first_page.removeAttribute("disabled");

    btn_left.classList.add("arrow_active");
    btn_left.classList.remove("arrow_unactiv");
    btn_left.removeAttribute("disabled");


}

function firstpage() {
    numofpages = 48 / numCardOnPage;
    pagesShowNum.innerText = 1;

    console.log(numCardOnPage);
    for (let i = numCardOnPage; i < 48; i++) {
        card_ul.children[i].classList.add('visually-hidden');
    }

    for (let i = 0; i < numCardOnPage; i++) {
        card_ul.children[i].classList.remove('visually-hidden');
    }
    btn_last_page.classList.remove("arrow_unactiv");
    btn_last_page.classList.add("arrow_active");
    btn_last_page.removeAttribute("disabled");

    btn_right.classList.remove("arrow_unactiv");
    btn_right.classList.add("arrow_active");
    btn_right.removeAttribute("disabled");

    btn_first_page.classList.remove("arrow_active");
    btn_first_page.classList.add("arrow_unactiv");
    btn_first_page.setAttribute("disabled", "true");

    btn_left.classList.add("arrow_unactiv");
    btn_left.classList.remove("arrow_active");
    btn_left.setAttribute("disabled", "true");
}

function next_page() {

    btn_first_page.classList.add("arrow_active");
    btn_first_page.classList.remove("arrow_unactiv");
    btn_first_page.removeAttribute("disabled");

    btn_left.classList.add("arrow_active");
    btn_left.classList.remove("arrow_unactiv");
    btn_left.removeAttribute("disabled");

    let x = +pagesShowNum.innerText;
    console.log(x);


    for (let i = x * numCardOnPage; i < (x + 1) * numCardOnPage; i++) {
        card_ul.children[i].classList.remove('visually-hidden');
    }
    for (let i = 0; i < x * numCardOnPage; i++) {
        card_ul.children[i].classList.add('visually-hidden');
    }
    console.log(numCardOnPage);
    if (x == 48 / numCardOnPage-1) {
        btn_last_page.classList.add("arrow_unactiv");
        btn_last_page.classList.remove("arrow_active");
        btn_last_page.setAttribute("disabled", "true");

        btn_right.classList.add("arrow_unactiv");
        btn_right.classList.remove("arrow_active");
        btn_right.setAttribute("disabled", "true");


        btn_first_page.classList.add("arrow_active");
        btn_first_page.classList.remove("arrow_unactiv");
        btn_first_page.removeAttribute("disabled");

        btn_left.classList.add("arrow_active");
        btn_left.classList.remove("arrow_unactiv");
        btn_left.removeAttribute("disabled");

    }



    x++;
    pagesShowNum.innerText = x;
}

btn_right.addEventListener('click', next_page);


function previos_page() {

    btn_last_page.classList.remove("arrow_unactiv");
    btn_last_page.classList.add("arrow_active");
    btn_last_page.removeAttribute("disabled");

    btn_right.classList.remove("arrow_unactiv");
    btn_right.classList.add("arrow_active");
    btn_right.removeAttribute("disabled");

    


    let x = +pagesShowNum.innerText;
    console.log(x);


    for (let i = ((x-1) * numCardOnPage); i >= ((x - 2) * numCardOnPage); i--) {
        console.log(i);
        card_ul.children[i].classList.remove('visually-hidden');
    }
     for (let i = x * numCardOnPage; i > ((x-1) * numCardOnPage); i--) {
         card_ul.children[i-1].classList.add('visually-hidden');
     }
    if (x == 2) {
        btn_last_page.classList.remove("arrow_unactiv");
        btn_last_page.classList.add("arrow_active");
        btn_last_page.removeAttribute("disabled");
    
        btn_right.classList.remove("arrow_unactiv");
        btn_right.classList.add("arrow_active");
        btn_right.removeAttribute("disabled");
    
        btn_first_page.classList.remove("arrow_active");
        btn_first_page.classList.add("arrow_unactiv");
        btn_first_page.setAttribute("disabled", "true");
    
        btn_left.classList.add("arrow_unactiv");
        btn_left.classList.remove("arrow_active");
        btn_left.setAttribute("disabled", "true");

    }



    x--;
    pagesShowNum.innerText = x;
}

btn_left.addEventListener('click', previos_page);
btn_right.addEventListener('click', next_page);

btn_last_page.addEventListener('click', lastpage);

btn_first_page.addEventListener('click', firstpage);




//-----------------------------------------------------------------------------