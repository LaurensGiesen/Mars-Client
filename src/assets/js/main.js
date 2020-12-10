let config;
let api;
const h1Element = document.querySelector("h1");

document.addEventListener("DOMContentLoaded", init);

async function init() {
    // Temporary hack to allow local testing of the web client and server.
    document.cookie = 'Authorization=Basic cHJvamVjdG1lZGV3ZXJrZXI6dmVya2VlcmQ=';
    config = await loadConfig();
    api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
    // Small poc
//    getMessage().then(message => h1Element.innerText = message);
    loadProducts();
    searchProducts();
    loadSortValues();
    document.querySelector('#order').addEventListener('change', marketPlaceSorting);
    document.querySelector('#sortby').addEventListener('change', marketPlaceFilter);
    filterProducts();
    document.querySelector('#linkToAddProduct').addEventListener('click', goToAddProduct);
}

async function loadConfig() {
    const response = await fetch("config.json");
    return response.json();
}

const header = Vue.createApp({})