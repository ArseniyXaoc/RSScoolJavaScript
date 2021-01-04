export default class ChartDataServise {
    constructor() {
        this.dataArray = {};
    }

    // eslint-disable-next-line class-methods-use-this
    async getCountryData(dataApi, country) {
        try {
            const response = await fetch(`${dataApi}${country}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('NO_DATA_TEXT');
        }
    }

    async getCurrentCountryData(dataApi, country) {
        try {
            return await this.getCountryData(dataApi, country);
        } catch (error) {
            throw new Error('NO_DATA_TEXT');
        }
    }

    parseDataCityArray(data) {
        const date = data.map((item) => item.Date.slice(0, 10));
        const confermed = data.map((item) => item.Confirmed);
        const death = data.map((item) => item.Deaths);
        const recovered = data.map((item) => item.Recovered);
        this.dataArray = {
            date,
            confermed,
            death,
            recovered,
        };
        return (this.dataArray);
    }

    parseDataGlobalArray(data) {
        const date = data.map((item) => item.last_update.slice(0, 10));
        date.reverse();
        const confermed = data.map((item) => item.total_cases);
        confermed.reverse();
        const death = data.map((item) => item.total_deaths);
        death.reverse();
        const recovered = data.map((item) => item.total_recovered);
        recovered.reverse();
        this.dataArray = {
            date,
            confermed,
            death,
            recovered,
        };
        return (this.dataArray);
    }
}
