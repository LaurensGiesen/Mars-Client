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
               <img alt="${product.name}" src="${product.image}" title="${product.name}" class="productImg">
                 <div>
                     <h3>${product.name}</span></h3>
                     <p>Price: <span class="price">${product.price}</span></p>
                     <p>Date product added: <span class="date">${date}</span></p>
                     <p>Amount of products left: <span>${product.amount}</span></p>
                 </div>
                 <form>
                     <label for="amount" class="amount">Amount:</label>
                     <input min="1" step="1" type="number" value="1">

                     <figure class="basket">
                         <img src="assets/img/basketPlus.svg" title="add to basket" alt="add to basket"
                              class="emptyBasket"/>
                         <figcaption class="basket">Add to basket</figcaption>
                     </figure>

                     <figure class="heart">
                         <img src="assets/img/emptyHeart.svg" title="add to favorite" alt="add to favorite"
                              class="emptyHeart"/>
                         <figcaption>Add to favorite</figcaption>
                     </figure>
                 </form>
             </article>`
    }



