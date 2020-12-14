"use strict";
document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    addDateInForm();
    document.querySelector('#addProduct').addEventListener('click', addProduct);
}

function addDateInForm() {
    document.querySelector('div').innerHTML += `<label for="owner">Please enter your name:</label>
        <input type="text" id="owner" name="name" placeholder="Owner" required>

        <label for="name">Name product:</label>
        <input type="text" id="name" name="name" placeholder="Apple" required>

        <label for="date">Date of the day:</label>
        <input type="text" id="date" name="date" pattern="\\d{2}-\\d{2}-\\d{4}"
placeholder="01-01-2000"  required>
        
        <label for="price">Price:</label>
        <input type="number" id="price" required min="1" value="1" step="1">

        <label for="amount">Amount:</label>
        <input type="number" id="amount" required min="1" value="1" step="1">

        <label for="picture">Picture:</label>
        <input type="file" id="picture" required>

        <input id="addProduct" type="submit" value="Add">`;
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
