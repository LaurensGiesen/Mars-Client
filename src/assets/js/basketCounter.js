"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    calculateBasketAmount();
}

function calculateBasketAmount() {
    apiCall("getBasket/1", "GET", null).then((res) => {
        document.querySelector('.counter').innerHTML = "" + res.length;
    });
}


