"use strict";

let currentSubscription;

document.addEventListener("DOMContentLoaded", init);

async function init(e) {
    config = await loadConfig();
    showCurrentSubscription(e);
}

function showCurrentSubscription(e) {
    const userId = 1;
    apiCall(`getUser/${userId}`, "GET", null).then((res) => {
        currentSubscription = res["subscription"].type;
        const subscriptions = e.target.body.children[1].children[1].children[2].children[0].children[1].children;
        for (const subscription of subscriptions) {
            const subscriptionText = subscription.innerText.replace(/\s+/g, '').toLowerCase().split("€");
            if (subscriptionText[0] === currentSubscription.toLowerCase()) {
                document.querySelector(`.${subscriptionText[0]}`).style.color = "#983628";
                document.querySelector(`.${subscriptionText[0]}`).style.fontWeight= "bold";
                document.querySelector(`.${subscriptionText[0]}`).style.fontSize= "1.05rem";
            }
        }
    });
}
