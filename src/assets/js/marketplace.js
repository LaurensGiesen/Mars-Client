"use strict";

let searchField;
let filterBox;

function searchProducts() {
    searchField = document.querySelector('#search');
    searchField.addEventListener("keyup", searchList);
}

function searchList() {
    let searchString = searchField.value;
    let length = products.length;

    document.querySelector('.articleContainer').innerHTML = "";
    for (let i = 0; i < length; i++) {
        let txtValue = products[i].name.toLowerCase();
        if (txtValue.includes(searchString)) {
            addProductToList(products[i]);
        }
    }
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
    log(checkbox);
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
            log(checkbox);
            checkbox.setAttribute("disabled", "");
        }
    })
}

function enableCheckboxes() {
    filterBox = document.querySelectorAll('.filter input[type=checkbox]');
    filterBox.forEach(checkbox => {
        if (checkbox.getAttribute("disabled") !== null) {
            log(checkbox);
            checkbox.removeAttribute("disabled");
        }
    })
}


