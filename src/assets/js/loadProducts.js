"use strict";

function addProductToList(product) {
    let date = product.date["dayOfMonth"] + "-" + product.date["monthValue"] + "-" + product.date.year;

    if (date === "undefined-undefined-undefined") {
        date = product.date;
    }
        document.querySelector('.articleContainer').innerHTML +=
            `<article id="${product.productId}">
               <img alt="${product.name}" src="${product.image}" title="${product.name}" class="productImg">
                 <div>
                     <h3><span class="name">${product.name}</span></h3>
                     <p>Price: <span class="price">${product.price}</span></p>
                     <p>Date product added: <span class="date">${date}</span></p>
                     <p>Amount of products left: <span class="amount">${product.amount}</span></p>
                 </div>
                 <form>
                     <label for="amount">Amount:</label>
                     <input min="1" step="1" type="number" value="1" max="${product.amount}">

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
             </article>`;
}
