(function () {
    // Search bar on focus, outer space grey and none-active
    SEARCH_BAR.addEventListener('focus', onFocus);

    // Router
    function onHashChange(e) {
        const hash = e.target.location.hash.substring(1);
        switch (hash) {
            case 'home':
                MAIN_SECTION.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
                break;
            case 'login':
                MAIN_SECTION.style.display = 'none';
                LOGIN_SECTION.style.display = 'block';
                LOGIN_PAGE.style.display = 'block';
                REGISTER_PAGE.style.display = 'none';
                break;
            case 'register':
                MAIN_SECTION.style.display = 'none';
                LOGIN_PAGE.style.display = 'none';
                LOGIN_SECTION.style.display = 'block';
                REGISTER_PAGE.style.display = 'block';
                break;
            default:
                MAIN_SECTION.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
        }
    }
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('DOMContentLoaded', onHashChange);
})();