import './initial';

class Statistic {
    constructor() {
        this.statisticArray = [{
            word: null,
            translation: null,
            category: null,
            click: 0,
            correct: 0,
            wrong: 0,
            '%errors': 0.00,
        }];
    }

    statisticCashWord(word, translation, category, click, correct, wrong) {

        const pusheObject = this.statisticArray.find(item => item.word === word)

        if (pusheObject) {
            pusheObject.click += click;
            pusheObject.correct += correct;
            pusheObject.wrong += wrong;

            console.log(pusheObject);


        } else {
            this.statisticArray.push({
                word,
                translation,
                _category:category,
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
            });

        }

        console.log(this.statisticArray);

        console.log(this.statisticArray.find(item => item.word === word));

    }

}

export {
    Statistic
};