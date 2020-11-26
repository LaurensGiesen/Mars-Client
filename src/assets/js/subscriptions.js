"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("main").addEventListener("click", selectSubscription)
}

function selectSubscription(e) {
    e.preventDefault();
    let target = e.target;
    if (target === document.querySelector("#subscriptionFree")) {
        console.log("clicked subscription Free")
    } else if (target === document.querySelector("#subscriptionBasic")) {
        console.log("clicked subscription Basic")
    } else if (target === document.querySelector("#subscriptionPremium")) {
        console.log("clicked subscription Premium")
    }

}
