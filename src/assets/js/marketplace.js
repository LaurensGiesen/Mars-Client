"use strict";

document.addEventListener("DOMContentLoaded", init);
let allProducts = [];
let counter = 0;

async function init() {
    config = await loadConfig();
    loadPlants();
    searchProducts();
    loadSortValues();
    document.querySelector('#order').addEventListener('change', marketPlaceSorting);
    document.querySelector('#sortby').addEventListener('change', marketPlaceFilter);
    filterProducts();
    document.querySelector('#linkToAddProduct').addEventListener('click', goToAddProduct);
}
const articleContainer = document.querySelector('.articleContainer');
function loadPlants() {
    articleContainer.innerHTML = "";
    apiCall("getPlants", "GET", null).then((res) => {
        res.forEach(item => {
            addProductToList(item);
        });
        allProducts = getResOfPlants();
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
    const name = article.childNodes[3].childNodes[1].childNodes[1];
    const nameValue = name.innerHTML;
    const price = article.childNodes[3].childNodes[3].childNodes[1];
    const priceValue = price.innerHTML;
    const owner = article.childNodes[3].childNodes[5].childNodes[1];
    const ownerValue = owner.innerHTML;
    const date = article.childNodes[3].childNodes[7].childNodes[1];
    const dateValue = date.innerHTML;
    const amount = article.childNodes[5].childNodes[3];
    const amountValue = amount.value;
    const productDetail = {
        image: img.src,
        name: nameValue,
        price: priceValue,
        owner: ownerValue,
        date: dateValue,
        amount: amountValue,
        productId: id
    };
    const detailStorage = JSON.stringify(productDetail);
    localStorage.setItem('productDetail', detailStorage);
    document.location.href = 'marketplaceDetails.html';
    loadProductDetails();
}

function getProductDetailsByImg(product) {
    const article = product.parentNode;
    getProductDetail(product, article);
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
    let favoriteImage = e.target.src;
    if (favoriteImage.match("assets/img/emptyHeart.svg")) {
        addProductToFavorites(e);
    } else {
        removeFromFavorites(e);
    }
}

function searchProducts() {
    document.querySelector('#search').addEventListener("keyup", marketPlaceSorting);
}


function loadSortValues() {
    document.querySelector('#sortby').innerHTML =
        `<option value="name">Name</option>
         <option value="price">Price</option>
         <option value="date">Date</option>
         <option value="amount">Amount</option>
         `;
}


function filterProducts() {
    const filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            filter(checkbox);
        })
    });
}

function getClickEvents() {
    document.querySelectorAll(".emptyHeart").forEach(fav => fav.addEventListener("click", changeFavoriteState));
    document.querySelectorAll(".emptyBasket").forEach(basket => basket.addEventListener("click", changeBasketState));
    document.querySelectorAll('.articleContainer .productImg').forEach(product => product.addEventListener('click', () => getProductDetailsByImg(product)));
    document.querySelectorAll('.articleContainer h3').forEach(product => product.addEventListener('click', () => getProductDetailsByName(product)));
}

function filter(checkbox) {
    let products = [];
    articleContainer.innerHTML = "";
    if (checkbox.checked) {
        disableCheckboxes(checkbox);
        const checkedProduct = checkbox.labels[0].innerHTML;
        for (const product of allProducts) {
            const productName = product.name.toLowerCase();
            if (productName === checkedProduct.toLowerCase()) {
                products.push(product);
            }
        }
    } else {
        enableCheckboxes();
        loadPlants();
    }

    for (const product of products) {
        addProductToList(product);
    }
    getClickEvents();
}

function disableCheckboxes(checkedCheckbox) {
    const checkedCheckboxId = checkedCheckbox.attributes[2].value;
    const filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        const checkboxId = checkbox.attributes[2].value;
        if (checkboxId.localeCompare(checkedCheckboxId) !== 0) {
            checkbox.setAttribute("disabled", "");
        }
    })
}

function enableCheckboxes() {
    const filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        if (checkbox.getAttribute("disabled") !== null) {
            checkbox.removeAttribute("disabled");
        }
    })
}


function marketPlaceSorting() {
    const searchRes = [];
    for (const product of allProducts) {
        let name = product.name.toLowerCase();
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
            return 1
        } else if (a[selectedItem] < b[selectedItem]) {
            return -1
        }
        return 0;
    });
    marketPlaceSorting();
}

function goToAddProduct() {
    document.location.href = "addProductToSell.html";
}

function getResOfPlants() {
    const products = [];
    document.querySelectorAll('.articleContainer article').forEach(product => {
        const id = product.getAttribute('id');
        const name = product.querySelector(".name").innerHTML;
        const price = product.querySelector(".price").innerHTML;
        const owner = product.querySelector(".owner").innerHTML;
        const date = product.querySelector(".date").innerHTML;
        const amount = product.querySelector(".amount").innerHTML;
        const img = product.querySelector("img").getAttribute("src");
        products.push({productId: id, name: name, price: price, owner: owner, date: date, amount: amount, image: img});
    });
    return products;
}

function addToBasket(e) {
    e.target.parentNode.children["1"].innerHTML = "Remove from basket";
    e.target.src = "assets/img/shopping basket checkmark.svg";
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": "plant"
    });
    apiCall("addProductToBasket", "POST", data).then()
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