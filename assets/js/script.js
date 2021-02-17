// GENERAL FUNCTIONALITY
(function () {
    // LOGIN & REGISTER
    localStorage.setItem('users', JSON.stringify(new Array));
    localStorage.setItem('isLoggedIn', false);
    const users = JSON.parse(localStorage.getItem('users'));

    function registerUser(names, username, password, rePasword) {
        if (!names.trim().includes(' ')) {
            return error('Моля, въведи име и фамилия.');
        }

        if (!username.trim()) {
            return error('Моля, въведи потребителско име.');
        }

        if (username.trim().length < 4) {
            return error('Потребителското име трябва да е поне 4 символа.');
        }

        for (const user of users) {
            if (user.username === username) {
                return error('Потребителското име вече е заето.');
            }
        }

        if (password.length < 5) {
            return error('Паролата трябва да е поне 5 символа.');
        }

        if (password !== rePasword) {
            return error('Паролите не съвпадат.');
        }

        const [firstName, lastName] = names.split(' ');
        users.push({ username, password, firstName, lastName });
        localStorage.setItem('users', JSON.stringify(users));
        NAMES.value = '';
        REGISTER_USER.value = '';
        REGISTER_PASS.value = '';
        REGISTER_RE_PASS.value = '';
        success('Успешна регистрация!');
        location.replace('#login');
    }

    function loginUser(username, password) {
        if (!username.trim()) {
            return error('Невалидно потребителско име');
        }

        if (!password.trim()) {
            return error('Невалидна парола');
        }

        for (const user of users) {
            if (user.username !== username.trim()) {
                return error('Невалидно потребителско име.');
            } else {
                if (user.password !== password.trim()) {
                    return error('Невалидна парола.');
                } else {
                    onLoginSuccess(user.firstName, user.lastName);
                }
            }
        }
    }

    function onLoginSuccess(firstName, lastName) {
        LOGIN_USER.value = '';
        LOGIN_PASS.value = '';
        success(`Добре дошъл, ${firstName} ${lastName}!`);
        login();
        renderHeader(firstName, lastName);
        PROFILE_NAV.classList.add('checked');
        GUEST_NAV.classList.remove('checked');
        location.replace('#home');
        document.documentElement.scrollTop = 0;
    }

    // RENDERING
    function renderHeader(firstName, lastName) {
        if (arguments.length) {
            let [firstLetter, secondLetter] = [firstName[0].toUpperCase(), lastName[0].toUpperCase()];
            USER_PIC.innerText = firstLetter + secondLetter;
            USER_PIC.className = 'logged-user-icon';
            HELLO_MESSAGE.innerText = `Здравей, ${firstName} ${lastName}`;
        } else {
            PROFILE_NAV.classList.remove('checked');
            GUEST_NAV.classList.add('checked');
            USER_PIC.innerHTML = `<i class="far fa-user">`;
            USER_PIC.className = 'guest-user-icon';
        }

        document.documentElement.scrollTop = 0;
    }

    // INFO BANNERS
    function success(message) {
        SUCCESS_BANNER.innerText = message;
        SUCCESS_BANNER.style.display = 'block';
        setTimeout(() => {
            SUCCESS_BANNER.style.display = 'none';
        }, 3000);
    }

    function error(message) {
        ERROR_BANNER.innerText = message;
        ERROR_BANNER.style.display = 'block';
        setTimeout(() => {
            ERROR_BANNER.style.display = 'none';
        }, 3000);
    }

    // ROUTER
    const mainSections = [FOCUS_SECTION, MOBILE_SECTION, MOBILE_APP, TV_SECTION, TOP_SECTION, BIG_TECHNOLOGIES, BULLETIN];
    function onHashChange(e) {
        const hash = e.target.location.hash.substring(1);
        switch (hash) {
            case 'home':
                MAIN_SECTION.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
                document.body.style.backgroundColor = '#e9ebee';
                ERROR_PAGE.style.display = 'none';
                MAIN_MENU.style.display = 'flex';
                OPTIONS_PANEL.style.display = 'flex';
                OPEN_ITEM.style.display = 'none';
                mainSections.map(section => section.style.display = 'block');
                break;
            case 'login':
                MAIN_SECTION.style.display = 'none';
                LOGIN_SECTION.style.display = 'block';
                LOGIN_PAGE.style.display = 'block';
                REGISTER_PAGE.style.display = 'none';
                document.body.style.backgroundColor = '#f7f7f7';
                ERROR_PAGE.style.display = 'none';
                MAIN_MENU.style.display = 'flex';
                OPTIONS_PANEL.style.display = 'flex';
                OPEN_ITEM.style.display = 'none';
                mainSections.map(section => section.style.display = 'block');
                break;
            case 'register':
                MAIN_SECTION.style.display = 'none';
                LOGIN_PAGE.style.display = 'none';
                LOGIN_SECTION.style.display = 'block';
                REGISTER_PAGE.style.display = 'block';
                document.body.style.backgroundColor = '#f7f7f7';
                ERROR_PAGE.style.display = 'none';
                MAIN_MENU.style.display = 'flex';
                OPTIONS_PANEL.style.display = 'flex';
                OPEN_ITEM.style.display = 'none';
                mainSections.map(section => section.style.display = 'block');
                break;
            case 'title':
            case 'article':
                MAIN_MENU.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                mainSections.map(section => section.style.display = 'none');
                break;
            default:
                MAIN_SECTION.style.display = 'none';
                LOGIN_SECTION.style.display = 'none';
                ERROR_PAGE.style.display = 'block';
                mainSections.map(section => section.style.display = 'none');
                MAIN_MENU.style.display = 'none';
                OPTIONS_PANEL.style.display = 'none';
                OPEN_ITEM.style.display = 'none';
        }

        document.documentElement.scrollTop = 0;
    }

    // EVENT LISTENERS
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('DOMContentLoaded', () => {
        location.replace('#home');
    });
    SEARCH_INPUT.addEventListener('focus', onFocus);
    const searchBoxContent = Array.from(SEARCH_BOX_CONTENT.children);
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
        logout();
        renderHeader();
        success('Излязохте успешно!');
    });
})();