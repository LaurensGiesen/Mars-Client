"use strict";

document.addEventListener("DOMContentLoaded", run);

function run() {
    document.querySelector("#change > table > tbody > tr:nth-child(1) > th:nth-child(2) > a")
        .addEventListener("click", openPopupSubscription);
    document.querySelector(".close").addEventListener("click", closePopupSubscription);
}

function openPopupSubscription(e) {
    e.preventDefault();
    document.getElementById("popup").style.display = "flex";

}

function closePopupSubscription(e) {
    e.preventDefault();
    document.getElementById("popup").style.display = "none";
}

