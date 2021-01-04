import Chart from 'chart.js';
import ElementCreaton from './elementCreation';
import ChartDataServise from '../../services/chart.data-service';
import {
    GLOBAL_TIMELINE,
    COUNTRY_TIMELINE,
    WORLD_POPULATION,
} from '../../constants/chart.constants';
import {
    querySelector,

} from '../../utils/table.htmlUtils';

export default class ChartComponent {
    constructor() {
        this.chartDataService = new ChartDataServise();
        this.chartWrapper = querySelector('.chart');
        this.Canvas = ElementCreaton.createBlock('canvas', 'myChart', this.chartWrapper);
        this.chartData = {};
        this.chart = null;
        this.currentCountry = '';
        this.getData(this.currentCountry);
        this.ctx = this.Canvas.getContext('2d');
        this.createChart();
        this.labelConfermed = 'TotalConfirmed';
        this.labelDeath = 'TotalDeaths';
        this.labelRecovered = 'TotalRecovered';
        this.confirmedButton = querySelector('.table__sick');
        this.deathButton = querySelector('.table__death');
        this.recoveredButton = querySelector('.table__get-well');
        this.checkboxOneDay = querySelector('.amount-checkbox');
        this.checkbox100000 = querySelector('.indicator-checkbox');
        this.eventListenersCheckbox();
    }

    eventListenersCheckbox() {
        this.checkboxOneDay.addEventListener('change', () => {
            this.getData(this.currentCountry);
        });
    }

    changeCountry(country) {
        this.currentCountry = country;
        this.getData(country);
    }

    // eslint-disable-next-line no-dupe-class-members
    eventListeners(chartData) {
        this.confirmedButton.addEventListener('click', () => {
            this.updateChartData(chartData.confermed, null, this.labelConfermed);
        });
        this.deathButton.addEventListener('click', () => {
            this.updateChartData(chartData.death, null, this.labelDeath);
        });
        this.recoveredButton.addEventListener('click', () => {
            this.updateChartData(chartData.recovered, null, this.labelRecovered);
        });
    }

    getData(Country, population) {
        if (Country === '') {
            this.getTotalCountryData(GLOBAL_TIMELINE, '', population);
        } else {
            this.getTotalCountryData(COUNTRY_TIMELINE, Country, population);
        }
    }

    updateChartData(data, date, label) {
        this.chart.data.datasets[0].data = data;
        if (date) this.chart.data.labels = date;
        this.chart.data.datasets[0].label = label;
        this.chart.update();
    }

    updatePopulationData(populationData) {
        this.populationData = populationData;
        this.checkbox100000.addEventListener('change', () => {
            console.log(this.populationData);
            this.getData(this.currentCountry, this.populationData);
        });
    }

    createChart() {
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: null,
                datasets: [{
                    label: null,
                    backgroundColor: '#bb86fc',
                    borderColor: 'rgb(255, 99, 132)',
                    data: null,
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#fff',
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            fontSize: 10,
                            fontColor: '#fff',
                            maxTicksLimit: '10',
                        },
                    }],
                },
            },
        });
    }

    getTotalCountryData(timeline, country, population) {
        if (country === 'United States of America') country = 'India';
        this.chartDataService.getCurrentCountryData(timeline, country).then((data) => {
            let chartData;
            if (this.currentCountry === '') {
                chartData = this.chartDataService.parseDataGlobalArray(data);
            } else {
                chartData = this.chartDataService.parseDataCityArray(data);
            }
            if (this.checkboxOneDay.checked) {
                chartData.confermed = chartData.confermed.slice(-30, chartData.confermed.length);
                chartData.date = chartData.date.slice(-30, chartData.date.length);
            }
            if (this.checkbox100000.checked) {
                let currentCountryPopulation;
                if (country !== '') {
                    currentCountryPopulation = this.populationData.find((item) => item.name === country).population;
                } else currentCountryPopulation = WORLD_POPULATION;

                // eslint-disable-next-line max-len
                chartData.confermed = chartData.confermed.map((item) => ((item / currentCountryPopulation) * 100000).toFixed(3));
            }
            this.updateChartData(chartData.confermed, chartData.date, this.labelConfermed);
            this.eventListeners(chartData);
        });
    }
}
