"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    loadLoremIpsum();
}

function loadLoremIpsum() {
    document.querySelector('#subscriptions').innerHTML =
        `
        <section id="subscriptionFree">
            <h2>Free</h2>
            <ul class="subscriptionStyle">
                <li>Lorem ipsum dolor sit amet, consetetur</li>
                <li>Lorem ipsum dolor sit amet, consetetur</li>
                <li>Lorem ipsum dolor sit amet, consetetur</li>
            </ul>
            <p>Monthly Price: € XXX,XX</p>

        </section>

        <section id="subscriptionBasic">
            <h2>Basic</h2>
            <ul class="subscriptionStyle">
                <li>Lorem ipsum dolor sit amet, consetetur</li>
                <li>Lorem ipsum dolor sit amet, consetetur</li>
                <li>Lorem ipsum dolor sit amet, consetetur</li>
            </ul>
            <p>Monthly Price: € XXX,XX</p>
        </section>

        <section id="subscriptionPremium">
            <h2>Premium</h2>
            <ul class="subscriptionStyle">
                <li>Lorem ipsum dolor sit amet, consetetur</li>
                <li>Lorem ipsum dolor sit amet, consetetur</li>
                <li>Lorem ipsum dolor sit amet, consetetur</li>
            </ul>
            <p>Monthly Price: € XXX,XX</p>
        </section>
        `;
}
