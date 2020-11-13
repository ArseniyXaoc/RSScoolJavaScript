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
            elementSize: 100,
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
            Drug: false,
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
        field.setAttribute('onselectstart', 'return false');
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


                element.style.top = `${top * this.elements.elementSize}px`;
                element.style.left = `${left * this.elements.elementSize}px`;

                const move = () => {
                    this.move(f);
                    console.log(this.elements.elemArr);
                }

                element.addEventListener('click', move);

                element.addEventListener('mousedown', (event) => {
                    this.moveElem(f, event, field);
                })

                element.ondragstart = function () {
                    return false;
                }

                // Drug&Drop//////////////////////////
                //element.onmousedown = 
                //////////////////////////////////////

            }
            document.body.appendChild(field);
            document.body.appendChild(this.elements.move);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    load(arr) {
        console.log(arr);
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;
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

                element.style.top = `${top * this.elements.elementSize}px`;
                element.style.left = `${left * this.elements.elementSize}px`;

                const move = () => {
                    this.move(f);
                    console.log(this.elements.elemArr);
                }
                element.addEventListener('click', move);

                element.addEventListener('mousedown', (event) => {
                    this.moveElem(f, event, field);
                })

                element.ondragstart = function () {
                    return false;
                }

            } else {
                this.elements.empty.top = arr[i].top;
                this.elements.empty.left = arr[i].left;
                this.elements.empty.value = arr[i].value;
                const element = document.createElement('div');
                element.classList.add('element');
                element.classList.add('empty');
                this.elements.empty.dom = element;
                field.append(element);
                this.elements.empty.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}px`;
                this.elements.empty.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}px`;
            }

            // element.ondragstart = function () {
            //     return false;
            // }
        }
        document.body.appendChild(field);
    }

    move(index) {
        if (this.drug.Drug) return;
        const elem = this.elements.elemArr[index];

        const leftDiff = Math.abs(this.elements.empty.left - elem.left);
        const topDiff = Math.abs(this.elements.empty.top - elem.top);
        if (leftDiff + topDiff > 1) {
            return;
        }
        this.elements.moves += 1;
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;

        elem.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}px`;
        elem.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}px`;

        const emptyLeft = this.elements.empty.left;
        const emptyTop = this.elements.empty.top;
        this.elements.empty.left = elem.left;
        this.elements.empty.top = elem.top;
        elem.left = emptyLeft;
        elem.top = emptyTop;

        this.elements.empty.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}px`;
        this.elements.empty.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}px`;

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
        //console.log(iter);
        if (iter % 2 === 0) return sortArr;
        return this.solvability();

    }

    //Drug & Drop
    moveElem(index, event, field) {
        // setTimeout(() =>{
        // }, 300);
        //console.log(mr.slice(0, -2));
        let Drug = this.drug;
        const element = this.elements.elemArr[index].dom;
        const elem = this.elements.elemArr[index];
        const mr = window.getComputedStyle(field, null).getPropertyValue('margin-right');
        const leftDiff = Math.abs(this.elements.empty.left - this.elements.elemArr[index].left);
        const topDiff = Math.abs(this.elements.empty.top - this.elements.elemArr[index].top);
        const IndexLeft = this.elements.elemArr[index].left;
        const IndexTop = this.elements.elemArr[index].top;
        let droppableBelow;
        const ShiftX = event.clientX - element.getBoundingClientRect().left;
        const ShiftY = event.clientY - element.getBoundingClientRect().top;
        const elementSize = this.elements.elementSize;
        const enterDroppable1 = this.enterDroppable.bind(this);


        

        if (leftDiff + topDiff > 1) {
            return;
        }
        document.addEventListener('mousemove', onMouseMove);

        element.style.zIndex = 100;
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            element.style.left = pageX - ShiftX - (mr.slice(0, -2)) - 10 + 'px';
            element.style.top = pageY - ShiftY - 92 + 'px';
        }

        function onMouseMove(event) {
            Drug.Drug = true;
            console.log(Drug);
            moveAt(event.pageX, event.pageY);
            element.style.display = 'none';
            let elementBelow = document.elementFromPoint(event.clientX, event.clientY);
            element.style.display = 'flex';
            if (!elementBelow) return;
            droppableBelow = elementBelow.closest('.empty');
        }

        function liveDroppable(IndexLeft, IndexTop, element) {
            element.style.top = `${IndexTop * elementSize}px`;
            element.style.left = `${IndexLeft * elementSize}px`;
        }

        element.onmouseup = function (event) {
            if (!droppableBelow) {
                liveDroppable(IndexLeft, IndexTop, element);
            } else {
                enterDroppable1(IndexLeft, IndexTop, element, elem);
            }
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
            element.style.zIndex = 0;

        }
        Drug.Drug = false;
    }

    enterDroppable(IndexLeft, IndexTop, element, elem) {
        console.log(this);
        this.elements.moves += 1;
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;
        element.style.top = `${this.elements.empty.top * this.elements.elementSize}px`;
        element.style.left = `${this.elements.empty.left * this.elements.elementSize}px`;
        const emptyLeft = this.elements.empty.left;
        const emptyTop = this.elements.empty.top;
        this.elements.empty.left = IndexLeft;
        this.elements.empty.top = IndexTop;
        elem.left = emptyLeft;
        elem.top = emptyTop;
        this.elements.empty.dom.style.top = `${this.elements.empty.top * this.elements.elementSize}px`;
        this.elements.empty.dom.style.left = `${this.elements.empty.left * this.elements.elementSize}px`;

        const finish = this.elements.elemArr.every(item => {
            return item.value === item.top * 4 + item.left;
        })

        if (finish) setTimeout(() => {
            alert(`Ура! вы выиграли головоломку за и ${minits.innerText}${seconds.innerText} и ${this.elements.moves} ходов`);
            this.elements.win = true;
        }, 250);;
    }
}


export {
    Puzzle
};

// module.exports = {
//     Puzzle
// };