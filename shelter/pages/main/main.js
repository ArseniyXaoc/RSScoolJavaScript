// неактивные ссылки
document.querySelector(".navigation__link:nth-child(3) > a").setAttribute('onclick', 'return false');
document.querySelector(".navigation__link:nth-child(4) > a").setAttribute('onclick', 'return false');
document.querySelector(".logo__title").setAttribute('onclick', 'return false');

let checkbox = document.querySelector('#menu__toggle');
let overlay = document.querySelector("div.hamburger-menu > div");
console.log(checkbox);


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


//Slader start------------------------------------------------------------------------
let items = document.querySelectorAll('.card__ul');
let currentItem = 0;
let isEnabled = true;
let Pets = [];
let randPets = [0, 1, 2, 3, 4, 5, 6, 7];
let cardparent = document.querySelector('.card');
let card = document.querySelector('.card__item');
let card_node = card.cloneNode(true);
let CardElem1 = document.querySelector("div.pets__card > div > ul:nth-child(1)");
let CardElem2 = document.querySelector("div.pets__card > div > ul:nth-child(2)");
let CardElem3 = document.querySelector("div.pets__card > div > ul:nth-child(3)");
let ElemMass = [CardElem1, CardElem2, CardElem3];
const popupbtn = document.querySelector(".card");
const popup = document.querySelector(".popup");
const wr2 = document.querySelector(".wr2");


let i = 0;
let x;
let back = '';
let gen3 = [];


//JSON load Pets.json
let requestURL = './pets.json'; //'http://localhost:5500/shelter/pages/main/pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.onload = function () {
    Pets = JSON.parse(request.response);
    setPetsCard(Pets, card_node);


    function changeCurrentItem(n) {
        currentItem = (n + items.length) % items.length;
    }

    function hideItem(diraction) {
        isEnabled = false;
        items[currentItem].classList.add(diraction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('card__active', diraction)
        })
    }

    function showItem(diraction) {
        items[currentItem].classList.add('card__next', diraction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('card__next', diraction);
            this.classList.add('card__active');
            isEnabled = true;
        })
    }

    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
        del(n);
    }

    function nextItem(n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
        del(n);
    }
    //Button-------------------------------------------------------------------------------

    document.querySelector('.arrow').addEventListener('click', function (e) {
        if (isEnabled) {
            back = true;
            previousItem(currentItem);
            setPetsCard(Pets, card_node);
        }
    })

    document.querySelector('.arrow_reverse').addEventListener('click', function (e) {
        if (isEnabled) {
            back = false;
            nextItem(currentItem);
            setPetsCard(Pets, card_node);
        }
    })

    document.querySelector("button.arrow.arrow_reverse.about_show_320").addEventListener('click', function (e) {
        if (isEnabled) {
            back = true;
            previousItem(currentItem);
            setPetsCard(Pets, card_node);
        }
    })

    document.querySelector("div.arrow_320.about_show_320 > button:nth-child(1)").addEventListener('click', function (e) {
        if (isEnabled) {
            back = false;
            nextItem(currentItem);
            setPetsCard(Pets, card_node);
        }
    })

    // Card----------------------------------------------------

    function setPetsCard(name, node) {



        // Создание элемента
        function createNode(nodeCount) {
            let newNode = document.createDocumentFragment();
            newNode = node.cloneNode(true);
            newNode.childNodes[1].outerHTML = `<img class="card__img" src="${name[nodeCount].img}" alt="dog">`;
            newNode.childNodes[3].innerText = `${name[nodeCount].name}`;
            return newNode;
        }


        gen3 = shuffle(randPets);




        function genAnimal(gen, x) {
            ElemMass[x].appendChild(createNode(gen[0]));
            ElemMass[x].childNodes[0].id = 0;
            ElemMass[x].appendChild(createNode(gen[1]));
            ElemMass[x].childNodes[1].classList.add('card__item_hide_320');
            ElemMass[x].childNodes[1].id = 1;
            ElemMass[x].appendChild(createNode(gen[2]));
            ElemMass[x].childNodes[2].id = 2;
            ElemMass[x].childNodes[2].classList.add('card__item_hide');
            ElemMass[x].childNodes[2].classList.add('card__item_hide_320');
        }



        function forward() {
            genAnimal(gen3, currentItem);

        }

        function backto() {
            genAnimal(gen3, currentItem);

        }

        if (back === true) backto();
        else forward();
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        array = array.slice(0, 3);
        if (array.filter(i => gen3.includes(i)).length !== 0) {
            return shuffle(randPets);
        };
        //console.log(array);
        return array;
    }

    function del(item) {
        ElemMass[currentItem].innerHTML = '';
    }
    popupbtn.addEventListener('click', popup_create);

    function popup_create(event) {
        let id = event.target.closest('li').id

        const name = Pets[gen3[id]].name;
        const img = Pets[gen3[id]].img;
        const type = Pets[gen3[id]].type;
        const breed = Pets[gen3[id]].breed;
        const description = Pets[gen3[id]].description;
        const age = Pets[gen3[id]].age;
        const inoculations = Pets[gen3[id]].inoculations;
        const diseases = Pets[gen3[id]].diseases;
        const parasites = Pets[gen3[id]].parasites;
        console.log(Pets[gen3[id]].name);

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


}

request.send();



//Slider end------------------------------------------------------------------------