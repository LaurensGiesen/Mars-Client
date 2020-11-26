"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("main").addEventListener("click", selectSubscription)
}
function selectSubscription(e) {
    e.preventDefault();
    let selectedSubscription = e.target;
    if (selectedSubscription === document.querySelector("#subscriptionFree") ||
        selectedSubscription === document.querySelector("#subscriptionBasic") ||
        selectedSubscription === document.querySelector("#subscriptionPremium")) {
        fillInSelectedSubscription(selectedSubscription);
    }

    emptyNonSelectedSubscriptions(selectedSubscription);
}

function fillInSelectedSubscription(subscriptionTypeSection) {
    subscriptionTypeSection.style.backgroundColor = "gray";
}

function emptyNonSelectedSubscriptions(selectedSubscription) {
    let sections = [];
    document.querySelectorAll("section").forEach(element => sections.push(element));
    sections.forEach(section => {
        if (section !== selectedSubscription) {
            section.style.backgroundColor = "transparent"
        }
    })
}
