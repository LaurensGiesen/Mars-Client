"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    calculateBasketAmount();
}

function calculateBasketAmount() {
    apiCall("getBasket/1", "GET", null).then((res) => {
        document.querySelector('.counter').innerHTML = "" + res.length;
    });
}
