"use strict";

document.addEventListener("DOMContentLoaded", init);
let allProducts = [];
const articleContainerClass = '.articleContainer';

async function init() {
    config = await loadConfig();
    loadPlants();
    searchProducts();
    loadSortValues();
    loadFilterValues();
    document.querySelector('#order').addEventListener('change', marketPlaceSorting);
    document.querySelector('#sortby').addEventListener('change', marketPlaceFilter);
    document.querySelector('#linkToAddProduct').addEventListener('click', goToAddProduct);
}

function loadPlants() {
    const articleContainer = document.querySelector(articleContainerClass);
    articleContainer.innerHTML = "";
    apiCall("getPlants", "GET", null).then((res) => {
        allProducts = res;
        res.forEach(item => {
            addProductToList(item);
        });
        getClickEvents();
    });
}

function getProductDetailsByName(product) {
    const article = product.parentNode.parentNode;
    getProductDetail(product, article);
}

function getProductDetail(product, article) {
    const img = article.childNodes[1];
    const id = article.getAttribute("id");
    const name = article.childNodes[3].childNodes[1].childNodes[0];
    const nameValue = name.innerText;
    const total = article.childNodes[3].childNodes[7].childNodes[1];
    const totalValue = total.innerHTML;
    const price = article.childNodes[3].childNodes[3].childNodes[1];
    const priceValue = price.innerHTML;
    const date = article.childNodes[3].childNodes[5].childNodes[1];
    const dateValue = date.innerHTML;
    const amount = article.childNodes[5].childNodes[3];
    const amountValue = amount.value;
    const productDetail = {
        image: img.src,
        name: nameValue,
        amount: amountValue,
        price: priceValue,
        date: dateValue,
        total: totalValue,
        productId: id
    };
    const detailStorage = JSON.stringify(productDetail);
    localStorage.setItem('productDetail', detailStorage);
    window.location.href = 'marketplaceDetails.html';
    loadProductDetails();
}

function getProductDetailsByImg(product) {
    const article = product.parentNode;
    getProductDetail(product, article);
}

function searchProducts() {
    document.querySelector('#search').addEventListener("keyup", marketPlaceSorting);
}

function loadFilterValues() {
    apiCall("getCrops", "GET", null).then((res) => {
        res.forEach(item => {
            fillFilterValues(item);
        });
        filterProducts();
    });
}

function fillFilterValues(item) {
    if (item.type === "vegetable") {
        document.querySelector('.search:first-of-type').innerHTML +=
            `            <div>
            <input type="checkbox" name="${item.type}" id="${item.name}">
            <label for="${item.name}">${item.name}</label>
            </div>`;
    } else {
        document.querySelector('.search:last-of-type').innerHTML +=
            `<div>
            <input type="checkbox" name="${item.type}" id="${item.name}">
            <label for="${item.type}">${item.name}</label>
            </div>`;
    }
}

function loadSortValues() {
    document.querySelector('#sortby').innerHTML =
        `<option value="name">Name</option>
         <option value="price">Price</option>
         <option value="date">Date</option>
         <option value="amount">Total of products</option>
         `;
}

function filterProducts() {
    const filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        checkbox.addEventListener('change', filter);
    });
}

function getClickEvents() {
    document.querySelectorAll(".emptyHeart").forEach(fav => fav.addEventListener("click", changeFavoriteState));
    document.querySelectorAll(".emptyBasket").forEach(basket => basket.addEventListener("click", changeBasketState));
    document.querySelectorAll('.articleContainer .productImg').forEach(product => product.addEventListener('click', () => getProductDetailsByImg(product)));
    document.querySelectorAll('.articleContainer h3').forEach(product => product.addEventListener('click', () => getProductDetailsByName(product)));
}

function filter(e) {
    const articleContainer = document.querySelector(articleContainerClass);
    if (countCheckedBoxes() === 1) {
        articleContainer.innerHTML = "";
    }
    const checkbox = e.target;
    console.log(e);
    if (checkbox.checked) {
        for (const product of allProducts) {
            const productName = product.name.toLowerCase();
            if (productName === checkbox.attributes.id.value.toLowerCase()) {
                addProductToList(product);
            }
        }
    } else {
        loadPlants();
    }
    getClickEvents();
}

function countCheckedBoxes() {
    let checkedBoxes = 0;

    const filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        if (checkbox.checked) {
            checkedBoxes++;
        }
    });
    return checkedBoxes;
}

function marketPlaceSorting() {
    const articleContainer = document.querySelector(articleContainerClass);
    const searchRes = [];
    for (const product of allProducts) {
        const name = product.name.toLowerCase();
        if (name.includes(document.querySelector('#search').value.toLowerCase())) {
            searchRes.push(product);
        }
    }
    if (document.querySelector('#order').value === "desc") {
        searchRes.reverse();
    }
    articleContainer.innerHTML = "";
    for (const product of searchRes) {
        addProductToList(product);
    }
    getClickEvents();
}

function marketPlaceFilter(e) {
    let selectedItem;
    if (e === undefined) {
        selectedItem = "id";
    } else {
        selectedItem = e.target.value;
    }
    allProducts.sort(function (a, b) {
        if (a[selectedItem] > b[selectedItem]) {
            return 1;
        } else if (a[selectedItem] < b[selectedItem]) {
            return -1;
        }
        return 0;
    });
    marketPlaceSorting();
}

function goToAddProduct() {
    document.location.href = "addProductToSell.html";
}
