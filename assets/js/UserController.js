// GENERAL FUNCTIONALITY
(function () {
    // EVENT HANDLERS FOR CATEGORIES DROPDOWN MENU ONLY FOR FAVOURITES SECTION
    function onMainMouseOver() {
        MAIN_MENU.style.display = 'flex';
        HEADER_SANDWICH_BUTTON.className = 'fas fa-times';
        CATEGORIES_LINK.className = 'categories-btn-open';
    }

    function onMainMouseOut() {
        MAIN_MENU.className = 'select-categories-dropdown content';
        MAIN_MENU.style.display = 'none';
        HEADER_SANDWICH_BUTTON.className = 'fas fa-bars';
        CATEGORIES_LINK.className = 'categories-btn-close';
    }

    function onCategoriesMouseOut() {
        MAIN_MENU.style.display = 'none';
        CATEGORIES_LINK.className = 'categories-btn-close';
    }

    function onCategoriesMouseOver() {
        MAIN_MENU.style.display = 'flex';
        CATEGORIES_LINK.className = 'categories-btn-open';
        MAIN_MENU.addEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.addEventListener('mouseout', onMainMouseOut);
        CATEGORIES_LINK.addEventListener('mouseout', onCategoriesMouseOut);
        window.addEventListener('scroll', utils.hideMainWhenScroll);
    }

    // FUNCTION FOR COLLAPSING CATEGORIES ON CATEGORY PAGE
    (function categoryCollapse() {
        for (let i = 0; i < ALL_COLL.length; i++) {
            ALL_COLL[i].addEventListener("click", function () {
                const content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    FIRST_CHEVRON.className = 'fas fa-chevron-down';
                    SECOND_CHEVRON.className = 'fas fa-chevron-down';
                } else {
                    content.style.display = "block";
                    FIRST_CHEVRON.className = 'fas fa-chevron-up';
                    SECOND_CHEVRON.className = 'fas fa-chevron-up';
                }
            });
        }
    })();

    // DELETING ALL WATCHED ITEMS IN HISTORY SECTION WHEN BUTTON CLICK
    DELETE_WATCHED.addEventListener('click', () => {
        if (!userModel.isLoggedIn()) {
            const guest = this.getItem('guest');
            guest.watched = [];
            userModel.setItem('guest', guest);
        } else {
            const users = userModel.getUsers();
            users.forEach(user => {
                if (user.isLoggedIn) {
                    user.watched = [];
                    return;
                }
            });

            userModel.setUsers(users);
        }

        let counterLoader = 0;
        const intervalLoader = setInterval(() => {
            counterLoader++;
            WATCHED_CONTAINER.style.opacity = '0.3';
            ANIMATION_HISTORY.className = 'loader';
            if (counterLoader >= 3) {
                window.clearInterval(intervalLoader);
                ANIMATION_HISTORY.style.display = 'none';
                WATCHED_CONTAINER.style.display = 'none';
            }
        }, 800);
    });

    // ROUTER
    const mainSections = [FOCUS_SECTION, MOBILE_SECTION, MOBILE_APP, TV_SECTION, TOP_SECTION, BIG_TECHNOLOGIES, BULLETIN];
    const idArr = ALL_FOCUS_ITEMS.concat(OTHER_CLIENTS_WATCHED).map(el => el.id);
    function onHashChange(e) {
        const hash = e.target.location.hash.substring(1);
        MAIN_MENU.removeEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.removeEventListener('mouseout', onMainMouseOut);
        CATEGORIES_LINK.removeEventListener('mouseover', onCategoriesMouseOver);
        CATEGORIES_LINK.removeEventListener('mouseout', onCategoriesMouseOut);
        // change hash with correct article id
        utils.sandwichHeaderOff('home');
        NAV_BAR.style.display = 'block';
        WATCHED_CONTAINER.style.display = 'block';
        APP_EMAG.style.display = 'block';
        MARKETPLACE_SECTION.style.display = 'block';
        FOOTER.style.display = 'flex';
        CATEGORY_SECTION.style.display = 'none';
        const isCorrectId = idArr.some(el => el === +hash.split('/')[1]);
        if (isCorrectId && hash.includes('article/')) {
            const currentId = +hash.split('/')[1];
            const ALL_ITEMS = ALL_FOCUS_ITEMS.concat(OTHER_CLIENTS_WATCHED);
            const currentItem = ALL_ITEMS.filter(item => item.id === currentId)[0];
            watchedItem(userModel.getWatched(), currentItem);
            openItem(currentItem);
            utils.sandwichHeaderOff();
            CATEGORIES_LINK.className = 'categories-btn-close';
            CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
            HOME_PAGE_MENU.style.display = 'block';
            OPEN_ITEM.style.display = 'block'
            MARKETPLACE_SECTION.style.display = 'none';
            OTHER_CLIENTS_SECTION.style.display = 'none';
            MAIN_MENU.style.display = 'none';
            OPTIONS_PANEL.style.display = 'none';
            mainSections.map(section => section.style.display = 'none');
            CART_PAGE.style.display = 'none';
            FAVOURITES_PAGE.style.display = 'none';
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
                MAIN_SECTION.style.display = 'block';
                CART_PAGE.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
                OTHER_CLIENTS_SECTION.style.display = 'none';
                NAV_BAR.style.display = 'none';
                HOME_PAGE_MENU.style.display = 'block';
                WATCHED_CONTAINER.style.display = 'none';
                FOOTER.style.display = 'none';
                APP_EMAG.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'none';
                OPEN_ITEM.style.display = 'none';
                MAIN_MENU.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                mainSections.map(section => section.style.display = 'none');
                FAVOURITES_PAGE.style.display = 'none';
                break;
            case 'favourites':
                utils.sandwichHeaderOff();
                CATEGORIES_LINK.className = 'categories-btn-close';
                CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
                MAIN_SECTION.style.display = 'block';
                HOME_PAGE_MENU.style.display = 'block';
                FAVOURITES_PAGE.style.display = 'flex';
                MAIN_MENU.style.display = 'none';
                LOGIN_SECTION.style.display = 'none';
                OPEN_ITEM.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'none';
                OTHER_CLIENTS_SECTION.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                mainSections.map(section => section.style.display = 'none');
                CART_PAGE.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'none';
                OTHER_CLIENTS_SECTION.style.display = 'none';
                if (userModel.isLoggedIn()) {
                    FAV_LOGIN.style.display = 'none';
                    FAV_IS_LOGGIN.style.display = 'block';
                } else {
                    FAV_LOGIN.style.display = 'block';
                    FAV_IS_LOGGIN.style.display = 'none';
                }

                break;
            case 'categories':
                CATEGORY_SECTION.style.display = 'block';
                utils.sandwichHeaderOff();
                CATEGORIES_LINK.className = 'categories-btn-close';
                CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
                MAIN_SECTION.style.display = 'block';
                HOME_PAGE_MENU.style.display = 'block';
                OTHER_CLIENTS_SECTION.style.display = 'block';
                MOBILE_SECTION.style.display = 'block';
                MOBILE_APP.style.display = 'block';
                TV_SECTION.style.display = 'block';
                TOP_SECTION.style.display = 'block';
                BIG_TECHNOLOGIES.style.display = 'block';
                BULLETIN.style.display = 'block';
                FOCUS_SECTION.style.display = 'none';
                FAVOURITES_PAGE.style.display = 'none';
                MAIN_MENU.style.display = 'none';
                LOGIN_SECTION.style.display = 'none';
                OPEN_ITEM.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                CART_PAGE.style.display = 'none';
                MARKETPLACE_SECTION.style.display = 'none';
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
    // CHECK FOR LOGGED IN USER WHEN OPEN SITE FOR FIRST TIME
    if (userModel.isLoggedIn()) {
        let currentUser = userModel.getUsers();
        currentUser = currentUser.find(user => user.isLoggedIn);
        const [firstName, lastName] = [currentUser.firstName, currentUser.lastName];
        onLoginSuccess(firstName, lastName);
    }

    MAIN_MENU.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName !== 'DIV') {
            location.replace('#categories');
            document.documentElement.scrollTop = 0;
        }
    });

    SEARCH_INPUT.addEventListener('focus', utils.onFocus);
    ERROR_TEXT.addEventListener('click', () => {
        history.back();
    });

    // LOGIN & REGISTER
    REGISTER_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        userModel.registerUser(NAMES.value, REGISTER_USER.value, REGISTER_PASS.value, REGISTER_RE_PASS.value);
    });
    LOGIN_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        userModel.loginUser(LOGIN_USER.value, LOGIN_PASS.value);
    });
    LOGOUT_BTN.addEventListener('click', () => {
        userModel.logoutUser();
        location.reload()
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
    SHOPPING_CART_ICON.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        location.replace('#cart');
    });

    // MAIN
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('DOMContentLoaded', (e) => {
        onHashChange(e);
        renderHeader();
    });
    window.addEventListener('scroll', utils.onScroll);
})();