"use strict";
document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    document.querySelector('#addProduct').addEventListener('click', (e) => {
        let form = document.querySelector("#addProductForm");
        if (form.checkValidity()) {
            addProduct(e);
        }
    });
}

function addProduct(e) {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const date = document.querySelector('#date').value;
    const price = parseInt(document.querySelector('#price').value);
    const amount = parseInt(document.querySelector('#amount').value);
    const img = document.querySelector('#picture');
    const file = img.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        const newProduct = JSON.stringify({
            name: name,
            image: reader.result,
            price: price,
            ownerId: 1,
            date: date,
            amount: amount,
            type: "plant"
        });
        apiCall("addProduct", "POST", newProduct).then(() => document.location.href = "marketplace.html");
    };
    reader.readAsDataURL(file);
}
