let time = document.querySelector('#time');
let name = document.querySelector('.name');
let focus = document.querySelector('.focus_do');
let body = document.querySelector('body');
let date1 = document.querySelector('#date1');
let greed = document.querySelector('#greed');
let i = 0;
const btn = document.querySelector('.btn');
const srcUrl = 'assets/images/';
let timeOfday = 'day/'
let timeOfmorning = 'morning/'
let timeOfnight = 'night/'
let timeOfevening = 'evening/'
let timeOf = [];
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']


btn.addEventListener('click', getimage);
timeOf = shuffle(images, timeOfnight);
timeOf = timeOf.concat(shuffle(images, timeOfmorning));
timeOf = timeOf.concat(shuffle(images, timeOfday));
timeOf = timeOf.concat(shuffle(images, timeOfevening));
console.log(timeOf);



function timeUpdate() {
    let date = new Date();
    let hour = date.getHours();
    let minit = date.getMinutes();
    let second = date.getSeconds();
    time.innerHTML = `${hour}<span>:</span>${add0(minit)}<span>:</span>${add0(second)}`;


    if (date.getMinutes() == 0 && date.getSeconds() == 0) {
        getimage();
    }
}

function setGreed() {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 6 && hour < 12) {
        greed.textContent = 'Доброе утро ';

    }
    if (hour >= 12 && hour < 18) {
        greed.textContent = 'Добрый день ';

    }
    if (hour >= 18 && hour < 24) {
        greed.textContent = 'Добрый вечер ';
        body.style.color = '#fff';

    }
    if (hour >= 0 && hour < 6) {
        greed.textContent = 'Доброй ночи ';
        body.style.color = '#fff';

    }
}



function add0(input) {
    let addzero = parseInt(input, 10) < 10 ? '0' : '';
    return addzero + input;
}



function dateUpdate() {
    let date = new Date();
    i = date.getHours();
    let day = '';
    const dayarr = ['воскресенье','понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    let numday = date.getDay();
    let aryDate = date.getDate();
    let month = date.toLocaleString('ru', {
        month: 'long'
    });
    day = dayarr[numday];
    date1.innerHTML = `${month}, ${day}, ${aryDate} число`;
}


function shuffle(array, time) {
    array.sort(() => Math.random() - 0.5);
    array = array.slice(0, 6);
    array = array.map(item => time + item);

    return array;
}

function vievBgImages(data) {
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    }
}

function getimage() {

    let date = new Date();
    let hour = date.getHours();
    let index = hour;
    index = i % timeOf.length;

    const imageSrc = srcUrl + timeOf[index];
    vievBgImages(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false
    }, 1000);
}

// Name----------------------------------------


name.addEventListener('click', () => {
    if (name.textContent === '[Введите имя]') {
        name.innerText = '';
    }
});

focus.addEventListener('click', () => {
    if (focus.textContent === '[Введите цель]') {
        focus.innerText = '';
    }
});

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);


focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

function setName(event) {
    if (event.type === 'keypress') {
        if (event.which == 13 || event.keyCode == 13) {
            if (name.innerText.trim() === '') name.innerText = '[Введите имя]';
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    } else if (event.type === 'blur') {
        if (name.innerText.trim() === '') name.innerText = '[Введите имя]';
        localStorage.setItem('name', event.target.innerText);
    }
}

function setFocus(event) {
    if (event.type === 'keypress') {
        if (event.which == 13 || event.keyCode == 13) {
            if (focus.innerText.trim() === '') focus.innerText = '[Введите цель]';
            localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }
    } else if (event.type === 'blur') {
        if (focus.innerText.trim() === '') focus.innerText = '[Введите цель]';
        localStorage.setItem('focus', event.target.innerText);
    }
}



function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = '[Введите цель]'
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Введите имя]'
    } else {
        name.textContent = localStorage.getItem('name');
    }
}



setGreed();
setInterval(() => {
    timeUpdate();
}, 1000);
dateUpdate();
getimage()
getName();
getFocus();


// API Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-desription');
const city = document.querySelector('.city');


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=c93716942e89d2e4eeed33f18f863cef&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp} °С`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather();

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

document.addEventListener('DOMCOntentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// Цитаты_______________________________________________________________
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const blockquote_btn = document.querySelector('blockquote_btn');

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);