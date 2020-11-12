import '../css/style.css';
import '../css/style.scss';


// import {
//   moduleOne
// } from './moduleOne';

import {
  Puzzle
} from './create';


import {
  time,
  rest,
  minits,
  seconds,
  timerX,
} from './time';
// const helloArr = require('./moduleOne.js');

time();




const restart = document.createElement('button');
const save = document.createElement('button');
const load = document.createElement('button');

(function () {
  restart.classList.add('ReStart');
  save.classList.add('Save');
  load.classList.add('Load');
  document.body.appendChild(restart);
  document.body.appendChild(save);
  document.body.appendChild(load);
  restart.innerText = 'New Game';
  save.innerText = 'Save';
  load.innerText = 'Load';
}())

let ard;
let saved;
let empty;
let timer;
//const restart = document.querySelector('.ReStart');
restart.addEventListener('click', () => {

  //Style///////////////////////////////////////////////
  restart.style.fontSize = '14px';
  restart.style.width = 'auto';
  restart.style.height = 'auto';
  //restart.style.fontSize = '14px';


  timerX.x = 0;
  minits.innerText = '00';
  seconds.innerText = ':00';
  const field = document.querySelector('.field');
  if (field) {
    document.body.removeChild(field);
    document.body.removeChild(document.querySelector('.move'));

  }

  clearInterval(timer);
  ard = '';
  ard = new Puzzle;
  ard.creator();

  console.log(time);
  timer = setInterval(time, 1000);
  console.log(rest);
  rest.x = 1;
})

//const save = document.querySelector('.Save');
//const load = document.querySelector('.Load');


function SaveGame() {
  localStorage.setItem('save', JSON.stringify(ard.elements.elemArr));
  localStorage.setItem('empty', JSON.stringify(ard.elements.empty));
  
  // saved = JSON.parse(JSON.stringify(ard.elements.elemArr));  //ard.elements.elemArr.slice();
}

function LoadGame() {
  saved = JSON.parse(localStorage.getItem('save'));
  empty = JSON.parse(localStorage.getItem('empty'));
  console.log(saved);
  ard.elements.elemArr = saved; // JSON.parse(JSON.stringify(saved));
  ard.elements.empty = empty;
  const field = document.querySelector('.field');
  if (field)(document.body.removeChild(field));
  ard.load(saved);
}

save.addEventListener('click', SaveGame);
load.addEventListener('click', LoadGame);
// class TestClass {
//   constructor() {
//     const msg = "Using ES2015+ syntax";
//     console.log(msg);
//   }
// }

// const test = new TestClass();


// Пример массива
// console.log(helloArr);

// пример подключения модуля
// let mod = moduleOne(2, 3);

// console.log(mod);