"use strict";

let currentSubscription;

document.addEventListener("DOMContentLoaded", init);

async function init(e) {
    config = await loadConfig();
    showCurrentSubscription(e);
}

function showCurrentSubscription(e) {
    let userId = 1;
    apiCall(`getUser/${userId}`, "GET", null).then((res) => {
        currentSubscription = res["subscription"].type;
        let subscriptions = e.target.body.children[1].children[1].children[2].children[0].children[1].children;
        for (let subscription of subscriptions) {
            let subscriptionText = subscription.innerText.replace(/\s+/g, '').toLowerCase().split("€");
            if (subscriptionText[0] === currentSubscription.toLowerCase()) {
                document.querySelector(`.${subscriptionText[0]}`).style.backgroundColor = "#983628";
                document.querySelector(`.${subscriptionText[0]}`).style.color = "white";
            }
        }
    });
}
