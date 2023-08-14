import {cities} from './city-name.js';
import {MAP_CONFIG} from './const.js';
import {setMarkerIcon} from './set-marker-icon.js';


const map = L.map('map', {
  center: [MAP_CONFIG.centerLat, MAP_CONFIG.centerLng],
  zoom: MAP_CONFIG.startZoom,
  minZoom: MAP_CONFIG.minZoom,
  label: false,
});

const popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("координаты нажатой точки: " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);



const cityLabels = L.layerGroup();
function initCityLabels() {
  cities.forEach(el => {
    L.marker([`${el.lat}`, `${el.lng}`], {icon: setMarkerIcon(el.iconType, el.iconSize)})
      .bindTooltip(`${el.cityName}`, {
        permanent: true,
        className: "city_name_label",
        offset: [0, 0],
        direction: 'right'
      })
      .addTo(cityLabels);
  });
  // cityLabels.addTo(map);
}
initCityLabels();

const osmMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', name: 'qqq'});
osmMap.name = 'osm';

const customMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16,
  ext: 'jpg',
});
customMap.name = 'custom';


const basemaps = {
  Normal: osmMap,
  Custom: customMap
};

// const overlayLayers = {
//   '<span style="color: red">Показывать города</span>': cityLabels
// };

L.control.layers(basemaps, {
  // collapsed: false,
}).addTo(map);
basemaps.Custom.addTo(map);
map.addLayer(cityLabels);


map.on("baselayerchange", function (event) {
  if (event.layer.name === 'osm') {
    cityLabels.remove();
  } else {
    map.addLayer(cityLabels);
  }
});