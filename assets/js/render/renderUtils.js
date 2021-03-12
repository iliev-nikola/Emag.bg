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
        PROFILE_ICON.removeEventListener('click', utils.goToLoginPage);
        const currentUser = userModel.getUsers().find(user => user.isLoggedIn);
        const firstLetter = currentUser.firstName[0].toUpperCase();
        const secondLetter = currentUser.lastName[0].toUpperCase();
        USER_PIC.innerHTML = `<p>${firstLetter + secondLetter}</p>`;
        FAV_PIC.innerText = firstLetter + secondLetter;
        USER_PIC.className = 'logged-user-icon';
        HELLO_MESSAGE.innerText = `Здравей, ${currentUser.firstName} ${currentUser.lastName}`;
        favourites = currentUser.favourites;
        cart = currentUser.cart;
    } else {
        // IF GUEST USER
        PROFILE_ICON.addEventListener('click', utils.goToLoginPage);
        PROFILE_NAV.classList.remove('checked');
        GUEST_NAV.classList.add('checked');
        USER_PIC.innerHTML = `<i class="far fa-user">`;
        USER_PIC.className = 'guest-user-icon';
        favourites = userModel.getItem('guest').favourites;
        cart = userModel.getItem('guest').cart;
    }

    renderFavAndCart(favourites, cart);
    openFavAndCart(favourites, cart);
}

// CREATING RADIO BUTTONS
function createDots(array, container) {
    for (let i = 0; i < array.length / 6; i++) {
        const dot = utils.createNewElement('input');
        dot.type = 'radio';
        if (container.id === 'dots-container') {
            dot.name = 'dots-container';
            dot.className = 'dots';
        } else {
            dot.name = 'other-dots-container';
            dot.className = 'other-dots';
        }

        dot.value = i + 1;
        container.append(dot);
        if (i === 0) {
            dot.checked = true;
        }
    }
}

createDots(ALL_FOCUS_ITEMS, DOTS_CONTAINER);
createDots(OTHER_CLIENTS_WATCHED, DOTS_CONTAINER_OTHER);