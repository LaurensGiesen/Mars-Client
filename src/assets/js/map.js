"use strict";

document.addEventListener('DOMContentLoaded', init);
let filterIsOpen = false;
let map;
let markers = [];

async function init() {
    config = await loadConfig();
    loadMapsJSAPI();
}
async function runApp() {
    map = displayMap();
    markers = await addMarkers();
    insertCity();
    clusterMarkers();
    await loadShop();
    document.querySelector('#filterContainer').addEventListener('click', openFilterPopUpMap);
    document.querySelector('#fruitButton').addEventListener('click', makeFruitSeedsVisible,);
    document.querySelector('#veggieButton').addEventListener('click', makeVeggieVisible);
    document.querySelector('#search').addEventListener('keyup', search);
    document.querySelector('#search').addEventListener('click', resetSearchBar);
    document.querySelectorAll(".crops").forEach(crop => {
        crop.addEventListener('click', () => addMarkers(crop));
    });
}

//FILTER

async function loadShop() {
    const result = apiCall("getLocations/1", "GET", null).then(r => Array.from(new Set(r.map(
        element => element.cropName))).map(cropName => {
        return (r.find(element => element.cropName === cropName))
    }));
    const crops = await result;

    crops.forEach(element => document.querySelector("#products").innerHTML
        += `<input type="button" value="${element.cropName}" class="${element.cropType} hidden crops">`);
}

function openFilterPopUpMap() {
    resetSearchBar();
    makeAllSeedsHidden();
    const hiddenScrollOut = document.querySelector('#scrollOut');
    if (!filterIsOpen) {
        hiddenScrollOut.classList.remove("behind");
        filterIsOpen = true;
    } else {
        hiddenScrollOut.classList.add("behind");
        document.querySelector('#veggieButton').classList.remove('active');
        document.querySelector('#fruitButton').classList.remove('active');
        filterIsOpen = false;
    }
}

function search(e) {
    if (e.target.value.length < 1 && e.key === "Backspace") {
        makeAllSeedsHidden();
        addMarkers().then();
    } else {
        makeAllSeedsHidden();
        const searchString = e.target.value.toLowerCase();
        const products = document.querySelector("#products").getElementsByTagName("input");
        [...products].forEach(product => {
            if (product.value.toLowerCase().includes(searchString)) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    }
}

function resetSearchBar() {
    document.querySelector('#search').value = '';
    makeAllSeedsHidden();
    addMarkers().then();
}

function makeAllSeedsHidden() {
    document.querySelectorAll('#products input').forEach(product => {
        if (!product.classList.contains('hidden')) {
            product.classList.add('hidden');
        }
    });
}

function makeFruitSeedsVisible() {
    makeAllSeedsHidden();
    document.querySelector('#fruitButton').classList.add('active');
    document.querySelector('#veggieButton').classList.remove('active');
    document.querySelectorAll('#products .fruit').forEach(product => {
        if (product.classList.contains('hidden')) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
    changeSeedAndVeggieButtonOrder();
}

function makeVeggieVisible() {
    makeAllSeedsHidden();
    document.querySelector('#veggieButton').classList.add('active');
    document.querySelector('#fruitButton').classList.remove('active');
    document.querySelectorAll('#products .vegetable').forEach(product => {
        if (product.classList.contains('hidden')) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
    changeSeedAndVeggieButtonOrder();
}

function changeSeedAndVeggieButtonOrder() {
    if (document.querySelector('#fruitButton').classList.contains('active')) {
        document.querySelector("#filterOptions").innerHTML = `
            <label for="veggieButton"></label>
            <input id="veggieButton" type="button" value="Veggies">
            <label for="fruitButton"></label>
            <input id="fruitButton" type="button" value="Fruit">`
    } else {
        document.querySelector("#filterOptions").innerHTML = `
            <label for="fruitButton"></label>
            <input id="fruitButton" type="button" value="Fruit">
            <label for="veggieButton"></label>
            <input id="veggieButton" type="button" value="Veggies">`
    }
    document.querySelector('#fruitButton').addEventListener('click', makeFruitSeedsVisible);
    document.querySelector('#veggieButton').addEventListener('click', makeVeggieVisible);
}

//MAP

function loadMapsJSAPI() {
    const googleMapsAPIKey = 'AIzaSyBdX-KCWP0DzXrBpOXmDDUIhHNXz0fTkUs';
    const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;
    const script = document.createElement('script');

    script.src = googleMapsAPIURL;
    script.defer = true;
    script.async = true;

    window.runApp = runApp;
    document.head.appendChild(script);
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
    map = new google.maps.Map(mapDiv, mapOptions);

    const marsMapType = new google.maps.ImageMapType({
        getTileUrl(tileCoord, zoom) {
            const normalizedCoord = getNormalizedCoordinates(tileCoord, zoom);
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


function getNormalizedCoordinates(tileCoordinates, zoom) {
    const y = tileCoordinates.y;
    let x = tileCoordinates.x;
    const tileRange = 1 << zoom;

    if (y < 0 || y >= tileRange) {
        return null;
    }

    if (x < 0 || x >= tileRange) {
        x = ((x % tileRange) + tileRange) % tileRange;
    }

    return {x: x, y: y};
}

function insertCity() {
    const imageBounds = {
        north: 6,
        south: 5,
        east: 6,
        west: 5,
    };
    const gallifreyOverlay = new google.maps.GroundOverlay("assets/img/Gallifrey.png", imageBounds);
    return gallifreyOverlay.setMap(map);
}

function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

async function addMarkers(crop) {
    clearMarkers();
    const locations = [];
    await apiCall("getLocations/1", "GET", null).then(r => r.forEach(element => {
        locations.push(element)
    }));
    locations.forEach(location => {
        if (crop === undefined) {
            const markerOptions = {
                map: map,
                position: {lat: location.latitude, lng: location.longitude},
                icon: './assets/img/pin green.png'
            };
            const marker = new google.maps.Marker(markerOptions);
            markers.push(marker)
        } else {
            if (location.cropName.toLowerCase() === crop.value.toLowerCase()) {
                const markerOptions = {
                    map: map,
                    position: {lat: location.latitude, lng: location.longitude},
                    icon: './assets/img/pin green.png'
                };
                const marker = new google.maps.Marker(markerOptions);
                markers.push(marker);
            }
        }

    });
    await addMarkerFunctionalities();
    return markers;
}

async function addMarkerFunctionalities() {
    const locations = [];
    const infoWindow = new google.maps.InfoWindow();
    await apiCall("getLocations/1", "GET", null).then(r => r.forEach(element => locations.push(element)));
    markers.map(marker => {
        marker.addListener('click', event => {
            const loc = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            map.panTo(loc);
            locations.forEach(element => {
                if (element.longitude === loc.lng && element.latitude === loc.lat) {
                    infoWindow.setContent(
                        `<div class="popup">
                        <h2>Crop Information</h2>
                        <p>Longitude: <span class="longitude">${element.longitude}</span></p>
                        <p>Latitude: <span class="latitude">${element.latitude}</span></p>
                        <p>Crop name: <span class="cropName">${element.cropName}</span></p>
                        <p>Crop type: <span class="cropType">${element.cropType}</span></p>
                        <p>Ratio: <span class="ratio">${element.ratio}</span></p>
                        </div>`
                    );
                    infoWindow.open(map, marker);
                }
            });
        });
    });
}

function clusterMarkers() {
    const path = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer";
    const clusterOptions = {minimumClusterSize: 10, imagePath: `${path}/m`};
    new MarkerClusterer(map, markers, clusterOptions);
}

// function getPosition(map) {
//     map.addListener("click", (mapsMouseEvent) => {
//         console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON()));
//     });
//     return null;
// }
//
// function drawRectangle(map) {
//     return new google.maps.Rectangle({
//         strokeColor: "#FF0000",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#FF0000",
//         fillOpacity: 0.35,
//         map,
//         bounds: {
//             north: 1,
//             south: -1,
//             east: 1,
//             west: -1,
//         },
//     })
// }
//
// function drawPolygon(map) {
//     const coordinatesArrayExample = [
//         {lat: 1, lng: 1.5},
//         {lat: -0.5, lng: 3},
//         {lat: 0, lng: 1.5},
//         {lat: 1, lng: 1.5}
//     ];
//
//     let polygon = new google.maps.Polygon({
//         paths: coordinatesArrayExample,
//         strokeColor: "#FF0000",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#FF0000",
//         fillOpacity: 0.35,
//     });
//     polygon.setMap(map);
// }
