"use strict";

let searchField;
function searchProducts() {
searchField = document.querySelector('#search');
searchField.addEventListener("keyup", searchList);
}

function searchList() {
   let searchString = searchField.value;
   let length = products.length;

   document.querySelector('.articleContainer').innerHTML = "";
   for (let i = 0; i < length; i++) {
    let txtValue = products[i].name.toLowerCase();
    if (txtValue.includes(searchString)) {
        addProductToList( products[i] );
     }
   }
}


