import './initial';

class Statistic {
    constructor() {
        this.sorting = {
            wordRevers: false,
            translateReverse: false,
            clickRevers: false,
            correctRevers: false,
            wrongRevers: false,
            wrongErrors: false,
        };
        this.statisticArray = [{
            word: '',
            translation: '',
            category: '',
            click: 0,
            correct: 0,
            wrong: 0,
            errors: 0,
        }];

        this.clean = document.querySelector('.clean');
        this.run = document.querySelector('.statistic');
        this.statisticPageObject = document.querySelector('.statistic');
        this.statisticTbody = document.querySelector('.tbody');
        this.statisticThead = document.querySelector('.thead');
    }



    statisticAddWord(word, translation, category, click, correct, wrong) {


        const pusheObject = this.statisticArray.find((item) => item.word === word);

        if (pusheObject) {
            pusheObject.click += click;
            pusheObject.correct += correct;
            pusheObject.wrong += wrong;
            pusheObject.errors = Math.floor(pusheObject.wrong / (pusheObject.correct + pusheObject.wrong) * 100);
        } else {
            this.statisticArray.push({
                word,
                translation,
                _category: category,
                get category() {
                    switch (this._category) {
                        case '1':
                            return 'Action (Set A)';
                        case '2':
                            return 'Action (Set B)';
                        case '3':
                            return 'Action (Set C)';
                        case '4':
                            return 'Adjective';
                        case '5':
                            return 'Animal (Set A)';
                        case '6':
                            return 'Animal (Set B)';
                        case '7':
                            return 'Clothes';
                        case '8':
                            return 'Emotion';
                        default:
                            return 'Hardest';
                    }
                },
                click,
                correct,
                wrong,
                errors: 0,
            });
        }
        localStorage.setItem('statisticArray', JSON.stringify(this.statisticArray));
    }

    clearElement(elementForClean) {
        while (elementForClean.firstChild) {
            elementForClean.removeChild(elementForClean.firstChild);
        }
    }

    staticAddToPage() {
        if (this.statisticTbody) this.clearElement(this.statisticTbody);
        this.statisticArray.forEach((element) => {
            const newRow = this.statisticTbody.insertRow();
            const word = document.createElement('td');
            const translation = document.createElement('td');
            const category = document.createElement('td');
            const click = document.createElement('td');
            const correct = document.createElement('td');
            const wrong = document.createElement('td');
            const errors = document.createElement('td');
            word.innerText = `${element.word}`;
            translation.innerText = `${element.translation}`;
            category.innerText = `${element.category}`;
            click.innerText = `${element.click}`;
            correct.innerText = `${element.correct}`;
            wrong.innerText = `${element.wrong}`;
            errors.innerText = `${element.errors}`;
            newRow.appendChild(word);
            newRow.appendChild(translation);
            newRow.appendChild(category);
            newRow.appendChild(click);
            newRow.appendChild(correct);
            newRow.appendChild(wrong);
            newRow.appendChild(errors);
        });
    }

    returnSortParametr(parametr, firstElement, secondElement) {
        if (parametr) {
            return firstElement > secondElement ? 1 : -1;
        }
        return firstElement > secondElement ? -1 : 1;
    }

    sort(param) {
        if (param.target.closest('.thead__word')) this.wordRevers = !this.wordRevers;
        if (param.target.closest('.thead__translation')) this.translateReverse = !this.translateReverse;
        if (param.target.closest('.thead__clicks')) this.clickRevers = !this.clickRevers;
        if (param.target.closest('.thead__correct')) this.correctRevers = !this.correctRevers;
        if (param.target.closest('.thead__wrong')) this.wrongRevers = !this.wrongRevers;
        if (param.target.closest('.thead__errors')) this.wrongErrors = !this.wrongErrors;

        this.statisticArray.sort((a, b) => {
            let firstElement;
            let secondElement;
            const key = true;
            const closest = (item) => param.target.closest(item);
            switch (key) {
                case closest('.thead__word'):
                    firstElement = a.word.slice(0, 1);
                    secondElement = b.word.slice(0, 1);
                    return this.returnSortParametr(this.wordRevers, firstElement, secondElement);
                case closest('.thead__translation'):
                    firstElement = a.translation.slice(0, 1);
                    secondElement = b.translation.slice(0, 1);
                    return this.returnSortParametr(this.wordRevers, firstElement, secondElement);
                case closest('.thead__clicks'):
                    firstElement = a.click;
                    secondElement = b.click;
                    return this.returnSortParametr(this.clickRevers, firstElement, secondElement);
                case closest('.thead__correct'):
                    firstElement = a.correct;
                    secondElement = b.correct;
                    return this.returnSortParametr(this.correctRevers, firstElement, secondElement);
                case closest('.thead__wrong'):
                    firstElement = a.wrong;
                    secondElement = b.wrong;
                    return this.returnSortParametr(this.wrongRevers, firstElement, secondElement);
                case closest('.thead__errors'):
                    firstElement = a.errors;
                    secondElement = b.errors;
                    return this.returnSortParametr(this.wrongErrors, firstElement, secondElement);
                default:
                    break;
            }
        });
        this.staticAddToPage(); // статистика
    }

    staticClean() {
        this.statisticArray = [{
            word: '',
            translation: '',
            category: '',
            click: 0,
            correct: 0,
            wrong: 0,
            errors: 0,
        }];
    }


}

export {
    Statistic,
};