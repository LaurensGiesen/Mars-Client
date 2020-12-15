"use strict";
let filterIsOpen = false;
document.addEventListener('DOMContentLoaded', init);

async function init() {
    config = await loadConfig();
    loadMapsJSAPI();
    loadShop();
    document.querySelector('#filterContainer').addEventListener('click', openFilterPopUpMap);
    document.querySelector(`input[value='Fruit']`).addEventListener('click', makeFruitSeedsVisible);
    document.querySelector(`input[value='Veggies']`).addEventListener('click', makeVeggieVisible);
    document.querySelector('#search').addEventListener('keyup', search);
    document.querySelector('#search').addEventListener('click', resetSearchBar);
}

function loadShop() {
    const products = document.querySelector("#products");
    apiCall("getLocations", "GET", null).then(r => r.forEach(element => products.innerHTML
        += `<input type="button" value="${element.cropName}" class="${element.cropType} hidden">`))
}

function search(e) {
    let searchString = e.target.value.toLowerCase();
    let products = document.getElementById("products").getElementsByTagName("input");
    [...products].forEach(product => {
        if (product.value.toLowerCase().includes(searchString)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    })
}

function resetSearchBar() {
    document.querySelector('#search').value = '';
    makeAllSeedsHidden();

}

function makeFruitSeedsVisible() {
    makeAllSeedsHidden();
    document.querySelectorAll('#products .fruit').forEach(input => {
        if (input.classList.contains('hidden')) {
            input.classList.remove('hidden');
        } else {
            input.classList.add('hidden');
        }
    });
}

function makeAllSeedsHidden() {
    document.querySelectorAll('#products input').forEach(input => {
        if (!input.classList.contains('hidden')) {
            input.classList.add('hidden');
        }
    });
}

function makeVeggieVisible() {
    makeAllSeedsHidden();
    document.querySelectorAll('#products .vegetable').forEach(input => {
        if (input.classList.contains('hidden')) {
            input.classList.remove('hidden');
        } else {
            input.classList.add('hidden');
        }
    });
}

function openFilterPopUpMap() {
    let hiddenScrollOut = document.querySelector('#scrollOut');
    if (!filterIsOpen) {
        hiddenScrollOut.classList.remove("behind");
        filterIsOpen = true;
    } else {
        hiddenScrollOut.classList.add("behind");
        filterIsOpen = false;
    }
}

function runApp() {
    displayMap();
}

function loadMapsJSAPI() {
    const googleMapsAPIKey = 'AIzaSyBdX-KCWP0DzXrBpOXmDDUIhHNXz0fTkUs';
    const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
    const script = document.createElement('script');

    script.src = googleMapsAPIURL;
    script.defer = true;
    script.async = true;

    window.runApp = runApp;
    document.head.appendChild(script)
}

function displayMap() {
    const mapDiv = document.getElementById('map');
    const mapOptions = {
        center: {lat: 0, lng: 0},
        zoom: 4,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ["mars"],
        }
    };
    const map = new google.maps.Map(mapDiv, mapOptions);

    const marsMapType = new google.maps.ImageMapType({
        getTileUrl(tileCoord, zoom) {
            const normalizedCoord = getNormalizedCoord(tileCoord, zoom);
            if (!normalizedCoord) {
                return "";
            }
            const bound = Math.pow(2, zoom);
            return (
                "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/viking_mdim21_global/"
                +
                zoom +
                "/" +
                normalizedCoord.x +
                "/" +
                (bound - normalizedCoord.y - 1) +
                ".png"
            );
        },
        // tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 1,
        radius: 3389500,
        name: "Mars",
    });

    map.mapTypes.set("mars", marsMapType);
    map.setMapTypeId("mars");
    // drawRectangle(map);
    // drawPolygon(map);
    // getPosition(map);
    insertCity(map);
    addMarkers(map)

    return map;
}


function getNormalizedCoord(tileCoord, zoom) {
    const y = tileCoord.y;
    let x = tileCoord.x;
    const tileRange = 1 << zoom;

    if (y < 0 || y >= tileRange) {
        return null;
    }

    if (x < 0 || x >= tileRange) {
        x = ((x % tileRange) + tileRange) % tileRange;
    }

    return {x: x, y: y};
}

function insertCity(map) {
    const imageBounds = {
        north: 6,
        south: 5,
        east: 6,
        west: 5,
    };
    const gallifreyOverlay = new google.maps.GroundOverlay("assets/img/Gallifrey.png", imageBounds);
    return gallifreyOverlay.setMap(map);

}

function getPosition(map) {
    map.addListener("click", (mapsMouseEvent) => {
        console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON()))
    });
}

function drawRectangle(map) {
    return new google.maps.Rectangle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        bounds: {
            north: 1,
            south: -1,
            east: 1,
            west: -1,
        },
    })
}

function drawPolygon(map) {
    const coordinatesArrayExample = [
        {lat: 1, lng: 1.5},
        {lat: -0.5, lng: 3},
        {lat: 0, lng: 1.5},
        {lat: 1, lng: 1.5}
    ];

    let polygon = new google.maps.Polygon({
        paths: coordinatesArrayExample,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });
    polygon.setMap(map);
}

function addMarkers(map) {
//    TODO: locations for testing only, needs to be linked to DB

    const locations = {
        // location1: {lat: -1.8567844, lng: 3.213108},
        // location2: {lat: -2.8472767, lng: 2.2188164},
        // location3: {lat: -3.8209738, lng: 4.2563253},
        // location4: {lat: -5.8690081, lng: 1.2052393},
        // location5: {lat: -1.8587568, lng: 2.2058246},
        // location6: {lat: -2.858761, lng: 3.2055688},
        // location7: {lat: -1.852228, lng: 4.2038374},
        // location8: {lat: -4.8737375, lng: 1.222569},
        // location9: {lat: -1.864167, lng: 1.216387},
        // location10: {lat: -1.8636005, lng: 1.2092542},
        // location11: {lat: -1.869395, lng: 1.198648},
        // location12: {lat: -1.8665445, lng: 1.1989808},
        // location13: {lat: -1.869627, lng: 1.202146},
        // location14: {lat: -1.87488, lng: 1.1987113},
        // location15: {lat: -1.8605523, lng: 1.1972205}

    }

    const markers = [];
    for (const location in locations) {
        const markerOptions = {
            map: map,
            position: locations[location],
            icon: './assets/img/pin green.png'
        }
        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker);
    }
    return markers;

}
