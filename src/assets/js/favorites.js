"use strict"

document.addEventListener("DOMContentLoaded", init);

function init() {

    //fav.addEventListener("click", addToFavorites)
}

function addToFavorites(e){
    let type = "plant";
    if (document.location.pathname === "/client/src/marketplace.html"){
        type = "seed";
    }
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "ownerId": parseInt(e.target.parentNode.parentNode.parentNode.querySelector("p:nth-of-type(2)").attributes.getNamedItem("data-ownerid").value),
        "productType": type
    });
    apiCall("addProductToFavorite", "POST", data);
}