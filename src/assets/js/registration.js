"use strict"
let config;
let api;

document.addEventListener("DOMContentLoaded", init);

let h1 = document.querySelector("h1");

async function init() {

    //document.cookie = 'Authorization=Basic cHJvamVjdG1lZGV3ZXJrZXI6dmVya2VlcmQ=';
    config = await loadConfig();
    api = `${config.host ? config.host + '/' : ''}api/`;
    // Small poc
    getFoo().then(message => h1.innerText = message);

    document.querySelector("input[type='submit']").addEventListener("click", register);

}

async function loadConfig() {
    const response = await fetch("config.json");
    return response.json();
}

function getFoo() {
    return apiCall("message");
}

function register() {
    console.log("foo");
    let data = JSON.stringify({
        firstname: document.querySelector("#foreName").value,
        lastname: document.querySelector("#surName").value,
        email: document.querySelector("#email").value,
        birthDay: document.querySelector("#birthDay").value,
        address: document.querySelector("#address").value,
        number: document.querySelector("#number").value,
        dome: document.querySelector("#dome").value,
        crop1: document.querySelector("#crop1").value,
        crop2: document.querySelector("#crop2").value,
        crop3: document.querySelector("#crop3").value,
    });

    api = `${config.host ? config.host + '/' : ''}`;
    registerCall("register", 'POST', data).then(response => console.log(response));
}