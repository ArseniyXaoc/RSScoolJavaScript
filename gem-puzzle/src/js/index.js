import '../css/style.css';
import '../css/style.scss';
import '../img/2.jpg'


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


time();

const restart = document.createElement('button');
const save = document.createElement('button');
const load = document.createElement('button');
const numPuzzle = document.createElement('select');
const result = document.createElement('button');
const sound = document.createElement('button');
numPuzzle.size = 1;

(function () {
  restart.classList.add('ReStart');
  save.classList.add('Save');
  load.classList.add('Load');
  numPuzzle.classList.add('numPuzzle');
  result.classList.add('result');
  sound.classList.add('sound');
  document.body.appendChild(restart);
  document.body.appendChild(save);
  document.body.appendChild(load);
  document.body.appendChild(numPuzzle);
  document.body.appendChild(result);
  document.body.appendChild(sound);
  restart.innerText = 'New Game';
  save.innerText = 'Save';
  load.innerText = 'Load';
  result.innerText = 'Result';
  sound.innerText = 'sound On Off';
  sound.classList.add('on');
  numPuzzle.innerHTML = '<option value = "3x3">3x3</option><option value = "4x4">4x4</option><option value = "5x5">5x5</option><option value = "6x6">6x6</option><option value = "7x7">7x7</option><option value = "8x8">8x8</option>';
}())

let ard;
let saved;
let moves;
let empty;
let timer;

sound.addEventListener('click', () =>{
  sound.classList.toggle('on');
  ard.soundOn = ard.soundOn ? false : true;
})

result.addEventListener('click', res);

restart.addEventListener('click', () => {
  save.style.visibility = 'visible';
  load.style.visibility = 'visible';

  //Style///////////////////////////////////////////////
  restart.style.fontSize = '14px';
  restart.style.width = 'auto';
  restart.style.height = 'auto';


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
  switch (numPuzzle.options.selectedIndex) {
    case 0:
      ard.size.selectedIndex = 0;
      ard.size.elementSize = 33.33;
      ard.size.numOfPuzzle = 8;
      ard.size.puzzleLength = 3;
      break;
    case 1:
      ard.size.selectedIndex = 1;
      ard.size.elementSize = 25;
      ard.size.numOfPuzzle = 15;
      ard.size.puzzleLength = 4;
      break;
    case 2:
      ard.size.selectedIndex = 2;
      ard.size.elementSize = 20;
      ard.size.numOfPuzzle = 24;
      ard.size.puzzleLength = 5;
      break;
    case 3:
      ard.size.selectedIndex = 3;
      ard.size.elementSize = 16.66;
      ard.size.numOfPuzzle = 35;
      ard.size.puzzleLength = 6;
      break;
    case 4:
      ard.size.selectedIndex = 4;
      ard.size.elementSize = 14.286;
      ard.size.numOfPuzzle = 48;
      ard.size.puzzleLength = 7;
      break;
    case 5:
      ard.size.selectedIndex = 5;
      ard.size.elementSize = 12.5;
      ard.size.numOfPuzzle = 63;
      ard.size.puzzleLength = 8;
      break;

  }
  ard.creator();

  timer = setInterval(time, 1000);
  rest.x = 1;
})

function res() {
  if (localStorage.getItem('result') != null) {
    let x = localStorage.getItem('result').replace(/"moves"/gi, 'Ходы');
    x = x.replace(/"time"/gi, 'Время');
    x = x.replace(/'}'/gi, ' ');
    alert(`Лучшие результаты : ${x}`);

  }
  else alert('Еще нет результатов!');
}


function SaveGame() {
  switch (numPuzzle.options.selectedIndex) {
    case 0:
      localStorage.setItem('save0', JSON.stringify(ard.elements.elemArr));
      localStorage.setItem('empty0', JSON.stringify(ard.elements.empty));
      localStorage.setItem('moves0', JSON.stringify(ard.elements.moves));
      localStorage.setItem('time0', JSON.stringify(timerX));
      break;
    case 1:
      localStorage.setItem('save1', JSON.stringify(ard.elements.elemArr));
      localStorage.setItem('empty1', JSON.stringify(ard.elements.empty));
      localStorage.setItem('moves1', JSON.stringify(ard.elements.moves));
      localStorage.setItem('time1', JSON.stringify(timerX));
      break;
    case 2:
      localStorage.setItem('save2', JSON.stringify(ard.elements.elemArr));
      localStorage.setItem('empty2', JSON.stringify(ard.elements.empty));
      localStorage.setItem('moves2', JSON.stringify(ard.elements.moves));
      localStorage.setItem('time2', JSON.stringify(timerX));
      break;
    case 3:
      localStorage.setItem('save3', JSON.stringify(ard.elements.elemArr));
      localStorage.setItem('empty3', JSON.stringify(ard.elements.empty));
      localStorage.setItem('moves3', JSON.stringify(ard.elements.moves));
      localStorage.setItem('time3', JSON.stringify(timerX));
      break;
    case 4:
      localStorage.setItem('save4', JSON.stringify(ard.elements.elemArr));
      localStorage.setItem('empty4', JSON.stringify(ard.elements.empty));
      localStorage.setItem('moves4', JSON.stringify(ard.elements.moves));
      localStorage.setItem('time4', JSON.stringify(timerX));
      break;
    case 5:
      localStorage.setItem('save5', JSON.stringify(ard.elements.elemArr));
      localStorage.setItem('empty5', JSON.stringify(ard.elements.empty));
      localStorage.setItem('moves5', JSON.stringify(ard.elements.moves));
      localStorage.setItem('time5', JSON.stringify(timerX));
      break;
  }
}

function LoadGame() {
  if (save === null) return;
  
  let indexNum = numPuzzle.options.selectedIndex;
  numLoad(indexNum);
  //console.log(timerX);
  function numLoad(indexNum) {
    saved = JSON.parse(localStorage.getItem(`save${indexNum}`));
    if (saved === null) return null;
    restart.click();
    empty = JSON.parse(localStorage.getItem(`empty${indexNum}`));
    moves = JSON.parse(localStorage.getItem(`moves${indexNum}`));
    let time =  JSON.parse(localStorage.getItem(`time${indexNum}`));
    console.log(timerX);
    timerX.x = time.x;
    //timerX = time;
    console.log(time);
    ard.elements.elemArr = saved; // JSON.parse(JSON.stringify(saved));
    ard.elements.empty = empty;
    ard.elements.moves = moves;
    const field = document.querySelector('.field');
    if (field)(document.body.removeChild(field));
    ard.load(saved);
  }
}

save.addEventListener('click', SaveGame);
load.addEventListener('click', LoadGame);

// Canvas////////////////////////////////////////////
// let canvas = document.createElement('canvas');
// canvas.style.width = '133px';
// canvas.style.height = '133px';
// canvas.classList.add('myCanvas');
// let context = canvas.getContext('2d');
// let imageObj = new Image();
// imageObj.src = '../img/2.jpg';
// imageObj.onload = function () {
//     let sourceX = 200;
//     let sourceY = 100;
//     let sourceWidth = 300;
//     let sourceHeight = 200;
//     let destWidth = sourceWidth;
//     let destHeight = sourceHeight;
//     let destX = canvas.width / 2 - destWidth / 2;
//     let destY = canvas.height / 2 - destHeight / 2;
//     context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
// }

// let dataUrl = canvas.toDataURL('image/jpg');
// console.log(dataUrl);
// restart.style.background = dataUrl;


export {
  restart
}

//document.body.appendChild(canvas);

//restart.appendChild(canvas);
////////////////////////////////////////////////////////