//const Puzzle = {

import {
    minits,
    seconds,
} from './time';

class Puzzle {
    constructor() {
        this.elements = {
            win: false,
            elemArr: [], // Массив с позицией элемента
            elementSize: 25,
            moves: 0,
            move: null,
            empty: {
                value: 0,
                left: 0,
                top: 0,
                dom: null,
            },
        }

        this.drug = {
            StartCursorX: null,
            StartCursorY: null,
            StartX: null,
            StartY: null,
        }
    }
    // elements: {
    //     win: false,
    //     elemArr: [], // Массив с позицией элемента
    //     elementSize: 25,
    //     empty: {
    //         value: 0,
    //         top: 0,
    //         left: 0,
    //     },
    // },

    creator() {
        //this.elements.elemArr.push(this.elements.empty);
        const field = document.createElement('div');
        this.elements.move = document.createElement('div');
        field.classList.add('field');
        this.elements.move.classList.add('move');
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;


        const inMass = this.solvability();

        for (let i = 0; i <= 15; i += 1) {

            const f = i;
            const element = document.createElement('div');
            element.classList.add('element');
            let value;
            if (i === 0) {
                value = inMass[i];
            } else {
                value = inMass[i - 1] + 1;
            }
            element.innerHTML = value;
            field.append(element);
            const left = i % 4;
            const top = (i - left) / 4;

            if (i === 0) {
                this.elements.empty.value = 0;
                this.elements.empty.left = left;
                this.elements.empty.top = top;
                this.elements.empty.dom = element;
                this.elements.empty.dom.classList.add('empty');
                this.elements.elemArr.push(this.elements.empty);
            } else {
                this.elements.elemArr.push({ // Складываем элементы с их координатами в массив
                    value,
                    left,
                    top,
                    dom: element,
                })


                element.style.top = `${top * this.elements.elementSize}%`;
                element.style.left = `${left * this.elements.elementSize}%`;

                element.addEventListener('click', () => {
                    this.move(f);
                    
                })

                // Drug&Drop//////////////////////////


                // Alt/////////////////////////////////////////////
               /* element.onmousedown = function (event) {
                    element.style.position = 'absolute';
                    element.style.zIndex = 100;

                    let shiftX = event.clientX - element.getBoundingClientRect().left;
                    let shiftY = event.clientY - element.getBoundingClientRect().top;

                    //document.body.append(element);
                    moveAt(event.pageX, event.pageY);

                    function moveAt(pageX, pageY) {
                        //console.log(pageX, pageY, element.offsetWidth, element.offsetHeight);
                        element.style.left = pageX - shiftX + 'px';
                        element.style.top = pageY - shiftY + 'px';
                    }

                    function onMouseMove(event) {
                        moveAt(event.pageX, event.pageY);                    
                    }

                    document.addEventListener('mousemove', onMouseMove);

                    element.onmouseup = function () {
                        document.removeEventListener('mousemove', onMouseMove);
                        element.onmouseup = null;
                    }
                }

                element.ondragstart = function () {
                    return false;
                }*/


                // eslint-disable-next-line no-loop-func



            }
            document.body.appendChild(field);
            document.body.appendChild(this.elements.move);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    load(arr) {
        console.log(arr);

        this.elements.elemArr[0] = this.elements.empty;
        const field = document.createElement('div');
        field.classList.add('field');

        const inMass = [];
        arr.forEach(item => {
            inMass.push(item.value);
        })
        console.log(inMass);
        document.body.appendChild(field);

        for (let i = 0; i <= 15; i += 1) {
            if (i !== 0) {
                const f = i;
                const element = document.createElement('div');
                element.classList.add('element');
                const {
                    value
                } = arr[i]; //inMass[i - 1] + 1;
                element.innerHTML = value;
                field.append(element);
                const {
                    left
                } = arr[i];
                const {
                    top
                } = arr[i];
                this.elements.elemArr[i].value = arr[i].value;
                this.elements.elemArr[i].top = arr[i].top;
                this.elements.elemArr[i].left = arr[i].left;
                this.elements.elemArr[i].dom = element;

                element.style.top = `${top * this.elements.elementSize}%`;
                element.style.left = `${left * this.elements.elementSize}%`;

                element.addEventListener('click', () => {
                    this.move(f);
                    console.log(this.elements.elemArr);
                })
            } else {
                this.elements.empty.top = arr[i].top;
                this.elements.empty.left = arr[i].left;
                this.elements.empty.value = arr[i].value;
                const element = document.createElement('div');
                element.classList.add('element');
                element.classList.add('empty');
                this.elements.empty.dom = element;
                field.append(element);
                this.elements.empty.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}%`;
                this.elements.empty.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}%`;
            }
        }
        document.body.appendChild(field);
    }

    move(index) {
        const elem = this.elements.elemArr[index];

        const leftDiff = Math.abs(this.elements.empty.left - elem.left);
        const topDiff = Math.abs(this.elements.empty.top - elem.top);
        if (leftDiff + topDiff > 1) {
            return;
        }
        this.elements.moves += 1;
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;

        elem.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}%`;
        elem.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}%`;

        const emptyLeft = this.elements.empty.left;
        const emptyTop = this.elements.empty.top;
        this.elements.empty.left = elem.left;
        this.elements.empty.top = elem.top;
        elem.left = emptyLeft;
        elem.top = emptyTop;

        this.elements.empty.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}%`;
        this.elements.empty.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}%`;

        const finish = this.elements.elemArr.every(item => {
            return item.value === item.top * 4 + item.left;
        })

        if (finish) setTimeout(() => {
            alert(`Ура! вы выиграли головоломку за и ${minits.innerText}${seconds.innerText} и ${this.elements.moves} ходов`);
            this.elements.win = true;
        }, 250);;
    }


    solvability() {
        const sortArr = [];
        for (let i = 0; i <= 14; i += 1) {
            sortArr.push(i);
        }
        // sortArr.sort(() => Math.random() - 0.5);

        let iter = 0
        sortArr.forEach((element, index, array) => {
            for (let i = index + 1; i < array.length; i += 1) {
                if (element > array[i]) {
                    iter += 1;
                }
            }
        });
        console.log(iter);
        if (iter % 2 === 0) return sortArr;
        return this.solvability();

    }



}


export {
    Puzzle
};

// module.exports = {
//     Puzzle
// };