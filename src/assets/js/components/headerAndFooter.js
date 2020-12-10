/*Voor de images vertrekt vue sowieso vanuit 'src', geen relatieve paden (al dan niet met hulp van intellij gebruiken).
Het is mogelijk dat dit ook het geval is voor links*/
app.component('header-display', {
    template: `
      <nav>
      <ul>
        <li class="logoHeader"><a href=" ../../../map.html"><img v-bind:src="logo" alt="logo" title="logo" class="logo"></a>
        </li>
        <li class="mapHeader"><a href="../../../map.html">Map</a></li>
        <li><a href="../../../marketplace.html">Marketplace</a></li>
        <li><a href="../../../info.html">Info</a></li>
        <li><a href="../../../sharedTools.html">Shared Tools</a></li>
        <li class="profile"><img v-bind:src="account" title="account" alt="account">
          <ul class="dropdown">
            <li class="account"><a href="../../../profile.html">Account and Subscription</a></li>
            <li><a href="../../../orderHistory.html">Order History</a></li>
            <li><a href="../../../favorite.html">Favorite</a></li>
            <li><a href="../../../login.html">Sign out</a></li>
          </ul>
        </li>
        <li><a href=" ../../../basket.html"><img v-bind:src="whiteBasket" title="basket" alt="basket"
                                                 class="headerBasket"></a></li>
      </ul>
      </nav>
    `,
    data() {
        return {
            logo: "assets/img/logo.png",
            account: "assets/img/account.svg",
            whiteBasket: "assets/img/whiteBasket.svg",
        }
    }
})

app.component('footer-display', {
    template:
        `
        <div>
            <h3>Contact us</h3>
                <p>mars@mars.mars</p>
                <p>MARS inc. Olympus Mons 18.4N, 134W Mars</p>

        </div>
        <div>
            <p>&copy; Mars Agricultural and Research Services – Sitemap – Privacy Policy</p>
            <img src="../../../assets/img/login.jpg" alt="#">
            <img src="../../../assets/img/login.jpg" alt="#">
            <img src="../../../assets/img/login.jpg" alt="#">
        </div>
        <p><a href="../../../subscriptions.html">View the subscription types</a></p>
        `
})