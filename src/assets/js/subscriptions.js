"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("main #subscriptions").addEventListener("click", selectSubscription)
}


function selectSubscription(e) {
    e.preventDefault();
    let selectedSubscription = e.target.closest("section",);
    if (selectedSubscription === document.querySelector("#subscriptionFree") ||
        selectedSubscription === document.querySelector("#subscriptionBasic") ||
        selectedSubscription === document.querySelector("#subscriptionPremium")) {
        fillInSelectedSubscription(selectedSubscription);
    }
    emptyNonSelectedSubscriptions(selectedSubscription);
}

function fillInSelectedSubscription(subscriptionTypeSection) {
    subscriptionTypeSection.style.backgroundColor = "#983628";
    subscriptionTypeSection.style.color = "white";
    subscriptionTypeSection.style.borderColor = "white";
    subscriptionTypeSection.querySelector("h2").style.borderColor = "white";
    subscriptionTypeSection.querySelector("p").style.borderColor = "white";

}

function emptyNonSelectedSubscriptions(selectedSubscription) {
    let sections = [];
    document.querySelectorAll("section").forEach(element => sections.push(element));
    sections.forEach(section => {
        if (section !== selectedSubscription) {
            section.style.backgroundColor = "white";
            section.style.color = "#0C1B33";
            section.style.borderColor = "#0C1B33"
            section.querySelector("h2").style.borderColor = "#0C1B33";
            section.querySelector("p").style.borderColor = "#0C1B33"
        }
    })
}
