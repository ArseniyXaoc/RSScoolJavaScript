

const timeBox = document.createElement('div');
    const minits = document.createElement('span');
    const seconds = document.createElement('span');
    timeBox.classList.add('time');
    minits.classList.add('minits');
    seconds.classList.add('seconds');
    document.body.appendChild(timeBox);
    timeBox.appendChild(minits);
    timeBox.appendChild(seconds);
let i = 0;

function addzero(num) {
    if(num < 10) return `0${num}`;
    return num;
}

const time = () => {   
    
    minits.innerText = addzero(Math.floor(i /60));
    seconds.innerText = `:${addzero(i % 60)}`;
    i += 1;
}


setInterval(time, 1000);
export {
    time
};