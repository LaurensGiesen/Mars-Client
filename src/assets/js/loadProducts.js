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
    let ownerName = product["owner"].lastName;
    let date = product.date.dayOfMonth + "-" + product.date.monthValue + "-" + product.date.year;

    if (date === "undefined-undefined-undefined") {
        date = product.date;
    }

    if (ownerName === undefined) {
        ownerName = product.owner;
    }
    console.log(ownerName);
        document.querySelector('.articleContainer').innerHTML +=
            `<article id="${product.id}">
                 <a href="marketplaceDetails.html"><img alt="${product.name}" src="${product.image}" title="${product.name}"></a>
                 <div>
                     <h3><a href="marketplaceDetails.html">Name: <span class="name">${product.name}</span></a></h3>
                     <p>Price: <span class="price">${product.price}</span></p>
                     <p>From: <span class="owner">${ownerName}</span></p>
                     <p>Date product added: <span class="date">${date}</span></p>
                 </div>
                 <form>
                     <label for="amount">Amount: <span class="amount">${product.amount}</span></label>
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



