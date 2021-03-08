// render functions must be before UserModel

// UserController must make connection bettwen UserModel and rendering -> event listeners, inputs etc...

function onLoginSuccess(firstName, lastName, isLogin) {
    LOGIN_USER.value = '';
    LOGIN_PASS.value = '';
    if (isLogin) {
        utils.success(`Добре дошъл, ${firstName} ${lastName}!`);
    }

    renderHeader();
    PROFILE_NAV.classList.add('checked');
    GUEST_NAV.classList.remove('checked');
    location.replace('#home');
    document.documentElement.scrollTop = 0;
}

function renderHeader() {
    let favourites, cart;
    if (userModel.isLoggedIn()) {
        // IF LOGGED IN USER
        PROFILE_ICON.removeEventListener('click', goToLoginPage);
        const currentUser = utils.getUsers().find(user => user.isLoggedIn);
        const firstLetter = currentUser.firstName[0].toUpperCase();
        const secondLetter = currentUser.lastName[0].toUpperCase();
        USER_PIC.innerHTML = `<p>${firstLetter + secondLetter}</p>`;
        USER_PIC.className = 'logged-user-icon';
        HELLO_MESSAGE.innerText = `Здравей, ${currentUser.firstName} ${currentUser.lastName}`;
        favourites = currentUser.favourites;
        cart = currentUser.cart;
    } else {
        // IF GUEST USER
        PROFILE_ICON.addEventListener('click', goToLoginPage);
        PROFILE_NAV.classList.remove('checked');
        GUEST_NAV.classList.add('checked');
        USER_PIC.innerHTML = `<i class="far fa-user">`;
        USER_PIC.className = 'guest-user-icon';
        favourites = utils.getItem('guest').favourites;
        cart = utils.getItem('guest').cart;
    }

    renderFavAndCart(favourites, cart);
    openFavAndCart(favourites, cart);
}