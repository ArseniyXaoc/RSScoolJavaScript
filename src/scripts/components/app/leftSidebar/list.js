import ElementsCreator from '../../../utils/elementsCreator';

export default class List {
    constructor() {
        this.countryData = [];
        this.list = document.querySelector('.list');
        this.countryContainers = [];
        this.search = {};
        this.activatedCountryContainer = undefined;
    }

    createHTML() {
        const listHeader = ElementsCreator.crateElement('h2', 'list_header', this.list);
        listHeader.innerText = 'Cases by Country';
        this.search = ElementsCreator.crateElement('input', 'search', this.list);
        this.search.placeholder = 'Enter the country';
        return Array(this.countryData.length).fill('').map(() => {
            const block = ElementsCreator.crateElement('button', 'country_container', this.list);
            const casesSpan = ElementsCreator.crateElement('span', 'country_cases', block);
            const nameSpan = ElementsCreator.crateElement('span', 'country', block);
            const flagImg = ElementsCreator.crateElement('img', 'country_flag', block);
            flagImg.alt = 'flag';
            return {
                container: block,
                flag: flagImg,
                name: nameSpan,
                cases: casesSpan,
            };
        });
    }

    showContent(data, state) {
        this.countryData = data;
        if (this.countryContainers.length < 1) {
            this.countryContainers = this.createHTML();
        }
        this.dataSort(state);
        this.countryData.forEach((element, item) => {
            this.countryContainers[item].cases.innerText = `${element[state]} `;
            this.countryContainers[item].name.innerText = `${element.Country} `;
            this.countryContainers[item].flag.src = `https://www.countryflags.io/${element.CountryCode}/flat/16.png`;
        });
        this.addListener();
    }

    addListener() {
        this.search.addEventListener('keyup', () => this.onKeyup(this.search.value));
    }

    onKeyup(searchValue) {
        this.countryContainers.map((item) => {
            const country = item;
            if (!country.name.innerText.toLowerCase().startsWith(searchValue.toLowerCase())) {
                country.container.className = 'hidden_container';
            } else {
                country.container.className = 'country_container';
            }
            return this;
        });
    }

    dataSort(state) {
        this.countryData = this.countryData.sort((a, b) => b[state] - a[state]);
    }

    setActivatedCountry(countryName, container) {
        if (this.activatedCountryContainer !== undefined) {
            this.activatedCountryContainer.removeAttribute('id');
        }
        if (!countryName) {
            this.activatedCountryContainer = undefined;
        } else {
            this.activatedCountryContainer = container;
            this.activatedCountryContainer.id = 'checked_country';
            this.activatedCountryContainer.scrollIntoView();
        }
        return countryName;
    }

    searchContainerByName(name) {
        return this.countryContainers.reduce((callBack, container) => {
            if (container.name.innerText === name) {
                return container.container;
            }
            return callBack;
        }, 0);
    }
}
