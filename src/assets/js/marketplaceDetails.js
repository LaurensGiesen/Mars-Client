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
    const jsonProductDetails = localStorage.getItem('productDetail');
    const parseProductDetails = JSON.parse(jsonProductDetails);
    document.querySelector('#productDetail').innerHTML +=
        `<article id="${parseProductDetails.productId}">
            <img class="productImg" id="${parseProductDetails.name}" alt="${parseProductDetails.name}" src="${parseProductDetails.image}"/>
       <div>
            <h3>${parseProductDetails.name}</h3>
            <p>Price: ${parseProductDetails.price}</p>
            <p>Date product added: ${parseProductDetails.date}</p>
            <p>Amount of products left: <span class="amount">${parseProductDetails.total}</span></p>
            <p>Description: Lorem ipsum</p>
        </div>

        <div id="choice">
            <label for="number" class="amount">Amount:</label>
            <input id="number" min="1" value="${parseProductDetails.amount}" type="number" max="${parseProductDetails.amount}">
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



