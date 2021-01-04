import ElementsCreator from '../../../utils/elementsCreator';

export default class GlobalCases {
    constructor() {
        this.allCountriesData = [];
        this.globalCasesElement = document.querySelector('.globalCases');
        this.upDateSpan = {};
        this.stateSpan = {};
        this.valueSpan = {};
        this.date = '';
        this.createHTML();
    }

    createHTML() {
        this.upDateSpan = ElementsCreator.crateElement('span', 'globalCases_upDate', this.globalCasesElement);
        const globalCases = ElementsCreator.crateElement('h2', 'globalCases_header', this.globalCasesElement);
        globalCases.innerText = 'Global cases';
        this.valueSpan = ElementsCreator.crateElement('span', 'globalCases_value', this.globalCasesElement);
        this.stateSpan = ElementsCreator.crateElement('span', 'globalCases_state', this.globalCasesElement);
    }

    showContent(data, state, date) {
        this.dateParse(date);
        this.upDateSpan.innerText = `updated ${this.date}`;
        this.allCountriesData = data;
        const stateBody = state.split('Total').join('');
        const newCases = 'New'.concat(stateBody);
        const totalCases = 'Total'.concat(stateBody);
        this.valueSpan.innerText = `${this.allCountriesData[newCases]} / ${this.allCountriesData[totalCases]}`;
        this.stateSpan.innerText = `new ${stateBody.toLowerCase()} / total ${stateBody.toLowerCase()}`;
    }

    dateParse(date) {
        const d = new Date(date);
        this.date = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }
}
