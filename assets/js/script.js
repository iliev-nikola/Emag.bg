// GENERAL FUNCTIONALITY
const main = (function () {
    // LOGIN & REGISTER
    if (!utils.getUsers()) {
        utils.setUsers([]);
    }

    if (localStorage.getItem('isLoggedIn') === null) {
        localStorage.setItem('isLoggedIn', false);
    }

    if (utils.getItem('guest') === null) {
        utils.setItem('guest', { favourites: [], cart: [] })
    }

    function registerUser(names, username, password, rePasword) {
        if (!names.trim().includes(' ')) {
            return utils.error('Моля, въведи име и фамилия.');
        }

        if (!username.trim()) {
            return utils.error('Моля, въведи потребителско име.');
        }

        if (username.trim().length < 4) {
            return utils.error('Потребителското име трябва да е поне 4 символа.');
        }

        const users = utils.getUsers();
        for (const user of users) {
            if (user.username === username) {
                return utils.error('Потребителското име вече е заето.');
            }
        }

        if (password.length < 5) {
            return utils.error('Паролата трябва да е поне 5 символа.');
        }

        if (password !== rePasword) {
            return utils.error('Паролите не съвпадат.');
        }

        const [firstName, lastName] = names.split(' ');
        users.push({
            username,
            password,
            firstName,
            lastName,
            isLoggedIn: false,
            favourites: [],
            cart: []
        });

        utils.setUsers(users);
        NAMES.value = '';
        REGISTER_USER.value = '';
        REGISTER_PASS.value = '';
        REGISTER_RE_PASS.value = '';
        utils.success('Успешна регистрация!');
        location.replace('#login');
    }

    function loginUser(username, password) {
        if (!username.trim()) {
            return utils.error('Невалидно потребителско име');
        }

        if (!password.trim()) {
            return utils.error('Невалидна парола');
        }

        const users = utils.getUsers();
        const hasUser = users.some(u => u.username === username.trim());
        if (!hasUser) {
            return utils.error('Невалидно потребителско име.');
        }

        const user = users.filter(u => u.username === username.trim())[0];
        const hasPassword = user.password === password.trim();
        if (!hasPassword) {
            return utils.error('Невалидна парола.');
        }

        utils.login(username.trim());
        onLoginSuccess(user.firstName, user.lastName, true);
    }

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

    // RENDERING
    function renderHeader() {
        let favourites, cart;
        if (utils.isLoggedIn()) {
            // IF LOGGED IN USER
            const currentUser = utils.getUsers().filter(user => user.isLoggedIn)[0];
            const firstLetter = currentUser.firstName[0].toUpperCase();
            const secondLetter = currentUser.lastName[0].toUpperCase();
            USER_PIC.innerHTML = `<p>${firstLetter + secondLetter}</p>`;
            USER_PIC.className = 'logged-user-icon';
            HELLO_MESSAGE.innerText = `Здравей, ${currentUser.firstName} ${currentUser.lastName}`;
            favourites = utils.getUsers().filter(user => user.isLoggedIn)[0].favourites;
            cart = utils.getUsers().filter(user => user.isLoggedIn)[0].cart;
        } else {
            // IF GUEST USER
            PROFILE_NAV.classList.remove('checked');
            GUEST_NAV.classList.add('checked');
            USER_PIC.innerHTML = `<i class="far fa-user">`;
            USER_PIC.className = 'guest-user-icon';
            favourites = utils.getItem('guest').favourites;
            cart = utils.getItem('guest').cart;
        }

        renderFavAndCart(favourites, cart);
    }

    // EVENT HANDLERS FOR CATEGORIES DROPDOWN MENU
    function onMainMouseOver() {
        MAIN_MENU.style.display = 'flex';
        CATEGORIES_LINK.className = 'categories-btn-open';
    }

    function onMainMouseOut() {
        MAIN_MENU.style.display = 'none';
        CATEGORIES_LINK.className = 'categories-btn-close';
    }

    function onCategoriesMouseOver() {
        MAIN_MENU.style.display = 'flex';
        CATEGORIES_LINK.className = 'categories-btn-open';
        MAIN_MENU.addEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.addEventListener('mouseout', onMainMouseOut);
    }

    // ROUTER
    const mainSections = [FOCUS_SECTION, MOBILE_SECTION, MOBILE_APP, TV_SECTION, TOP_SECTION, BIG_TECHNOLOGIES, BULLETIN];
    const idArr = ALL_FOCUS_ITEMS.map(el => el.id).concat(OTHER_CLIENTS_WATCHED.map(el => el.id));
    function onHashChange(e) {
        const hash = e.target.location.hash.substring(1);
        MAIN_MENU.className = 'select-categories content';
        CATEGORIES_LINK.className = 'categories-btn-open';
        CATEGORIES_LINK.removeEventListener('mouseover', onCategoriesMouseOver);
        MAIN_MENU.removeEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.removeEventListener('mouseout', onMainMouseOut);
        // change hash with correct article id
        const isCorrectId = idArr.some(el => el === +hash.split('/')[1]);
        if (isCorrectId && hash.includes('article/')) {
            const currentId = +hash.split('/')[1];
            const ALL_ITEMS = ALL_FOCUS_ITEMS.concat(OTHER_CLIENTS_WATCHED);
            const currentItem = ALL_ITEMS.filter(item => item.id === currentId)[0];
            watchedItem(focusSectionItems.watchedItems, currentItem);
            openItem(currentItem);
            MAIN_MENU.style.display = 'none';
            OPTIONS_PANEL.style.display = 'none';
            mainSections.map(section => section.style.display = 'none');
            CART_PAGE.style.display = 'none';
            FAVOURITES_PAGE.style.display = 'none';
            OPEN_ITEM.style.display = 'block'
            document.documentElement.scrollTop = 0;
            return;
        }

        switch (hash) {
            case '':
            case 'home':
                MAIN_SECTION.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
                document.body.style.backgroundColor = '#e9ebee';
                ERROR_PAGE.style.display = 'none';
                MAIN_MENU.style.display = 'flex';
                OPTIONS_PANEL.style.display = 'flex';
                OPEN_ITEM.style.display = 'none';
                mainSections.map(section => section.style.display = 'block');
                HOME_PAGE_MENU.style.display = 'block';
                CART_PAGE.style.display = 'none';
                FAVOURITES_PAGE.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'block';
                OTHER_CLIENTS_SECTION.style.display = 'block';
                break;
            case 'login':
                LOGIN_SECTION.style.display = 'block';
                LOGIN_PAGE.style.display = 'block';
                document.body.style.backgroundColor = '#f7f7f7';
                MAIN_SECTION.style.display = 'none';
                REGISTER_PAGE.style.display = 'none';
                CART_PAGE.style.display = 'none';
                FAVOURITES_PAGE.style.display = 'none';
                ERROR_PAGE.style.display = 'none';
                break;
            case 'register':
                LOGIN_SECTION.style.display = 'block';
                REGISTER_PAGE.style.display = 'block';
                LOGIN_PAGE.style.display = 'none';
                document.body.style.backgroundColor = '#f7f7f7';
                MAIN_SECTION.style.display = 'none';
                CART_PAGE.style.display = 'none';
                FAVOURITES_PAGE.style.display = 'none';
                ERROR_PAGE.style.display = 'none';
                break;
            case 'cart':
                LOGIN_SECTION.style.display = 'none';
                MAIN_SECTION.style.display = 'block';
                CART_PAGE.style.display = 'block';
                HOME_PAGE_MENU.style.display = 'none';
                MAIN_MENU.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                mainSections.map(section => section.style.display = 'none');
                FAVOURITES_PAGE.style.display = 'none';
                break;
            case 'favourites':
                MAIN_MENU.className = 'select-categories-dropdown content';
                CATEGORIES_LINK.className = 'categories-btn-close';
                CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
                LOGIN_SECTION.style.display = 'none';
                MAIN_SECTION.style.display = 'block';
                OPEN_ITEM.style.display = 'none';
                HOME_PAGE_MENU.style.display = 'block';
                FAVOURITES_PAGE.style.display = 'flex';
                MARKETPLACE_SECTION.style.display = 'none';
                OTHER_CLIENTS_SECTION.style.display = 'none';
                MAIN_MENU.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                mainSections.map(section => section.style.display = 'none');
                CART_PAGE.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'none';
                OTHER_CLIENTS_SECTION.style.display = 'none';
                break;
            default:
                MAIN_SECTION.style.display = 'none';
                LOGIN_SECTION.style.display = 'none';
                ERROR_PAGE.style.display = 'block';
                mainSections.map(section => section.style.display = 'none');
                MAIN_MENU.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                OPEN_ITEM.style.display = 'none';
                CART_PAGE.style.display = 'none';
                FAVOURITES_PAGE.style.display = 'none';
        }

        document.documentElement.scrollTop = 0;
    }

    // EVENT LISTENERS
    if (utils.isLoggedIn()) {
        let users = utils.getUsers();
        users = users.filter(user => user.isLoggedIn);
        const [firstName, lastName] = [users[0].firstName, users[0].lastName];
        onLoginSuccess(firstName, lastName);
    }

    window.addEventListener('hashchange', onHashChange);
    // window.addEventListener('DOMContentLoaded', () => {
    //     location.replace('#home');
    // });
    window.addEventListener('DOMContentLoaded', (e) => {
        onHashChange(e);
        renderHeader();
    });
    SEARCH_INPUT.addEventListener('focus', utils.onFocus);
    const searchBoxContent = Array.from(SEARCH_BOX_CONTENT.children);
    // TODO...
    searchBoxContent.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(e.target.innerText);
        })
    });
    ERROR_TEXT.addEventListener('click', () => {
        history.back();
    });
    REGISTER_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        registerUser(NAMES.value, REGISTER_USER.value, REGISTER_PASS.value, REGISTER_RE_PASS.value);
    });
    LOGIN_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        loginUser(LOGIN_USER.value, LOGIN_PASS.value);
    });
    LOGOUT_BTN.addEventListener('click', () => {
        utils.logout();
        renderHeader();
        location.reload();
        utils.success('Излязохте успешно!');
    });

    // ADD REMISE VOUCHER IN CART
    ADD_VOUCHER.addEventListener('click', (e) => {
        e.preventDefault();
        if (ADD_CODE.style.display === 'block') {
            ADD_CODE.style.display = 'none';
            VOUCHER_CONTAINER.style.paddingBottom = '0';
        } else {
            ADD_CODE.style.display = 'block';
            VOUCHER_CONTAINER.style.paddingBottom = '20px';
        }
    });

    // ON CLICK ON HEADER NAV ICONS
    FAVOURITE_ICON.addEventListener('click', () => {
        location.replace('#favourites');
    });
    SHOPPING_CART_ICON.addEventListener('click', () => {
        location.replace('#cart');
    });
    PROFILE_ICON.addEventListener('click', () => {
        location.replace('#login');
    });

    return {
        renderHeader
    }
})();