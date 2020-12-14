"use strict";

function addProductToList(product) {
    let ownerName = product["owner"]["lastName"];
    let date = product.date["dayOfMonth"] + "-" + product.date["monthValue"] + "-" + product.date.year;

    if (date === "undefined-undefined-undefined") {
        date = product.date;
    }

    if (ownerName === undefined) {
        ownerName = product.owner;
    }
        document.querySelector('.articleContainer').innerHTML +=
            `<article id="${product.productId}">
                 <a href="marketplaceDetails.html"><img alt="${product.name}" src="${product.image}" title="${product.name}"></a>
                 <div>
                     <h3><a href="marketplaceDetails.html">Name: <span class="name">${product.name}</span></a></h3>
                     <p>Price: <span class="price">${product.price}</span></p>
                     <p data-ownerId="${product.owner.id}">From: <span class="owner">${ownerName}</span></p>
                     <p>Date product added: <span class="date">${date}</span></p>
                 </div>
                 <form>
                     <label for="amount">Amount: <span class="amount">${product.amount}</span></label>
                     <input class="amount" min="1" step="1" type="number" value="1">

                     <figure class="basket">
                         <img src="assets/img/basketPlus.svg" title="add to basket" alt="add to basket"
                              class="emptyBasket"/>
                         <figcaption>Add to basket</figcaption>
                     </figure>

                     <figure class="heart">
                         <img src="assets/img/emptyHeart.svg" title="add to favorite" alt="add to favorite"
                              class="emptyHeart"/>
                         <figcaption>Add to favorite</figcaption>
                     </figure>
                 </form>
             </article>`
    }



