import {
    TOTAL_DATA_CONFIRMED,
    TOTAL_DATA_DEATHS,
    TOTAL_DATA_RECOVERED,
    NEW_DATA_CONFIRMED,
    NEW_DATA_DEATHS,
    NEW_DATA_RECOVERED,
    CURRENT_DATA_GLOBAL,
    WORLD_POPULATION,
    CASES_SELECT,
} from '../../constants/table.constants';

const calculateCasesPerOneHundredThousand = (data, population) => ((data / population) * 100000).toFixed(3);

export default class TableDataServise {
    constructor() {
        this.globalDataCases = {};
        this.dataApiStateURL = {};

        this.diseaseTotalData = {
            confirmed: TOTAL_DATA_CONFIRMED,
            death: TOTAL_DATA_DEATHS,
            recovered: TOTAL_DATA_RECOVERED,
        };

        this.diseaseNewData = {
            confirmed: NEW_DATA_CONFIRMED,
            death: NEW_DATA_DEATHS,
            recovered: NEW_DATA_RECOVERED,
        };
    }

    fetchGlobalData(
        apiData,
        state = CURRENT_DATA_GLOBAL,
        dayOrTotal,
        country,
        per100k,
        countryData,
    ) {
        this.dataApiStateURL = apiData[CURRENT_DATA_GLOBAL];

        if (country) {
            this.dataApiStateURL = apiData.Countries.find((item) => item.Country === country);
        }

        if (state === CASES_SELECT.global) {
            if (dayOrTotal === CASES_SELECT.day) {
                if (per100k) {
                    this.getStateAverage(this.dataApiStateURL, this.diseaseTotalData, countryData);
                } else {
                    this.getState(this.dataApiStateURL, this.diseaseTotalData);
                }
            } else if (per100k) {
                this.getStateAverage(this.dataApiStateURL, this.diseaseNewData, countryData);
            } else {
                this.getState(this.dataApiStateURL, this.diseaseNewData);
            }
        }

        return this.globalDataCases;
    }

    getState(dataApiStateURL, diseaseTotalData) {
        this.globalDataCases = {
            Confirmed: dataApiStateURL[diseaseTotalData.confirmed],
            Deaths: dataApiStateURL[diseaseTotalData.death],
            Recovered: dataApiStateURL[diseaseTotalData.recovered],
        };
    }

    getStateAverage(dataApiStateURL, diseaseTotalData, countryData) {
        let population = WORLD_POPULATION;
        if (dataApiStateURL.Country) {
            if (dataApiStateURL.Country === 'United Kingdom') {
                population = 65110000;
            } else {
                population = countryData.find((item) => item.name === dataApiStateURL.Country).population
            }
        }
        this.globalDataCases = {
            Confirmed: calculateCasesPerOneHundredThousand(dataApiStateURL[diseaseTotalData.confirmed], population),
            Deaths: calculateCasesPerOneHundredThousand(dataApiStateURL[diseaseTotalData.death], population),
            Recovered: calculateCasesPerOneHundredThousand(dataApiStateURL[diseaseTotalData.recovered], population),
        };
    }
}
