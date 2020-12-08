"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector('#addProduct').addEventListener('click', addProduct);
}

function addProduct(e) {
    e.preventDefault();
    let owner = document.querySelector('#owner').value;
    let name = document.querySelector('#name').value;
    let date = document.querySelector('#date').value;
    let price = document.querySelector('#price').value;
    let amount = document.querySelector('#amount').value;
    let img = document.querySelector('#picture').value;

    let newId = products.length + 1;


    let newProduct= JSON.stringify( {
        id: newId,
        name: name,
        img: img,
        price: price,
        from: owner,
        date: date,
        amount: amount
    });
    console.log(newProduct);
}
