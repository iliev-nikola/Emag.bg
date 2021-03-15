// GENERAL FUNCTIONALITY
(function () {
    // EVENT HANDLERS FOR CATEGORIES DROPDOWN MENU ONLY FOR FAVOURITES SECTION
    function onMainMouseOver() {
        MAIN_MENU.style.display = 'flex';
        HEADER_SANDWICH_BUTTON.className = 'fas fa-times';
        CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-open';
    }

    function onMainMouseOut() {
        MAIN_MENU.className = 'hidden display-flex select-categories-dropdown content';
        MAIN_MENU.style.display = 'none';
        HEADER_SANDWICH_BUTTON.className = 'fas fa-bars';
        CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-close';
    }

    function onCategoriesMouseOut() {
        MAIN_MENU.style.display = 'none';
        CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-close';
    }

    function onCategoriesMouseOver() {
        MAIN_MENU.style.display = 'flex';
        CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-open';
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
                let currentChevron = ALL_COLL[i].lastElementChild;
                if (content.style.display === "none") {
                    content.style.display = "block";
                    currentChevron.className = 'fas fa-chevron-up';
                } else {
                    content.style.display = "none";
                    currentChevron.className = 'fas fa-chevron-down';
                }
            });
        }
    })();

    // DELETING ALL WATCHED ITEMS IN HISTORY SECTION WHEN BUTTON CLICK
    DELETE_WATCHED.addEventListener('click', () => {
        userModel.removeWatched();
        let counterLoader = 0;
        const intervalLoader = setInterval(() => {
            counterLoader++;
            WATCHED_CONTAINER.style.opacity = '0.3';
            ANIMATION_HISTORY.className = 'loader';
            if (counterLoader >= 3) {
                window.clearInterval(intervalLoader);
                ANIMATION_HISTORY.style.display = 'none';
                WATCHED_CONTAINER.style.display = 'none';
                WATCHED_CONTAINER.style.opacity = '1';
            }
        }, 800);
    });

    // ROUTER
    const mainSections = [FOCUS_SECTION, MOBILE_SECTION, MOBILE_APP, TV_SECTION, TOP_SECTION, BIG_TECHNOLOGIES, BULLETIN];
    const idArr = ALL_FOCUS_ITEMS.concat(OTHER_CLIENTS_WATCHED).map(el => el.id);
    function onHashChange() {
        const hash = location.hash.substring(1);
        MAIN_MENU.removeEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.removeEventListener('mouseout', onMainMouseOut);
        CATEGORIES_LINK.removeEventListener('mouseover', onCategoriesMouseOver);
        CATEGORIES_LINK.removeEventListener('mouseout', onCategoriesMouseOut);
        window.removeEventListener('scroll', utils.hideMainWhenScroll);
        // change hash with correct article id
        utils.sandwichHeaderOff('home');
        utils.display('block', NAV_BAR, WATCHED_CONTAINER, APP_EMAG, MARKETPLACE_SECTION);
        utils.display('flex', FOOTER);
        utils.display('none', CATEGORY_SECTION);
        const isCorrectId = idArr.some(el => el === +hash.split('/')[1]);
        if (isCorrectId && hash.includes('article/')) {
            const currentId = +hash.split('/')[1];
            const ALL_ITEMS = ALL_FOCUS_ITEMS.concat(OTHER_CLIENTS_WATCHED);
            const currentItem = ALL_ITEMS.filter(item => item.id === currentId)[0];
            watchedItem(userModel.getWatched(), currentItem);
            openItem(currentItem);
            utils.sandwichHeaderOff();
            utils.display('block', HOME_PAGE_MENU, OPEN_ITEM);
            utils.display('none', MARKETPLACE_SECTION, OTHER_CLIENTS_SECTION, MAIN_MENU, OPTIONS_PANEL, CART_PAGE, FAVOURITES_PAGE);
            mainSections.map(section => section.style.display = 'none');
            // CATEGORIES_LINK.className = 'categories-btn-close';
            CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-close';
            CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
            document.documentElement.scrollTop = 0;
            return;
        }

        switch (hash) {
            case '':
            case 'home':
                utils.display('block', MAIN_SECTION, HOME_PAGE_MENU, MARKETPLACE_SECTION, OTHER_CLIENTS_SECTION);
                utils.display('flex', MAIN_MENU, OPTIONS_PANEL);
                utils.display('none', LOGIN_SECTION, ERROR_PAGE, OPEN_ITEM, CART_PAGE, FAVOURITES_PAGE);
                mainSections.map(section => section.style.display = 'block');
                document.body.style.backgroundColor = '#e9ebee';
                break;
            case 'login':
                utils.display('block', LOGIN_SECTION, LOGIN_PAGE);
                utils.display('none', MAIN_SECTION, REGISTER_PAGE, CART_PAGE, FAVOURITES_PAGE, ERROR_PAGE);
                document.body.style.backgroundColor = '#f7f7f7';
                break;
            case 'register':
                utils.display('block', LOGIN_SECTION, REGISTER_PAGE);
                utils.display('none', MAIN_SECTION, LOGIN_PAGE, CART_PAGE, FAVOURITES_PAGE, ERROR_PAGE);
                document.body.style.backgroundColor = '#f7f7f7';
                break;
            case 'cart':
                utils.display('block', MAIN_SECTION, CART_PAGE, HOME_PAGE_MENU);
                utils.display('none', MAIN_MENU, LOGIN_SECTION, OPEN_ITEM, MARKETPLACE_SECTION, OTHER_CLIENTS_SECTION, OPTIONS_PANEL, NAV_BAR, WATCHED_CONTAINER, FOOTER, APP_EMAG, FAVOURITES_PAGE);
                mainSections.map(section => section.style.display = 'none');
                break;
            case 'favourites':
                utils.sandwichHeaderOff();
                CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-close';
                CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
                utils.display('block', MAIN_SECTION, HOME_PAGE_MENU);
                utils.display('flex', FAVOURITES_PAGE);
                utils.display('none', MAIN_MENU, LOGIN_SECTION, OPEN_ITEM, MARKETPLACE_SECTION, OTHER_CLIENTS_SECTION, OPTIONS_PANEL, CART_PAGE);
                mainSections.map(section => section.style.display = 'none');
                if (userModel.isLoggedIn()) {
                    FAV_LOGIN.style.display = 'none';
                    FAV_IS_LOGGIN.style.display = 'block';
                } else {
                    FAV_LOGIN.style.display = 'block';
                    FAV_IS_LOGGIN.style.display = 'none';
                }

                break;
            case 'categories':
                utils.sandwichHeaderOff();
                CATEGORIES_LINK.className = 'fw-600 display-flex main-bckgr categories-btn-close';
                CATEGORIES_LINK.addEventListener('mouseover', onCategoriesMouseOver);
                utils.display('block', CATEGORY_SECTION, MAIN_SECTION, HOME_PAGE_MENU, OTHER_CLIENTS_SECTION, MOBILE_SECTION, MOBILE_APP, TV_SECTION, TOP_SECTION, BIG_TECHNOLOGIES, BULLETIN);
                utils.display('none', FOCUS_SECTION, FAVOURITES_PAGE, MAIN_MENU, LOGIN_SECTION, OPEN_ITEM, MARKETPLACE_SECTION, OPTIONS_PANEL, CART_PAGE);
                break;
            default:
                utils.display('block', ERROR_PAGE);
                utils.display('none', MAIN_SECTION, LOGIN_SECTION, MAIN_MENU, OPTIONS_PANEL, OPEN_ITEM, CART_PAGE, FAVOURITES_PAGE);
                mainSections.map(section => section.style.display = 'none');
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
        const tagName = e.target.tagName
        if (tagName === 'DIV' || tagName === 'I' || tagName === 'INPUT' || tagName === 'IMG') return;
        e.preventDefault();
        location.replace('#categories');
        document.documentElement.scrollTop = 0;
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

    // ON CLICK ON HEADER NAV ICONS
    FAVOURITE_ICON.addEventListener('click', () => {
        location.replace('#favourites');
    });
    SHOPPING_CART_ICON.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        location.replace('#cart');
    });

    // ADD REMISE VOUCHER IN CART
    ADD_VOUCHER.addEventListener('click', () => {
        if (ADD_CODE.style.display === 'none') {
            ADD_CODE.style.display = 'block';
            VOUCHER_CONTAINER.style.paddingBottom = '20px';
        } else {
            ADD_CODE.style.display = 'none';
            VOUCHER_CONTAINER.style.paddingBottom = '0';
        }
    });

    // ON SEARCH, SORT AND FILTER IN CATEGORY PAGE
    CATEGORY_FILTERS.addEventListener('change', (e) => {
        filter.onlyOneCheckbox(e.target);
        filter.checkTheCheckboxes();
        createItemsCard(filter.filterArticles(), ALL_ITEMS_CONTAINER);
    });
    SEARCH_CATEGORY_ITEM.addEventListener('input', utils.debounce(function () {
        createItemsCard(filter.filterArticles(), ALL_ITEMS_CONTAINER);
    }, 500));
    SORT_BY.addEventListener('change', () => {
        createItemsCard(filter.filterArticles(), ALL_ITEMS_CONTAINER);
    });
    CLEAR_FILTERS_BUTTON.addEventListener('click', () => {
        filter.clearCheckboxes();
        createItemsCard(filter.filterArticles(), ALL_ITEMS_CONTAINER);
    });

    // MAIN
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('DOMContentLoaded', (e) => {
        onHashChange(e);
        renderHeader();
    });
    window.addEventListener('scroll', utils.onScroll);
})();