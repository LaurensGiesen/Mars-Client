"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    addDateInForm();
    document.querySelector('#addProduct').addEventListener('click', addProduct);
}

function addDateInForm() {
    document.querySelector('div').innerHTML += `<label for="owner">Please enter your name:</label>
        <input type="text" id="owner" name="name" placeholder="Owner" required>

        <label for="name">Name product:</label>
        <input type="text" id="name" name="name" placeholder="Apple" required>

        <label for="date">Date of the day:</label>
        <input type="date" id="date" name="date" min="2020-12-08" required>
        
        <label for="price">Price:</label>
        <input type="number" id="price" required min="1" value="1" step="1">

        <label for="amount">Amount:</label>
        <input type="number" id="amount" required min="1" value="1" step="1">

        <label for="picture">Picture:</label>
        <input type="file" id="picture" required>

        <input id="addProduct" type="submit" value="Add">`
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
