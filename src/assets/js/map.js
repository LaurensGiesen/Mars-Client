"use strict";

document.addEventListener('DOMContentLoaded', init);
let filterIsOpen = false;

async function init() {
    config = await loadConfig();
    loadMapsJSAPI();
    await loadShop();
    document.querySelector('#filterContainer').addEventListener('click', openFilterPopUpMap);
    document.querySelector(`input[value='Fruit']`).addEventListener('click', makeFruitSeedsVisible);
    document.querySelector(`input[value='Veggies']`).addEventListener('click', makeVeggieVisible);
    document.querySelector('#search').addEventListener('keyup', search);
    document.querySelector('#search').addEventListener('click', resetSearchBar);
}

async function loadShop() {
    const result = apiCall("getLocations", "GET", null).then(r => Array.from(new Set(r.map(
        element => element.cropName))).map(cropName => {
        return (r.find(element => element.cropName === cropName))
    }))
    const crops = await result;

    crops.forEach(element => document.querySelector("#products").innerHTML
        += `<input type="button" value="${element.cropName}" class="${element.cropType} hidden">`)
}

function search(e) {
    if (e.target.value.length < 1 && e.key === "Backspace") {
        makeAllSeedsHidden();
    } else {
        makeAllSeedsHidden();
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
    resetSearchBar();
    let hiddenScrollOut = document.querySelector('#scrollOut');
    if (!filterIsOpen) {
        hiddenScrollOut.classList.remove("behind");
        filterIsOpen = true;
    } else {
        hiddenScrollOut.classList.add("behind");
        filterIsOpen = false;
    }
}

async function runApp() {
    const map = displayMap();
    const markers = await addMarkers(map);
    insertCity(map);
    clusterMarkers(map, markers);
    await addMarkerFunctionalities(map, markers);

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
    const mapDiv = document.querySelector('#map');
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

async function addMarkers(map) {
    const markers = [];
    let locations = [];
    await apiCall("getLocations", "GET", null).then(r => r.forEach(element => locations.push(element)));
    locations.forEach(location => {
        const markerOptions = {
            map: map,
            position: {lat: location.latitude, lng: location.longitude},
            icon: './assets/img/pin green.png'
        };
        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker)
    });
    return markers;
}

async function addMarkerFunctionalities(map, markers) {
    let locations = [];
    let infoWindow = new google.maps.InfoWindow()
    await apiCall("getLocations", "GET", null).then(r => r.forEach(element => locations.push(element)));
    markers.map(marker => {
        marker.addListener('click', event => {
            const loc = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            map.panTo(loc);
            locations.forEach(element => {
                if (element.longitude === loc.lng && element.latitude === loc.lat) {
                    infoWindow.setContent(
                        `<h2>Crop Information</h2>
                        <p>Longitude: <span class="longitude">${element.longitude}</span></p>
                        <p>Latitude: <span class="latitude">${element.latitude}</span></p>
                        <p>Crop name: <span class="cropName">${element.cropName}</span></p>
                        <p>Crop type: <span class="cropType">${element.cropType}</span></p>
                        <p>Ratio: <span class="ratio">${element.ratio}</span></p>`
                    )
                    infoWindow.open(map, marker)
                }
            });
        });
    });
}


function clusterMarkers(map, markers) {
    const path = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer";
    const clusterOptions = { minimumClusterSize: 10, imagePath: `${path}/m`};
    new MarkerClusterer(map, markers, clusterOptions);
}

function getPosition(map) {
    map.addListener("click", (mapsMouseEvent) => {
        clickOnMarker(JSON.stringify(mapsMouseEvent.latLng.toJSON()));
    });
    return null;
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
