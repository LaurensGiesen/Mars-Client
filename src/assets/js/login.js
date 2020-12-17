"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#continueButton").addEventListener("click", continueButton);
}

function continueButton(e) {
    e.preventDefault();
    window.location.href = "registration.html";
}

