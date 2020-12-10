"use strict";

// function loadProducts() {
//     document.querySelector('.articleContainer').innerHTML = "";
//     loadProductsToList();
// }
//
//
//
// function loadProductsToList() {
// let length = products.length;
// for (let i= 0; i < length; i++) {
// document.querySelector('.articleContainer').innerHTML +=
//             `<article id="${products[i].id}">
//                  <a href="marketplaceDetails.html"><img alt="${products[i].name}" src="${products[i].img}" title="${products[i].name}"></a>
//                  <div>
//                      <h3><a href="marketplaceDetails.html">Name: ${products[i].name}</a></h3>
//                      <p>Price: ${products[i].price}</p>
//                      <p>From: ${products[i].from}</p>
//                      <p>Date product added: ${products[i].date}</p>
//                  </div>
//                  <form>
//                      <label for="amount">Amount: ${products[i].amount}</label>
//                      <input class="amount" min="1" step="1" type="number" value="1">
//
//                      <figure>
//                          <img src="assets/img/basketPlus.svg" title="add to basket" alt="add to basket"
//                               class="emptybasket"/>
//                          <figcaption>Add to basket</figcaption>
//                      </figure>
//
//                      <figure class="heart">
//                          <img src="assets/img/emptyHeart.svg" title="add to favorite" alt="add to favorite"
//                               class="emptyheart"/>
//                          <figcaption>Add to favorite</figcaption>
//                      </figure>
//                  </form>
//              </article>`
//
// }
// }

function addProductToList(product) {
        document.querySelector('.articleContainer').innerHTML +=
            `<article id="${product.id}">
                 <a href="marketplaceDetails.html"><img alt="${product.name}" src="${product.img}" title="${product.name}"></a>
                 <div>
                     <h3><a href="marketplaceDetails.html">Name: ${product.name}</a></h3>
                     <p>Price: ${product.price}</p>
                     <p>From: ${product["owner"].lastName}</p>
                     <p>Date product added: ${product.date.dayOfMonth}-${product.date.monthValue}-${product.date.year}</p>
                 </div>
                 <form>
                     <label for="amount">Amount: ${product.amount}</label>
                     <input class="amount" min="1" step="1" type="number" value="1">

                     <figure>
                         <img src="assets/img/basketPlus.svg" title="add to basket" alt="add to basket"
                              class="emptybasket"/>
                         <figcaption>Add to basket</figcaption>
                     </figure>

                     <figure class="heart">
                         <img src="assets/img/emptyHeart.svg" title="add to favorite" alt="add to favorite"
                              class="emptyheart"/>
                         <figcaption>Add to favorite</figcaption>
                     </figure>
                 </form>
             </article>`
    }



