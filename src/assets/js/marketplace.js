"use strict";
let searchField;
let filterBox;
let products = [];
let allProducts = [];

function searchProducts() {
    searchField = document.querySelector('#search');
    searchField.addEventListener("keyup", searchList);
}

function searchList() {
    products = [];
    let searchString = searchField.value;

    document.querySelector('.articleContainer').innerHTML = "";
    for (let product of allProducts) {
        let txtValue = product.name.toLowerCase();

        if (txtValue.includes(searchString)) {
            products.push(product);
        }
    }
    marketPlaceSorting();
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
    filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            filter(checkbox);
        })
    });
}

function filter(checkbox) {
    products = [];
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
    filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        let checkboxId = checkbox.attributes[2].value;
        if (checkboxId.localeCompare(checkedCheckboxId) !== 0) {
            checkbox.setAttribute("disabled", "");
        }
    })
}

function enableCheckboxes() {
    filterBox = document.querySelectorAll('.filter input[type=checkbox]');
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
    let sortedProducts = allProducts;
    products = sortedProducts;
    sortedProducts.sort(function (a, b) {
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

function loadPlants() {
    document.querySelector('.articleContainer').innerHTML = "";
    api = `${config.host ? config.host + '/' : ''}`;
    apiCall("getPlants", "GET", null).then((res) => {
        res.forEach(item => {
            addProductToList(item);
        });
        allProducts = getResOfPlants();
    });
}

function getResOfPlants() {
    products = [];
    document.querySelectorAll('.articleContainer article').forEach(product => {
        let name = product.querySelector(".name").innerHTML;
        let price = product.querySelector(".price").innerHTML;
        let owner = product.querySelector(".owner").innerHTML;
        let date = product.querySelector(".date").innerHTML;
        let amount = product.querySelector(".amount").innerHTML;
        //let img = product.querySelector("img").getAttribute("src");

        products.push({name: name, price: price, owner: owner, date: date, amount: amount, img: null});
    });
    return products;
}
