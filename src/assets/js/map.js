"use strict"

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadMapsJSAPI();
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
        center: {lat: 51.20944, lng: 3.224167},
        zoom: 14
    };
    // const mapOptions = {
    //     center: { lat: 0, lng: 0},
    //     zoom: 1,
    //     streetViewControl: false,
    //     mapTypeControlOptions: {
    //         mapTypeIds: ["moon"],
    //     }
    // };
    const map = new google.maps.Map(mapDiv, mapOptions)
    return map;
}
