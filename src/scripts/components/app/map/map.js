import * as L from 'leaflet';

export default class Map {
    constructor() {
        this.covidData = {};
        this.coordinatesData = {};
        this.map = {};
        this.mapCondition = '';
        this.popupDescription = 'total confirmed';
        this.countryMarkers = [];
        this.scaleFactor = { TotalConfirmed: 10, TotalDeaths: 0.5, TotalRecovered: 5 };
        this.createMap();
    }

    getCoordinates() {
        const json = require('../../../../assets/countries.json');
        json.map((country) => {
            this.coordinatesData[country.country_code] = country.latlng;
            return country.latlng;
        });
    }

    createMap() {
        this.getCoordinates();
        this.map = L.map('map').setView([0, 0], 1);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            noWrap: true,
            bounds: [[-90, -180], [90, 180]],
        }).addTo(this.map);
        this.map.options.minZoom = 1;
        this.map.options.noWrap = true;
        this.setLegend();
    }

    updateMapData(covidData = {}, condition) {
        this.covidData = covidData;
        this.mapCondition = condition;
        this.popupDescription = condition.split('Total').join('total ').toLowerCase();
        if (this.countryMarkers.length !== 0) {
            this.countryMarkers.map((marker) => this.map.removeLayer(marker));
        }
        this.covidData.map((country) => this.setMarker(country));
    }

    setMarker(country) {
        const marker = L.circle(this.coordinatesData[country.CountryCode], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: country[this.mapCondition] / this.scaleFactor[this.mapCondition],
            country: country.Country,
        })
            .addTo(this.map)
            .bindPopup(`${country.Country} ${country[this.mapCondition]} ${this.popupDescription}`);
        marker.on('mouseover', () => marker.openPopup());
        this.countryMarkers.push(marker);
    }

    setLegend() {
        const legend = L.control({ position: 'topright' });
        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            div.className = 'map_legend';
            div.innerHTML += '<span class="legend_circle"></span><span>Cases by country</span>';
            return div;
        };
        legend.addTo(this.map);
    }
}
