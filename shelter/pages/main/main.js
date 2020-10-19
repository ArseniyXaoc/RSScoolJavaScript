// неактивные ссылки
document.querySelector(".navigation__link:nth-child(3) > a").setAttribute('onclick', 'return false');
document.querySelector(".navigation__link:nth-child(4) > a").setAttribute('onclick', 'return false');
document.querySelector(".logo__title").setAttribute('onclick', 'return false');

//JSON load Pets.json
let requestURL = 'http://localhost:5500/shelter/pages/main/pets.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function () {
    let Pets = request.response;    
    console.log(Pets);
}