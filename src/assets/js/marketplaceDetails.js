"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    loadProductDetails();
}

function loadProductDetails() {
    let jsonProductDetails = localStorage.getItem('productDetail');
    let parseProductDetails = JSON.parse(jsonProductDetails);
    document.querySelector('#productDetail').innerHTML += `
            <img class="productImg" id="${parseProductDetails.name}" alt="${parseProductDetails.name}" src="${parseProductDetails.image}"/>
        <div>
            <h2>Name: ${parseProductDetails.name}</h2>
            <p>Price: ${parseProductDetails.price}</p>
            <p>From: ${parseProductDetails.owner}</p>
            <p>Date product added: ${parseProductDetails.date}</p>
        </div>

        <div id="choice">
            <label for="number">Number: ${parseProductDetails.amount}</label>
            <input id="number" min="1" type="number">
            <figure>
                <img alt="add to basket" class="emptybasket" src="assets/img/basketPlus.svg"
                     title="add to basket"/>
                <figcaption>Add to basket</figcaption>
            </figure>

            <figure class="heart">
                <img alt="add to favorite" class="emptyheart" src="assets/img/emptyHeart.svg"
                     title="add to favorite"/>
                <figcaption>Add to favorite</figcaption>
            </figure>
        </div>
        `
}

