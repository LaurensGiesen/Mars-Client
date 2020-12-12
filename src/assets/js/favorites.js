function addToFavorites(e){
    let type = "plant";
    if (document.location.pathname === "/client/src/map.html"){
        type = "seed";
    }
    const data = JSON.stringify({
        "productId": parseInt(e.target.parentNode.parentNode.parentNode.id),
        "userId": 1, //NYI
        "productType": type
    });
    apiCall("addProductToFavorite", "POST", data);
}

function getFavorites(){
    apiCall("getFavorites/1", "GET", null).then((response) => {
        displayFavorites(response);
    })
}

function displayFavorites(response){
    const articleContainer = document.querySelector(".articleContainer");
    articleContainer.innerHTML = "";
    response.forEach(item => {
        articleContainer.innerHTML += `<article id="${item.id}">
            <img src="${item.image}" alt="product image" title="product-image">
            <div>
                <h2>Name: <span>${item.name}</span></h2>
                <p>Price: <span>${item.price}</span></p>
                <p>Date: <span>${item.date.dayOfMonth}-${item.date.monthValue}-${item.date.year}</span></p>
            </div>
            <div>
                <label for="amount">Amount: ${item.amount}</label>
                <input id="amount" min="1" type="number" value="1">
                <figure>
                    <img src="assets/img/shopping%20basket.svg" title="favorite button" alt="favorite button">
                    <figcaption>Add To Basket</figcaption>
                </figure>
                <figure>
                    <img alt="heart" src="assets/img/fullHeart.png" title="heart" class="heart">
                    <figcaption>Remove From Favorites</figcaption>
                </figure>
            </div>
        </article>`
    })
}