const buttonsNumber = document.querySelectorAll('[data-number]');
const buttonsOperation = document.querySelectorAll('[data-operation]');
const buttonsEquals = document.querySelector('[data-equals]');
const buttonsDelite = document.querySelector('[data-delete]');
const buttonSqr = document.querySelector('[data-sqr]');
const buttonMinus = document.querySelector('[data-minus]');
const buttonsAllClear = document.querySelector('[data-all-clear]');
const previosOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


class Calculator {
    constructor(previosOperandTextElement, currentOperandTextElement) {
        this.previosOperandTextElement = previosOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() { // очистить 
        this.previosOperand = '';
        this.currentOperand = '';
        this.operation = undefined;

    }

    delite() { // Удалить
        this.currentOperand = this.currentOperand.toString().slice(0, -1);


    }

    appendNumber(number) { // Добавить число 
        if (number === '.' && this.currentOperand.includes('.')) return; // Точка 



        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    choseOperation(operation) { // Текущая операция
        if (this.currentOperand === '' || this.currentOperand === '.' ) return;
        if (this.currentOperand[this.currentOperand.length - 1] === '.') this.currentOperand += 0;
        if (this.previosOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previosOperand = this.currentOperand;
        this.currentOperand = '';

    }


    compute() {
        if (this.previosOperand !== '' && this.currentOperand !== '') {

            let prev = parseFloat(this.previosOperand);
            let curr = parseFloat(this.currentOperand);
            let done;

            switch (this.operation) {
                case '+':
                    done = prev + curr;
                    break;

                case '-':
                    done = prev - curr;
                    break;

                case '*':
                    done = prev * curr;
                    break;

                case '÷':
                    done = prev / curr;
                    break;

                case 'xn':
                    done = prev ** curr;
                    break;

                default:
                    break;
            }
            this.readyToReset = true;
            this.currentOperand = parseFloat(done.toFixed(16));
            this.previosOperand = '';
            this.operation = '';
            this.updateScreen();



        }

    }

    updateScreen() { // Обновить экран
        if(this.currentOperand === 'Err'){
            this.currentOperandTextElement.innerText = this.currentOperand;
            this.currentOperand = '';
            return;
        }


        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        this.previosOperandTextElement.innerText = this.getDisplayNumber(this.previosOperand);
        if (this.operation != undefined) this.previosOperandTextElement.innerText += this.operation;


    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


}

const calculator = new Calculator(previosOperandTextElement, currentOperandTextElement);



buttonsNumber.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previosOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }



        calculator.appendNumber(button.innerText);
        calculator.updateScreen();
    })
})

buttonsOperation.forEach(button => {
    button.addEventListener('click', () => {


        calculator.choseOperation(button.innerText);
        calculator.updateScreen();
    })
})

buttonsAllClear.addEventListener('click', () => {
    calculator.readyToReset = false;
    calculator.clear();
    calculator.updateScreen();
})

buttonsEquals.addEventListener('click', () => {

    calculator.compute();
    calculator.updateScreen();
})

buttonsDelite.addEventListener('click', () => {

    calculator.delite();
    calculator.updateScreen();
})

buttonSqr.addEventListener('click', () => {
    let sqr;
    if (calculator.currentOperand !== '') {
        sqr = parseFloat(calculator.currentOperand);
        if (sqr < 0) {
            alert('Упс, для корня введите положительное значение!');
            calculator.currentOperand = 'Err';
            calculator.updateScreen();
            throw new SyntaxError("Данные некорректны");

        }



        sqr = Math.sqrt(sqr);
        console.log(sqr);
        calculator.currentOperand = '';
        calculator.appendNumber(sqr);
    }





    calculator.updateScreen();
})

buttonMinus.addEventListener('click', () => {
    let sqr;
    console.log(calculator.currentOperand);
    if (calculator.currentOperand !== '') {
        sqr = parseFloat(calculator.currentOperand);
       
        sqr = sqr * -1;

        console.log(sqr);
        calculator.currentOperand = '';
        calculator.appendNumber(sqr);
    }
    if (calculator.currentOperand === '') {
        
        calculator.appendNumber('-');
    }





    calculator.updateScreen();
})