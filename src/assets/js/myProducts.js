"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    loadOwnAddedProducts();

}

function loadOwnAddedProducts() {
    apiCall('getPlants', 'GET', null).then((res) => {
        if (res.length === 0) {
            showEmptyPage();
        } else {
            res.forEach(product => {
                addProductToOwnList(product);
            });
            document.querySelectorAll(".bin").forEach(bin => {
                bin.addEventListener("click", removeProductFromOwnList);
            });
        }
    })
}

function removeProductFromOwnList(product) {
    clearList();
    const data = JSON.stringify({
        "productId": parseInt(product.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant"
    });
    apiCall("removeProduct", "POST", data).then(loadOwnAddedProducts);
}

function clearList() {
    document.querySelector(".myProducts").innerHTML = "";

}

function showEmptyPage() {
    document.querySelector('.emptyMyProducts').innerHTML = `<h2>you have not yet added your own products</h2>`
}

function addProductToOwnList(product) {
    const date = product.date["dayOfMonth"] + "-" + product.date["monthValue"] + "-" + product.date.year;

    document.querySelector('.myProducts').innerHTML +=
        `<article id="${product.productId}">
            <img src="${product.image}" alt="${product.name}" title="${product.name}" class="productImg">
            <div>
                <h2>${product.name}</h2>
                <p data-ownerId="${product.owner.id}">From: <span class="owner">${product.owner.lastName}</span></p>
                <p>Date product added: <span class="date">${date}</span></p>
                <h2 class="price">€ <span>${product.price}</span></h2>
            </div>
            <form>
                <figure>
                    <img src="assets/img/bin.png" alt="trash bin" title="trash bin" class="bin"/>
                    <figcaption>Remove Product</figcaption>
                </figure>
            </form>
        </article>`
}

