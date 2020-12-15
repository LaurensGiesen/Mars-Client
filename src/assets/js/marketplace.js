"use strict";

document.addEventListener("DOMContentLoaded", init);
let allProducts = [];


async function init(){
    config = await loadConfig();
    loadPlants();
    searchProducts();
    loadSortValues();
    document.querySelector('#order').addEventListener('change', marketPlaceSorting);
    document.querySelector('#sortby').addEventListener('change', marketPlaceFilter);
    filterProducts();
    document.querySelector('#linkToAddProduct').addEventListener('click', goToAddProduct);
}

function loadPlants() {
    document.querySelector('.articleContainer').innerHTML = "";
    apiCall("getPlants", "GET", null).then((res) => {
        res.forEach(item => {
            addProductToList(item);
        });
        allProducts = getResOfPlants();
        document.querySelectorAll(".emptyheart")
            .forEach(fav => fav.addEventListener("click", addToFavorites));
        document.querySelectorAll('.articleContainer .img').forEach(product => product.addEventListener('click', getProductDetails))
        document.querySelectorAll('.articleContainer h3').forEach(product => product.addEventListener('click', () => getProductDetails( product)));
    });
}

function getProductDetails(product) {
    let article = product.parentNode.parentNode;
    console.log(article.childNodes[2]);
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
    let filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            filter(checkbox);
        })
    });
}

function filter(checkbox) {
    let products = [];
    document.querySelector('.articleContainer').innerHTML = "";
    if (checkbox.checked) {
        disableCheckboxes(checkbox);
        let checkedProduct = checkbox.labels[0].innerHTML;

        for (let product of allProducts) {
            let productName = product.name.toLowerCase();
            if (productName === checkedProduct.toLowerCase()) {
                products.push(product);
            }
        }
    } else {
        enableCheckboxes();
        loadPlants();
    }

    for (let product of products) {
        addProductToList(product);
    }
}

function disableCheckboxes(checkedCheckbox) {
    let checkedCheckboxId = checkedCheckbox.attributes[2].value;
    let filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        let checkboxId = checkbox.attributes[2].value;
        if (checkboxId.localeCompare(checkedCheckboxId) !== 0) {
            checkbox.setAttribute("disabled", "");
        }
    })
}

function enableCheckboxes() {
    let filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        if (checkbox.getAttribute("disabled") !== null) {
            checkbox.removeAttribute("disabled");
        }
    })
}


function marketPlaceSorting() {
    let searchRes = [];
    for (let product of allProducts) {
        let name = product.name.toLowerCase();
        if (name.includes(document.querySelector('#search').value.toLowerCase())) {
            searchRes.push(product);
        }
    }
    if (document.querySelector('#order').value === "desc") {
        searchRes.reverse();
    }
    document.querySelector('.articleContainer').innerHTML = "";
    for (let product of searchRes) {
        addProductToList(product);
    }
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
    let products = [];
    document.querySelectorAll('.articleContainer article').forEach(product => {
        let name = product.querySelector(".name").innerHTML;
        let price = product.querySelector(".price").innerHTML;
        let owner = product.querySelector(".owner").innerHTML;
        let date = product.querySelector(".date").innerHTML;
        let amount = product.querySelector(".amount").innerHTML;
        let img = product.querySelector("img").getAttribute("src");
        //console.log(img);
        products.push({name: name, price: price, owner: owner, date: date, amount: amount, image: img});
    });
    return products;
}

function addToFavorites(e){
    e.target.src = "assets/img/fullHeart.png";
    let type = "plant";
    if (document.location.pathname === "/client/src/map.html"){
        type = "seed";
    }
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": type
    });
    apiCall("addProductToFavorite", "POST", data).then();
}