app.component('header-display', {
    template: `
    <nav>
        <ul>
            <li><a href="../../../map.html"><img src="#" alt="logo" title="logo"></a></li>
            <li><a href="../../../map.html">Map</a></li>
            <li><a href="../../../marketplace.html">Marketplace</a></li>
            <li><a href="../../../info.html">Info</a></li>
            <li><a href="../../../sharedTools.html">Shared Tools</a></li>
            <li id="profile">Profile
                <ul class="dropdown">
                    <li><a href="../../../profile.html">Account and Subscription</a></li>
                    <li><a href="../../../orderHistory.html">Order History</a></li>
                    <li><a href="../../../favorite.html">Favorite</a></li>
                    <li><a href="../../../login.html">Sign out</a></li>
                </ul>
            </li>
        </ul>
    </nav>
              `
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