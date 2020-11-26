"use strict"

document.addEventListener("DOMContentLoaded", run);

function run() {
    document.querySelector("#change > table > tbody > tr:nth-child(1) > th:nth-child(2) > a")
        .addEventListener("click", openPopupSubscription)
}

function openPopupSubscription(e) {
    e.preventDefault();
    document.getElementById("popup").style.display = "flex"

}

