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
    const selectedSubscription = e.target.closest("section",);
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

function checkIfReadyToPay(e) {
    const subscriptions = e.target.parentNode.children[0].children;
    let subscriptionId = 0;
    for (const subscription of subscriptions) {
        subscriptionId++;
        if (subscription.classList.contains("selected")) {
            apiCall(`updateSubscription/1/${subscriptionId}`, "GET", null).then(() => {
                window.location.href = "map.html";
            });
        }
    }
}
