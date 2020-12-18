"use strict";

let config;
document.addEventListener("DOMContentLoaded", init);

async function init() {
    // Temporary hack to allow local testing of the web client and server.
    document.cookie = 'Authorization=Basic cHJvamVjdG1lZGV3ZXJrZXI6dmVya2VlcmQ=';
    config = await loadConfig();

}

async function loadConfig() {
    const response = await fetch("config.json");
    return response.json();
}
