function addToFavorites(e){
    let type = "plant";
    if (document.location.pathname === "/client/src/marketplace.html"){
        type = "seed";
    }
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": type
    });
    apiCall("addProductToFavorite", "POST", data);
}