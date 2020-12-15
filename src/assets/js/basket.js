"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    loadProductsInBasket();
}

function loadProductsInBasket() {
    apiCall("getBasket/1", "GET", null).then((res) => {
        calculateBasketInformation(res);
        if (res.length === 0) {
                showEmptyBasket();
            } else {
                res.forEach(product => {
                    addProductToBasket(product);
                });
            }
        }
    )
}

function calculateBasketInformation(products) {
    let totalArticlePrice = 0;
    let totalTransportPrice = 0;

    products.forEach(product => {
        totalArticlePrice += product.price;
        totalTransportPrice += 1.5;
    });
    fillBasketInformation(totalArticlePrice, totalTransportPrice);
}

function fillBasketInformation(totalArticlePrice, totalTransportPrice) {
    let total = totalArticlePrice + totalTransportPrice;

    document.querySelector(".fullBasketInformation").innerHTML +=
        `<h3 class="totalArticles">Total for articles: <span>${totalArticlePrice}</span></h3>
        <h3 class="totalTransportation">Transportation costs: <span>${totalTransportPrice}</span></h3>
        <hr>
        <h3 class="total">Total: <span>${total}</span></h3>
        <input type="button" value="Continue to payment">`
}

function showEmptyBasket() {
    document.querySelector(".emptyBasket").innerHTML += `<h2 class="hidden">You're basket is empty</h2>`
}

function addProductToBasket(product) {
    let date = product.date["dayOfMonth"] + "-" + product.date["monthValue"] + "-" + product.date.year;

    document.querySelector(".basketProducts").innerHTML +=
        `<article id="${product.productId}">
            <img src="${product.image}" alt="${product.name}" title="${product.name}">
            <div>
                <h2>Name: <span class="name">${product.name}</span></h2>
                <p data-ownerId="${product.owner.id}">From: <span class="owner">${product.owner.lastName}</span></p>
                <p>Date product added: <span class="date">${date}</span></p>
            </div>
            <form>
                <label for="amount">Amount: <span class="amount">${product.amount}</span></label>
                <input id="amount" min="1" step="1" type="number" value="1">

                <figure>
                    <img src="assets/img/emptyHeart.svg" alt="heart" title="heart" class="emptyheart"/>
                    <figcaption>Move to favorite</figcaption>
                </figure>

                <figure>
                    <img src="assets/img/bin.png" alt="trash bin" title="trash bin" class="bin"/>
                    <figcaption>Delete</figcaption>
                </figure>

            </form>
            <h2 class="price">Price: <span>${product.price}</span></h2>
        </article>`
}