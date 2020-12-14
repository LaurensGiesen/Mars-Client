document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    getFavorites();
}

function getFavorites(){
    const articleContainer = document.querySelector(".articleContainer");
    articleContainer.innerHTML = "";
    apiCall("getFavorites/1", "GET", null).then((response) => {
        response.forEach(item => {
            displayFavorites(item, articleContainer);
        });

    });
}

function displayFavorites(item, articleContainer){
        articleContainer.innerHTML += `<article id="${item.id}">
            <img src="${item.image}" alt="product image" title="product-image">
            <div>
                <h2>Name: <span>${item.name}</span></h2>
                <p>Price: <span>${item.price}</span></p>
                <p>Date: <span>${item.date["dayOfMonth"]}-${item.date["monthValue"]}-${item.date.year}</span></p>
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
}
