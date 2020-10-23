//Slader start------------------------------------------------------------------------
let items = document.querySelectorAll('.card__ul');
let currentItem = 0;
let isEnabled = true;
let Pets = [];
let randPets = [0, 1, 2, 3, 4, 5, 6, 7];
let cardparent = document.querySelector('.card');
let card = document.querySelector('.card__item');
let card_node = card.cloneNode(true);
let CardElem1 = document.querySelector("body > div > section > div.pets__card > div > ul:nth-child(1)");
let CardElem2 = document.querySelector("body > div > section > div.pets__card > div > ul:nth-child(2)");
let CardElem3 = document.querySelector("body > div > section > div.pets__card > div > ul:nth-child(3)");
let ElemMass = [CardElem1, CardElem2, CardElem3];
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
    //Slider end------------------------------------------------------------------------






    //request.responseType = 'json';


    //JSON load Pets.json end

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
        console.log(gen3);

        

        function genAnimal(gen, x) {
            ElemMass[x].appendChild(createNode(gen[0]));
            ElemMass[x].appendChild(createNode(gen[1]));
            ElemMass[x].appendChild(createNode(gen[2]));
        }

        function forward() {
            genAnimal(gen3, currentItem);
            // if(currentItem === 0 ) ElemMass[2].innerHTML = '';
            // else ElemMass[currentItem-1].innerHTML = '';
        }

        function backto() {
            genAnimal(gen3, currentItem);
            // if(currentItem === 2 ) ElemMass[0].innerHTML = '';
            // else ElemMass[currentItem+1].innerHTML = '';
        }

        if (back === true) backto();
        else forward();
    }

    function shuffle(array) {
        

        array.sort(() => Math.random() - 0.5);        
        array = array.slice(0, 3);
        if(array.filter(i => gen3.includes(i)).length !== 0){
            return shuffle(randPets);
        };
        //console.log(array);
        return array;
    }

    function del(item) {        
        ElemMass[currentItem].innerHTML = '';
    }
    
}



request.send();