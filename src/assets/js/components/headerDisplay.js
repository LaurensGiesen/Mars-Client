header.component('header-display', {
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