import '../css/style.css';
import '../css/style.scss';


// import {
//   moduleOne
// } from './moduleOne';

import {
  Puzzle
} from './create';


import {
  time
} from './time';
// const helloArr = require('./moduleOne.js');

time();



let ard;
let saved;
const restart = document.querySelector('.ReStart');
restart.addEventListener('click', () =>{
  
  const field = document.querySelector('.field');
  if(field) (document.body.removeChild(field));
  clearInterval(time);
  
  ard = '';
  ard = new Puzzle;
  ard.creator();  
  setInterval(time, 1000);
})

const save = document.querySelector('.Save');
const load = document.querySelector('.Load');


function SaveGame (){  
  
  saved = JSON.parse(JSON.stringify(ard.elements.elemArr));  //ard.elements.elemArr.slice();
}

function LoadGame (){  
  ard.elements.elemArr = JSON.parse(JSON.stringify(saved));
  const field = document.querySelector('.field');
  if(field) (document.body.removeChild(field));
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