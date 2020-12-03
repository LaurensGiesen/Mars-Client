"use strict";
let array = products;
let searchField;
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
