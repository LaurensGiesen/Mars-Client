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
    const selectedSubscription = e.target.closest("section");
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
    const select = document.querySelector(".selected");
    if (select !== null){
        const parentElement = select.parentElement;
        const index = Array.prototype.indexOf.call(parentElement.children, select) +1;
        apiCall(`updateSubscription/1/${index}`, "GET", null).then(() => {
            window.location.href = "map.html";
        });
    }else{
        document.querySelector(".error").classList.remove("hidden");
    }
}
