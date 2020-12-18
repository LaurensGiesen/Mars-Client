"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    loadOrdervalues();
    loadSortValues();
}

function loadOrdervalues() {
    document.querySelector('#order').innerHTML =
        ` <option value="asc">Ascending</option>
                <option value="desc">Descending</option>`
}

function loadSortValues() {
    document.querySelector('#sortby').innerHTML =
        `<option value="name">Name</option>
         <option value="price">Price</option>
         <option value="date">Date</option>
         <option value="amount">Total of products</option>`
}