"use strict";
let filterIsOpen = false;
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadMapsJSAPI();
    document.querySelector('#filterContainer').addEventListener('click', openFilterPopUpMap);
    document.querySelector(`input[value='Fruit']`).addEventListener('click', getFruitSeeds);
    document.querySelector(`input[value='Veggies']`).addEventListener('click', getVeggieSeeds);
    document.querySelector('#search').addEventListener('keyup', search);
}

function search(e) {
    //searches for an exact word as it is written, but does not reset
    let searchString = e.target.value.toLowerCase();
    let products = document.getElementById("products").getElementsByTagName("input");
    [...products].forEach(product => {
        //TODO explanation of spread operator
        if (product.value.toLowerCase() === searchString.toLowerCase()) {
            product.classList.remove('hidden');
        }
    })
}


function getFruitSeeds() {
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

function getVeggieSeeds() {
    makeAllSeedsHidden();
    document.querySelectorAll('#products .veggie').forEach(input => {
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
        zoom: 5,
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
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 7,
        minZoom: 0,
        // radius: 3389500,
        name: "Mars",
    });

    map.mapTypes.set("mars", marsMapType);
    map.setMapTypeId("mars");
    // drawRectangle(map);
    // drawPolygon(map);
    // getPosition(map);
    insertGallifrey(map);

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

function insertGallifrey(map) {
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
