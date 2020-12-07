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
        }
        this.statisticArray = [{
            word: '',
            translation: '',
            category: '',
            click: 0,
            correct: 0,
            wrong: 0,
            errors: 0,
        }];

        this.run = document.querySelector('.statistic');
        this.statisticPageObject = document.querySelector('.statistic');
        this.statisticTbody = document.querySelector('.tbody');
        this.statisticThead = document.querySelector('.thead');
    }

    // eslint-disable-next-line class-methods-use-this


    statisticCashWord(word, translation, category, click, correct, wrong) {

        const pusheObject = this.statisticArray.find(item => item.word === word)

        if (pusheObject) {
            pusheObject.click += click;
            pusheObject.correct += correct;
            pusheObject.wrong += wrong;
            pusheObject.errors = Math.floor(pusheObject.wrong / (pusheObject.correct + pusheObject.wrong) * 100);
            console.log(pusheObject);

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

        console.log(this.statisticArray);
        console.log(this.statisticArray.find(item => item.word === word));
    }

    clearPage(elementForClean) {
        while (elementForClean.firstChild) {
            elementForClean.removeChild(elementForClean.firstChild);
        }
    }

    staticAddToPage() {
        if (this.statisticTbody) this.clearPage(this.statisticTbody);
        this.statisticArray.forEach(element => {
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

    sort(param) {

        if (param.target.closest('.thead__word')) this.wordRevers = !this.wordRevers;
        if (param.target.closest('.thead__translation')) this.translateReverse = !this.translateReverse;
        if (param.target.closest('.thead__clicks')) this.clickRevers = !this.clickRevers;
        if (param.target.closest('.thead__correct')) this.correctRevers = !this.correctRevers;
        if (param.target.closest('.thead__wrong')) this.wrongRevers = !this.wrongRevers;
        if (param.target.closest('.thead__errors')) this.wrongErrors = !this.wrongErrors;

        this.statisticArray.sort((a, b) => {
            let f;
            let s;
            if (param.target.closest('.thead__word')) {
                f = a.word.slice(0, 1);
                s = b.word.slice(0, 1);

                if (this.wordRevers) {
                    return f > s ? 1 : -1
                };
                return f > s ? -1 : 1;
            }

            if (param.target.closest('.thead__translation')) {
                f = a.translation.slice(0, 1);
                s = b.translation.slice(0, 1);

                if (this.translateReverse) {
                    return f > s ? 1 : -1
                };
                return f > s ? -1 : 1;
            }

            if (param.target.closest('.thead__clicks')) {
                f = a.click;
                s = b.click;

                if (this.clickRevers) {
                    return f > s ? 1 : -1
                };
                return f > s ? -1 : 1;
            }

            if (param.target.closest('.thead__correct')) {
                f = a.correct;
                s = b.correct;
                if (this.correctRevers) {
                    return f > s ? 1 : -1
                };
                return f > s ? -1 : 1;
            }

            if (param.target.closest('.thead__wrong')) {
                f = a.wrong;
                s = b.wrong;
                if (this.wrongRevers) {
                    return f > s ? 1 : -1
                };
                return f > s ? -1 : 1;
            }

            if (param.target.closest('.thead__errors')) {
                f = a.errors;
                s = b.errors;
                if (this.wrongErrors) {
                    return f > s ? 1 : -1
                };
                return f > s ? -1 : 1;
            }
        })



        console.log(this.statisticArray);
        this.staticAddToPage(); // статистика
    }
}

export {
    Statistic
};