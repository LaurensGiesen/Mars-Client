const DisplayHeader = {
    name: "display header",
    template:
        `
          <header>
          <nav>
            <ul>
              <li class="logoHeader"><a href="map.html"><img v-bind:src="logo" alt="logo" title="logo" class="logo"></a>
              </li>
              <li class="mapHeader tracking-in-expand"><a href="map.html">Map</a></li>
              <li class="tracking-in-expand"><a href="marketplace.html">Marketplace</a></li>
              <li class="tracking-in-expand"><a href="info.html">Info</a></li>
              <li class="tracking-in-expand"><a href="sharedTools.html">Shared Tools</a></li>
              <li class="profile"><img v-bind:src="account" title="account" alt="account">
                <ul class="dropdown swing-in-top-fwd">
                  <li class="account"><a href="profile.html">Account and Subscription</a></li>
                  <li><a href="myProducts.html">My Products</a></li>
                  <li><a href="orderHistory.html">Order History</a></li>
                  <li><a href="favorite.html">Favorite</a></li>
                  <li><a href="index.html">Sign out</a></li>
                </ul>
              </li>
              <li class="basketHeader">
                <a href="basket.html">
                  <figure>
                    <figcaption class="counter"></figcaption>
                    <img v-bind:src="whiteBasket" title="basket" alt="basket" class="basketHeaderImg">
                  </figure>
                </a>
              </li>
            </ul>
          </nav>
          </header>`
    ,
    data() {
        return {
            logo: "assets/img/logo.png",
            account: "assets/img/account.svg",
            whiteBasket: "assets/img/whiteBasket.svg",
        };
    }
};
