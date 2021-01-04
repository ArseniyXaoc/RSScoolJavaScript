import '../../../styles/table.scss';
import TableDataServise from './table.data-service';
import {
    tableStates,
} from './table.config';
import {
    querySelector, classListContains,
    setLastChildTextValue, toggleCheckedState,
    createTableColumn, addFieldToDivElement, clearData,
} from '../../utils/table.htmlUtils';
import ElementCreaton from '../chart/elementCreation';

export default class TableComponent {
    constructor() {
        this.tableDataServise = new TableDataServise();
        this.countryPopulation = {};
        this.fetchSetAPIData = {};
        this.currentCountry = '';
        this.confirmedList = querySelector('.table__sick');
        this.deathsList = querySelector('.table__death');
        this.recoveredList = querySelector('.table__get-well');
        this.titleElement = querySelector('.switch__main-text');
        this.tableIndicator = querySelector('.table__indicators');
        this.allCountry = querySelector('.table__country');
        this.allCountrySick = querySelector('.table__country-sick');
        this.allCountryDeath = querySelector('.table__country-death');
        this.allCountryWell = querySelector('.table__countryget-well');
        this.activeState = tableStates.total;
        this.switchTotalOrDay = querySelector('.amount-checkbox');
        this.globalOr100k = querySelector('.indicator-checkbox');
        this.coutryPopulationData = {};
        this.createInterface();
    }

    dataProcessing() {
        this.globalDataCases = this.tableDataServise.fetchGlobalData(
            this.fetchSetAPIData,
            tableStates.global,
            this.activeState,
            this.currentCountry,
            this.globalOr100k.checked,
            this.coutryPopulationData,
        );
        this.currentCountryName = this.tableDataServise.dataApiStateURL.Country;
        if (this.currentCountryName) this.titleElement.innerText = this.currentCountryName;
        else this.titleElement.innerText = 'Global';
    }

    updateData(fetchData) {
        this.fetchSetAPIData = fetchData;
        this.dataProcessing();
        this.renderData();
        this.setAllCountries();
    }

    setAllCountries() {
        this.fetchSetAPIData.Countries.forEach((item) => {
            const country = item.Country;
            const confirmed = item.TotalConfirmed;
            const death = item.TotalDeaths;
            const recovered = item.TotalRecovered;
            this.addAllDataCountry(country, confirmed, death, recovered);
        });
    }

    updatePopulationData(fetchData) {
        this.coutryPopulationData = fetchData;
        this.hendlerEventCheckbox();
    }

    hendlerEventCheckbox() {
        this.switchTotalOrDay.addEventListener('change', (event) => this.changeSetData.call(this, event));
        this.globalOr100k.addEventListener('change', (event) => this.changeSetData.call(this, event));
    }

    changeCountry(Country) {
        this.currentCountry = Country;
        clearData(this.DivElementArr);
        this.dataProcessing();
        this.renderData();
    }

    changeSetData(event) {
        clearData(this.DivElementArr);
        if (this.switchTotalOrDay.checked) {
            this.activeState = tableStates.new;
        } else if (!this.switchTotalOrDay.checked) {
            this.activeState = tableStates.total;
        }

        toggleCheckedState(event.target);
        this.dataProcessing();
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    createInterface() {
        this.DivElementArr = createTableColumn();
        addFieldToDivElement(this.DivElementArr);
    }

    renderData() {
        this.confirmedList.appendChild(this.DivElementArr.confirmedElement);
        this.deathsList.appendChild(this.DivElementArr.deathsElement);
        this.recoveredList.appendChild(this.DivElementArr.recoveredElement);
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    static addDataToNewDivElement(arr, data) {
        Object.keys(arr).forEach((key) => {
            if (classListContains(arr[key], 'table__sick')) setLastChildTextValue(arr[key], `${data.Confirmed}\n`);
            if (classListContains(arr[key], 'table__death')) setLastChildTextValue(arr[key], `${data.Deaths}\n`);
            if (classListContains(arr[key], 'table__get-well')) setLastChildTextValue(arr[key], `${data.Recovered}\n`);
        });
    }

    // eslint-disable-next-line class-methods-use-this
    addAllDataCountry(country, confirmed, death, recovered) {
        const allCountry = ElementCreaton.createBlock('div', 'table_list-country', this.allCountry);
        allCountry.innerText = country;
        const allConfirmed = ElementCreaton.createBlock('div', 'table_list-country', this.allCountrySick);
        allConfirmed.innerText = confirmed;
        const allDeath = ElementCreaton.createBlock('div', 'table_list-country', this.allCountryDeath);
        allDeath.innerText = death;
        const allRecovered = ElementCreaton.createBlock('div', 'table_list-country', this.allCountryWell);
        allRecovered.innerText = recovered;
    }
}
