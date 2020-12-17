"use strict";

let selected = false;

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    document.querySelector("main #subscriptions").addEventListener("click", selectSubscription);
    document.querySelector("input").addEventListener("click", checkIfReadyToPay);
}


function selectSubscription(e) {
    e.preventDefault();
    let selectedSubscription = e.target.closest("section",);
    if (selectedSubscription === document.querySelector("#subscriptionFree") ||
        selectedSubscription === document.querySelector("#subscriptionBasic") ||
        selectedSubscription === document.querySelector("#subscriptionPremium")) {
        fillInSelectedSubscription(selectedSubscription);
        selected = true;
    } else {
        selected = false;
    }
    emptyNonSelectedSubscriptions(selectedSubscription);
}

function fillInSelectedSubscription(subscriptionTypeSection) {
    subscriptionTypeSection.style.backgroundColor = "#983628";
    subscriptionTypeSection.style.color = "white";
    subscriptionTypeSection.style.borderColor = "white";
    subscriptionTypeSection.querySelector("h2").style.borderColor = "white";
    subscriptionTypeSection.querySelector("p").style.borderColor = "white";
    subscriptionTypeSection.classList.add("selected");

}

function emptyNonSelectedSubscriptions(selectedSubscription) {
    let sections = [];
    document.querySelectorAll("section").forEach(element => sections.push(element));
    sections.forEach(section => {
        if (section !== selectedSubscription) {
            section.style.backgroundColor = "white";
            section.style.color = "#0C1B33";
            section.style.borderColor = "#0C1B33";
            section.querySelector("h2").style.borderColor = "#0C1B33";
            section.querySelector("p").style.borderColor = "#0C1B33";
            section.classList.remove("selected");
        }
    });
}

function checkIfReadyToPay(e) {
    let subscriptions = e.target.parentNode.children[0].children;
    let subscriptionId = 0;
    for (let subscription of subscriptions) {
        subscriptionId++;
        if (subscription.classList.contains("selected")) {
            console.log(subscriptionId);
            apiCall(`updateSubscription/1/${subscriptionId}`, "GET", null).then(() => {
                setTimeout(window.location.href = "map.html", 1000);
            });
        }
    }
}
