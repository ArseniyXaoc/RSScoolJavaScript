const timeBox = document.createElement('div');
const minits = document.createElement('span');
const seconds = document.createElement('span');
timeBox.classList.add('time');
minits.classList.add('minits');
seconds.classList.add('seconds');
document.body.appendChild(timeBox);
timeBox.appendChild(minits);
timeBox.appendChild(seconds);
let timerX = {
    x: 0
};

function addzero(num) {
    if (num < 10) return `0${num}`;
    return num;
}

const rest = {
    x: 0
};

const time = function tim() {

    minits.innerText = addzero(Math.floor(timerX.x / 60));
    seconds.innerText = `:${addzero(timerX.x % 60)}`;
    timerX.x += 1;
}



export {
    time,
    rest,
    minits,
    seconds,
    timerX
};