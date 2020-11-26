"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("main").addEventListener("click", selectSubscription)
}

function selectSubscription(e) {
    e.preventDefault();
    let target = e.target;
    if (target === document.querySelector("#subscriptionFree") ||
        target === document.querySelector("#subscriptionBasic") ||
        target === document.querySelector("#subscriptionPremium")) {
        fillInSelectedSubscription(target);
    }
}

function fillInSelectedSubscription(subscriptionTypeSection) {
    subscriptionTypeSection.style.backgroundColor = "gray";
}
