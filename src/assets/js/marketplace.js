"use strict";
let array = products;
let searchField;
let filterBox;

function searchProducts() {
    searchField = document.querySelector('#search');
    searchField.addEventListener("keyup", searchList);
}

function searchList() {
    array = [];
   let searchString = searchField.value;
   let length = products.length;

   document.querySelector('.articleContainer').innerHTML = "";
   for (let i = 0; i < length; i++) {
    let txtValue = products[i].name.toLowerCase();
    if (txtValue.includes(searchString)) {
        array.push(products[i]);
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
    document.querySelector('.articleContainer').innerHTML = "";
    if (checkbox.checked) {
        disableCheckboxes(checkbox);
        let checkedProduct = checkbox.labels[0].innerHTML;

        for (let product of products) {
            let productName = product.name.toLowerCase();
            if (productName === checkedProduct.toLowerCase()) {
                addProductToList(product);
            }
        }
    } else {
        enableCheckboxes();
        for (let product of products) {
            addProductToList(product);
        }
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
    for (let product of array) {
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
    if (e === undefined){
        selectedItem = "id";
    }else {
        selectedItem = e.target.value;
    }
    let sortedProducts = products;
    array = sortedProducts;
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