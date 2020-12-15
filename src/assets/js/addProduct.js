"use strict";
document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    document.querySelector('#addProduct').addEventListener('click', addProduct);
}

function addProduct(e) {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let date = document.querySelector('#date').value;
    let price = parseInt(document.querySelector('#price').value);
    let amount = parseInt(document.querySelector('#amount').value);
    let img = document.querySelector('#picture');
    let file = img.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        let newProduct = JSON.stringify({
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
