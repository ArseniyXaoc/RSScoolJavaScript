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

class Settings {
  constructor() {
    this.restart = document.createElement('button');
    this.save = document.createElement('button');
    this.load = document.createElement('button');
    this.numPuzzle = document.createElement('select');
    this.result = document.createElement('button');
    this.sound = document.createElement('button');
  }

  createFieldOfPuzzle() {
    this.restart.classList.add('re-start');
    this.save.classList.add('save');
    this.load.classList.add('load');
    this.numPuzzle.classList.add('numPuzzle');
    this.result.classList.add('result');
    this.sound.classList.add('sound');
    document.body.appendChild(this.restart);
    document.body.appendChild(this.save);
    document.body.appendChild(this.load);
    document.body.appendChild(this.numPuzzle);
    document.body.appendChild(this.result);
    document.body.appendChild(this.sound);
    this.restart.innerText = 'New Game';
    this.save.innerText = 'save';
    this.load.innerText = 'load';
    this.result.innerText = 'Result';
    this.sound.innerText = 'sound On Off';
    this.sound.classList.add('on');
    this.numPuzzle.innerHTML = '<option value = "3x3">3x3</option><option value = "4x4">4x4</option><option value = "5x5">5x5</option><option value = "6x6">6x6</option><option value = "7x7">7x7</option><option value = "8x8">8x8</option>';
  }
}

const settings = new Settings;
settings.createFieldOfPuzzle();

// const restart = document.createElement('button');
// const save = document.createElement('button');
// const load = document.createElement('button');
// const numPuzzle = document.createElement('select');
// const result = document.createElement('button');
// const sound = document.createElement('button');
// numPuzzle.size = 1;

// (function () {
//   restart.classList.add('re-start');
//   save.classList.add('save');
//   load.classList.add('load');
//   numPuzzle.classList.add('numPuzzle');
//   result.classList.add('result');
//   sound.classList.add('sound');
//   document.body.appendChild(restart);
//   document.body.appendChild(save);
//   document.body.appendChild(load);
//   document.body.appendChild(numPuzzle);
//   document.body.appendChild(result);
//   document.body.appendChild(sound);
//   restart.innerText = 'New Game';
//   save.innerText = 'save';
//   load.innerText = 'load';
//   result.innerText = 'Result';
//   sound.innerText = 'sound On Off';
//   sound.classList.add('on');
//   numPuzzle.innerHTML = '<option value = "3x3">3x3</option><option value = "4x4">4x4</option><option value = "5x5">5x5</option><option value = "6x6">6x6</option><option value = "7x7">7x7</option><option value = "8x8">8x8</option>';
// }())

let createPuzzleField = '';
let saved;
let moves;
let empty;
let timer;

settings.sound.addEventListener('click', () => {
  settings.sound.classList.toggle('on');
  createPuzzleField.soundOn = createPuzzleField.soundOn ? false : true;
})

settings.result.addEventListener('click', res);

settings.restart.addEventListener('click', () => {
  settings.save.style.visibility = 'visible';
  settings.load.style.visibility = 'visible';

  //Style///////////////////////////////////////////////
  settings.restart.style.fontSize = '14px';
  settings.restart.style.width = 'auto';
  settings.restart.style.height = 'auto';


  timerX.x = 0;
  minits.innerText = '00';
  seconds.innerText = ':00';
  const field = document.querySelector('.field');
  if (field) {
    document.body.removeChild(field);
    document.body.removeChild(document.querySelector('.move'));

  }

  const gameconfig = {
    'size-0': {
      numOfPuzzle: 8,
      elementSize: 33.33,
      puzzleLength: 3,
    },
    'size-1': {
      numOfPuzzle: 15,
      elementSize: 25,
      puzzleLength: 4,
    },
    'size-2': {
      numOfPuzzle: 24,
      elementSize: 20,
      puzzleLength: 5,
    },
    'size-3': {
      numOfPuzzle: 35,
      elementSize: 16.66,
      puzzleLength: 6,
    },
    'size-4': {
      numOfPuzzle: 48,
      elementSize: 14.286,
      puzzleLength: 7,
    },
    'size-5': {
      numOfPuzzle: 63,
      elementSize: 12.5,
      puzzleLength: 8,
    },
  }

  clearInterval(timer);
  createPuzzleField = new Puzzle;

  (function PuzzleFieldSettings(settings) {
    console.log(gameconfig[`size-${settings}`]);
    createPuzzleField.size.selectedIndex = settings;
    createPuzzleField.size.elementSize = gameconfig[`size-${settings}`].elementSize;
    createPuzzleField.size.numOfPuzzle = gameconfig[`size-${settings}`].numOfPuzzle;
    createPuzzleField.size.puzzleLength = gameconfig[`size-${settings}`].puzzleLength;
  })(settings.numPuzzle.options.selectedIndex);
 
  createPuzzleField.creator();
  timer = setInterval(time, 1000);
  rest.x = 1;
})

function res() {
  if (localStorage.getItem('result') != null) {
    let x = localStorage.getItem('result').replace(/"moves"/gi, 'Ходы');
    x = x.replace(/"time"/gi, 'Время');
    x = x.replace(/'}'/gi, ' ');
    alert(`Лучшие результаты : ${x}`);
  } else alert('Еще нет результатов!');
}

function SaveGame() {
  localStorage.setItem(`save${settings.numPuzzle.options.selectedIndex}`, JSON.stringify(createPuzzleField.elements.elemArr));
  localStorage.setItem(`empty${settings.numPuzzle.options.selectedIndex}`, JSON.stringify(createPuzzleField.elements.empty));
  localStorage.setItem(`moves${settings.numPuzzle.options.selectedIndex}`, JSON.stringify(createPuzzleField.elements.moves));
  localStorage.setItem(`time${settings.numPuzzle.options.selectedIndex}`, JSON.stringify(timerX));
}

function LoadGame() {
  if (settings.save === null) return;
  let indexNum = settings.numPuzzle.options.selectedIndex;
  numLoad(indexNum);

  function numLoad(indexNum) {
    saved = JSON.parse(localStorage.getItem(`save${indexNum}`));
    if (saved === null) return null;
    settings.restart.click();
    empty = JSON.parse(localStorage.getItem(`empty${indexNum}`));
    moves = JSON.parse(localStorage.getItem(`moves${indexNum}`));
    let time = JSON.parse(localStorage.getItem(`time${indexNum}`));
    console.log(timerX);
    timerX.x = time.x;
    console.log(time);
    createPuzzleField.elements.elemArr = saved; // JSON.parse(JSON.stringify(saved));
    createPuzzleField.elements.empty = empty;
    createPuzzleField.elements.moves = moves;
    const field = document.querySelector('.field');
    if (field)(document.body.removeChild(field));
    createPuzzleField.load(saved);
  }
}

settings.save.addEventListener('click', SaveGame);
settings.load.addEventListener('click', LoadGame);
const restart = settings.restart;
export {
  restart
}
