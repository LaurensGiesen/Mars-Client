"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    getFavorites();
}

function getFavorites() {
    const articleContainer = document.querySelector(".articleContainer");
    apiCall("getFavorites/1", "GET", null).then((response) => {
        if (response.length === 0) {
            showEmptyFavorites();
        } else {
            response.forEach(item => {
                displayFavorites(item, articleContainer);
            });
            document.querySelectorAll(".basket").forEach(basket => {
                basket.addEventListener("click", addProductToBasket);
            });
            document.querySelectorAll(".heart").forEach(heart => {
                heart.addEventListener("click", removeProductFromFavorite);
            });
        }
    });
}

function showEmptyFavorites() {
    document.querySelector(".emptyFavorites").innerHTML += `<h2>You have no favorites</h2>`;
}

function displayFavorites(item, articleContainer) {
    articleContainer.innerHTML += `<article id="${item.productId}">
            <img src="${item.image}" alt="product image" title="product-image" class="productImg">
            <div>
                <h2>${item.name}</h2>
                <p>Price: <span>${item.price}</span></p>
                <p>Date: <span>${item.date["dayOfMonth"]}-${item.date["monthValue"]}-${item.date.year}</span></p>
                <p>Amount of product: <span>${item.amount}</span></p>
            </div>
            <div>
                <label for="amount">Amount: </label>
                <input id="amount" min="${item.amount}" type="number" value="${item.amount}" max="${item.amount}">
                <figure>
                    <img src="assets/img/shopping%20basket.svg" title="basket" alt="basket" class="basket">
                    <figcaption>Add To Basket</figcaption>
                </figure>
                <figure>
                    <img alt="heart" src="assets/img/fullHeart.svg" title="heart" class="heart">
                    <figcaption>Remove From Favorites</figcaption>
                </figure>
            </div>
        </article>`;
}

function clearFavorites() {
    document.querySelector(".articleContainer").innerHTML = "";
}

function removeProductFromFavorite(e) {
    clearFavorites();
    removeFromFavorites(e);
    getFavorites();
}

function addProductToBasket(e) {
    addToBasket(e);
    document.location.href = "basket.html";
}
