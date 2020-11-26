import {
    minits,
    seconds,
} from './time';

import {
    restart,
} from './index';

const audioLink = 'https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Scars%20FNC%20SFX/30[kb]question_2.aif.mp3';

class Puzzle {
    constructor() {
        this.widthOfBrowserWindow,
            this.puzzleSettings = {
                sizeOfOnePuzzleItem: 33.33,
                numberOfPuzzle: 8,
                puzzleLength: 3,
            },
            this.elements = {
                result: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                partOfresult: 0,
                mousedownFlag: false,
                win: false,
                elemArr: [], // Массив с позицией элемента
                moves: 0,
                move: null,
                empty: {
                    value: 0,
                    left: 0,
                    top: 0,
                    dom: null,
                },
            }

        this.dragAndDrop = {
            drag: false,
            startCursorX: null,
            startCursorY: null,
            startX: null,
            startY: null,
        }
    }

    audioInitializer() {
        this.soundOn = true;
        this.audio = new Audio();
        this.audio.preload = 'auto';
        this.audio.src = audioLink;
    }

    fieldHtmlAdder() {
        const field = document.createElement('div');
        field.classList.add('field');
        this.elements.move = document.createElement('div');
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;
        this.elements.move.classList.add('move');
        field.setAttribute('onselectstart', 'return false');
        return field;
    }

    createGameField() {
        this.audioInitializer();        
        this.widthOfBrowserWindow = document.body.clientWidth;
        window.addEventListener('resize', () => {
            this.widthOfBrowserWindow = document.body.clientWidth;
        })
        const field = this.fieldHtmlAdder();
        const orderOfPuzzleElementsArr = this.solvability();

        class Element {
            constructor(sizeOfOnePuzzleItem, value){
                this.sizeOfOnePuzzleItem = sizeOfOnePuzzleItem;
                this.current = document.createElement('div');
                this.value = value;
            }
            elementCrator(sizeOfOnePuzzleItem, iter){
                this.current.classList.add('element');
                this.current.style.height = `${sizeOfOnePuzzleItem}%`;
                this.current.style.width = `${sizeOfOnePuzzleItem}%`;
                if (iter === 0) {
                    this.value = orderOfPuzzleElementsArr[iter];
                } else {
                    this.value = orderOfPuzzleElementsArr[iter - 1] + 1;
                }
                this.current.innerHTML = this.value;
            }
        }

        for (let i = 0; i <= this.puzzleSettings.numberOfPuzzle; i += 1) {
            const f = i;
            const ElementPuzzle = new Element();
            ElementPuzzle.elementCrator(this.puzzleSettings.sizeOfOnePuzzleItem, i);
            const element = ElementPuzzle.current;
            field.append(element);
            const left = i % this.puzzleSettings.puzzleLength;
            const top = (i - left) / this.puzzleSettings.puzzleLength;

            if (i === 0) {
                this.elements.empty.value = 0;
                this.elements.empty.left = left;
                this.elements.empty.top = top;
                this.elements.empty.dom = element;
                this.elements.empty.dom.classList.add('empty');
                this.elements.elemArr.push(this.elements.empty);
            } else {
                this.elements.elemArr.push({ // Складываем элементы с их координатами в массив
                    value: ElementPuzzle.value,
                    left,
                    top,
                    dom: element,
                })
                element.style.top = `${top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                element.style.left = `${left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                const move = () => {
                    this.move(f);
                }
                element.addEventListener('click', move);
                element.addEventListener('mousedown', (event) => {
                    this.elements.mousedownFlag = true;
                    this.moveElem(f, event, field);
                })
                element.addEventListener('mouseup', (event) => {
                    this.elements.mousedownFlag = false;
                })
                element.ondragstart = function () {
                    return false;
                }
                // drag&Drop//////////////////////////               
            }

            document.body.appendChild(field);
            document.body.appendChild(this.elements.move);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    load(arr) {
        this.elements.elemArr[0] = this.elements.empty;
        const field = document.createElement('div');
        field.classList.add('field');
        const orderOfPuzzleElementsArr = [];
        arr.forEach(item => {
            orderOfPuzzleElementsArr.push(item.value);
        })
        document.body.appendChild(field);

        for (let i = 0; i <= this.puzzleSettings.numberOfPuzzle; i += 1) {
            if (i !== 0) {
                const f = i;
                const element = document.createElement('div');
                element.classList.add('element');
                element.style.height = `${this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                element.style.width = `${this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                const {
                    value
                } = arr[i];
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
                element.style.top = `${top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                element.style.left = `${left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                const move = () => {
                    this.move(f);
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
                this.elements.empty.dom.style.top = `${this.elements.empty.top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                this.elements.empty.dom.style.left = `${this.elements.empty.left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;

                this.elements.empty.dom.style.height = `${this.puzzleSettings.sizeOfOnePuzzleItem}%`;
                this.elements.empty.dom.style.width = `${this.puzzleSettings.sizeOfOnePuzzleItem}%`;
            }
        }
        document.body.appendChild(field);
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;
    }

    move(index) {
        if (this.dragAndDrop.drag) return;
        const elem = this.elements.elemArr[index];
        const leftDiff = Math.abs(this.elements.empty.left - elem.left);
        const topDiff = Math.abs(this.elements.empty.top - elem.top);
        if (leftDiff + topDiff > 1) {
            return;
        }
        if (this.soundOn) this.audio.play();
        this.elements.moves += 1;
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;
        elem.dom.style.top = `${this.elements.empty.top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        elem.dom.style.left = `${this.elements.empty.left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        const emptyLeft = this.elements.empty.left;
        const emptyTop = this.elements.empty.top;
        this.elements.empty.left = elem.left;
        this.elements.empty.top = elem.top;
        elem.left = emptyLeft;
        elem.top = emptyTop;
        this.elements.empty.dom.style.top = `${this.elements.empty.top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        this.elements.empty.dom.style.left = `${this.elements.empty.left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;

        const finish = this.elements.elemArr.every(item => {
            return item.value === item.top * this.puzzleSettings.puzzleLength + item.left;
        })

        if (finish) setTimeout(() => {
            alert(`Ура! вы выиграли головоломку за и ${minits.innerText}${seconds.innerText} и ${this.elements.moves} ходов`);
            if (localStorage.getItem('result') != null) this.elements.result = JSON.parse(localStorage.getItem('result'));
            let moves = this.elements.moves;
            for (let item of this.elements.result) {
                if (item.moves > moves || item.moves === undefined) {
                    item.moves = moves;
                    item.time = `${minits.innerText}${seconds.innerText}`;
                    break;
                }
            }
            localStorage.setItem('result', JSON.stringify(this.elements.result));
            this.elements.win = true;
            restart.click();
        }, 250);;
    }

    solvability() {
        const sortArr = [];
        for (let i = 0; i <= (this.puzzleSettings.numberOfPuzzle) - 1; i += 1) {
            sortArr.push(i);
        }
        sortArr.sort(() => Math.random() - 0.5);
        let iter = 0
        sortArr.forEach((element, index, array) => {
            for (let i = index + 1; i < array.length; i += 1) {
                if (element > array[i]) {
                    iter += 1;
                }
            }
        });
        if (iter % 2 === 0) return sortArr;
        return this.solvability();
    }

    //drag & Drop
    moveElem(index, event, field) {
        let drag = this.dragAndDrop;
        const element = this.elements.elemArr[index].dom;
        const elem = this.elements.elemArr[index];
        let mr = window.getComputedStyle(field, null).getPropertyValue('width');
        const leftDiff = Math.abs(this.elements.empty.left - this.elements.elemArr[index].left);
        const topDiff = Math.abs(this.elements.empty.top - this.elements.elemArr[index].top);
        const IndexLeft = this.elements.elemArr[index].left;
        const IndexTop = this.elements.elemArr[index].top;
        let droppableBelow;
        const ShiftX = event.clientX - element.getBoundingClientRect().left;
        const ShiftY = event.clientY - element.getBoundingClientRect().top;
        const sizeOfOnePuzzleItem = this.puzzleSettings.sizeOfOnePuzzleItem;
        const enterDroppable1 = this.enterDroppable.bind(this);
        if (leftDiff + topDiff > 1) {
            return;
        }
        if (this.soundOn) this.audio.play();
        document.addEventListener('mousemove', onMouseMove);
        element.style.zIndex = 100;
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            let mr = window.getComputedStyle(field, null).getPropertyValue('width');
            let width = document.body.clientWidth;
            //console.log(mr.slice(0, -2));
            element.style.left = pageX - ShiftX - width / 2 + (mr.slice(0, -2)) / 2 - 10 + 'px';
            element.style.top = pageY - ShiftY - 132 + 'px';
        }

        function onMouseMove(event) {
            drag.drag = true;
            moveAt(event.pageX, event.pageY);
            element.style.display = 'none';
            let elementBelow = document.elementFromPoint(event.clientX, event.clientY);
            element.style.display = 'flex';
            if (!elementBelow) return;
            droppableBelow = elementBelow.closest('.empty');
        }

        function liveDroppable(IndexLeft, IndexTop, element) {
            element.style.top = `${IndexTop * sizeOfOnePuzzleItem}%`;
            element.style.left = `${IndexLeft * sizeOfOnePuzzleItem}%`;
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
        drag.drag = false;
    }

    enterDroppable(IndexLeft, IndexTop, element, elem) {
        this.elements.moves += 1;
        this.elements.move.innerText = ` Ходов: ${this.elements.moves}`;
        element.style.top = `${this.elements.empty.top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        element.style.left = `${this.elements.empty.left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        const emptyLeft = this.elements.empty.left;
        const emptyTop = this.elements.empty.top;
        this.elements.empty.left = IndexLeft;
        this.elements.empty.top = IndexTop;
        elem.left = emptyLeft;
        elem.top = emptyTop;
        this.elements.empty.dom.style.top = `${this.elements.empty.top * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        this.elements.empty.dom.style.left = `${this.elements.empty.left * this.puzzleSettings.sizeOfOnePuzzleItem}%`;
        const finish = this.elements.elemArr.every(item => {
            return item.value === item.top * this.puzzleSettings.puzzleLength + item.left;
        })
        if (finish) setTimeout(() => {
            alert(`Ура! вы выиграли головоломку за и ${minits.innerText}${seconds.innerText} и ${this.elements.moves} ходов`);
            if (localStorage.getItem('result') != null) this.elements.result = JSON.parse(localStorage.getItem('result'));
            let moves = this.elements.moves;
            for (let item of this.elements.result) {
                if (item.moves > moves || item.moves === undefined) {
                    item.moves = moves;
                    item.time = `${minits.innerText}${seconds.innerText}`;
                    break;
                }
            }
            localStorage.setItem('result', JSON.stringify(this.elements.result));
            this.elements.win = true;
            restart.click();
        }, 250);;
    }
}

export {
    Puzzle
};