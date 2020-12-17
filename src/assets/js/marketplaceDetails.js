"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    loadProductDetails();
    document.querySelector('#backButton').addEventListener('click', goToMarketPlace);
    document.querySelector('.basket').addEventListener("click", changeBasketState);
    document.querySelector('.heart').addEventListener("click", changeFavoriteState);
}
function goToMarketPlace() {
    document.location.href = "marketplace.html";
}

function loadProductDetails() {
    let jsonProductDetails = localStorage.getItem('productDetail');
    let parseProductDetails = JSON.parse(jsonProductDetails);
    document.querySelector('#productDetail').innerHTML +=
        `<article id="${parseProductDetails.productId}">
            <img class="productImg" id="${parseProductDetails.name}" alt="${parseProductDetails.name}" src="${parseProductDetails.image}"/>
       <div>
            <h3>${parseProductDetails.name}</h3>
            <p>Price: ${parseProductDetails.price}</p>
            <p>From: ${parseProductDetails.owner}</p>
            <p>Date product added: ${parseProductDetails.date}</p>
            <p>Amount of products left: <span>${parseProductDetails.amount}</span></p>
        </div>

        <div id="choice">
            <label for="number" class="amount">Amount:</label>
            <input id="number" min="1" type="number" max="${parseProductDetails.amount}">
            <figure class="basket">
                <img alt="add to basket" class="emptyBasket" src="assets/img/basketPlus.svg"
                     title="add to basket"/>
                <figcaption class="basket">Add to basket</figcaption>
            </figure>

            <figure class="heart">
                <img alt="add to favorite" class="emptyHeart" src="assets/img/emptyHeart.svg"
                     title="add to favorite"/>
                <figcaption>Add to favorite</figcaption>
            </figure>
        </div>
        </article>`;
}

function changeBasketState(e) {
    let basketImage = e.target.src;
    if (basketImage.match("assets/img/basketPlus.svg")) {
        addToBasket(e);
    } else {
        removeFromBasket(e);
    }
}

function changeFavoriteState(e) {
    let favoriteImage = e.target.src;
    if (favoriteImage.match("assets/img/emptyHeart.svg")) {
        addProductToFavorites(e);
    } else {
        removeFromFavorites(e);
    }
}

function addProductToFavorites(e) {
    e.target.parentNode.children["1"].innerHTML = "Remove from favorite";
    e.target.src = "assets/img/fullHeart.svg";

    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant"
    });
    apiCall("addProductToFavorite", "POST", data).then();
}

function removeFromFavorites(e) {
    e.target.parentNode.children["1"].innerHTML = "Add to favorite";
    e.target.src = "assets/img/emptyHeart.svg";

    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant"
    });
    apiCall("removeProductFromFavorite", "POST", data).then();
}

function addToBasket(e) {
    e.target.parentNode.children["1"].innerHTML = "Remove from basket";
    e.target.src = "assets/img/shopping basket checkmark.svg";
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant"
    });
    apiCall("addProductToBasket", "POST", data).then();
    calculateBasketAmount();
}

function removeFromBasket(e) {
    e.target.src = "assets/img/basketPlus.svg";
    e.target.parentNode.children["1"].innerHTML = "Add to basket";

    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant"
    });
    apiCall("removeProductFromBasket", "POST", data).then();
    calculateBasketAmount();
}

