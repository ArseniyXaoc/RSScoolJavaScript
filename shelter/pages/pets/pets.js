
//Hamb
let Pets;
let checkbox = document.querySelector('#menu__toggle');
let overlay = document.querySelector("div.hamburger-menu > div");
console.log(checkbox);

overlay.addEventListener('click', () => checkbox.checked = false);

//JSON load Pets.json----------------------------------------------------
let requestURL = 'http://localhost:5500/shelter/pages/main/pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function () {
    Pets = request.response;    
    console.log(Pets);
}


//-----------------------------------------------------------------------------