"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();

}

function addToBasket(e) {
    e.target.parentNode.children["1"].innerHTML = "Remove from basket";
    e.target.src = "assets/img/shopping basket checkmark.svg";
    const amount = e.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[3];
    const amountValue = amount.value;
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant",
        "amount": parseInt(amountValue)
    });
    apiCall("addProductToBasket", "POST", data).then();
    calculateBasketAmount();
}

function removeFromBasket(e) {
    e.target.src = "assets/img/basketPlus.svg";
    e.target.parentNode.children["1"].innerHTML = "Add to basket";
    const amount = e.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[3];
    const amountValue = amount.value;
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant",
        "amount": parseInt(amountValue)
    });
    apiCall("removeProductFromBasket", "POST", data).then();
    calculateBasketAmount();
}

function addProductToFavorites(e) {
    e.target.parentNode.children["1"].innerHTML = "Remove from favorite";
    e.target.src = "assets/img/fullHeart.svg";
    const amount = e.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[3];
    const amountValue = amount.value;
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant",
        "amount": parseInt(amountValue)
    });
    apiCall("addProductToFavorite", "POST", data).then();
}

function removeFromFavorites(e) {
    e.target.parentNode.children["1"].innerHTML = "Add to favorite";
    e.target.src = "assets/img/emptyHeart.svg";
    const amount = e.target.parentNode.parentNode.parentNode.childNodes[5].childNodes[3];
    const amountValue = amount.value;
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant",
        "amount": parseInt(amountValue)
    });
    apiCall("removeProductFromFavorite", "POST", data).then();
}

function changeBasketState(e) {
    const basketImage = e.target.src;
    if (basketImage.match("assets/img/basketPlus.svg")) {
        addToBasket(e);
    } else {
        removeFromBasket(e);
    }
}

function changeFavoriteState(e) {
    const favoriteImage = e.target.src;
    if (favoriteImage.match("assets/img/emptyHeart.svg")) {
        addProductToFavorites(e);
    } else {
        removeFromFavorites(e);
    }
}