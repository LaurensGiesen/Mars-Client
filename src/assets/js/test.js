"use strict";

const searchBar = document.querySelector('#search')
document.addEventListener('DOMContentLoaded', init)


function init() {
    if (searchBar !== null) {
        searchBar.addEventListener('keyup', search)
    }
    if (searchBar !== null) {
        searchBar.addEventListener('click', resetSearch)
    }
}

function search(e) {
    let searchString = e.target.value.toLowerCase();

    let states = document.getElementById("stateList").getElementsByTagName("li");
    [...states].forEach(state => {
        //TODO explanation of spread operator
        if (state.innerText.toLowerCase() === searchString.toLowerCase()) {
            console.log(state.innerText)
        }
    })
}

function resetSearch() {
    console.log('reset');

}