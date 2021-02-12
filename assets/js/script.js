(function () {
    // SEARCH BAR ON FOCUS, outer space grey and none-active
    SEARCH_BAR.addEventListener('focus', onFocus);

    // LOGIN & REGISTER
    localStorage.setItem('users', JSON.stringify(new Array));
    localStorage.setItem('isLoggedIn', false);
    const users = JSON.parse(localStorage.getItem('users'));

    REGISTER_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        registerUser(NAMES.value, REGISTER_USER.value, REGISTER_PASS.value, REGISTER_RE_PASS.value);
    });

    LOGIN_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        loginUser(LOGIN_USER.value, LOGIN_PASS.value);
    });

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

        NAMES.value = '';
        REGISTER_USER.value = '';
        REGISTER_PASS.value = '';
        REGISTER_RE_PASS.value = '';
        let [firstName, lastName] = names.split(' ');
        users.push({ username, password, firstName, lastName });
        localStorage.setItem('users', JSON.stringify(users));
        loginUser(REGISTER_USER.value, REGISTER_PASS.value);
        success('Успешна регистрация!');
    }

    function loginUser(username, password) {
        for (const user of users) {
            if (user.username !== username) {
                return error('Невалидно потребителско име.');
            } else {
                if (user.password !== password) {
                    return error('Невалидна парола.');
                } else {
                    login();
                    success(`Добре дошъл, ${username.firstName} ${username.lastName}`);
                }
            }
        }
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
    function onHashChange(e) {
        const hash = e.target.location.hash.substring(1);
        switch (hash) {
            case 'home':
                MAIN_SECTION.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
                document.body.style.backgroundColor = '#e9ebee';
                break;
            case 'login':
                MAIN_SECTION.style.display = 'none';
                LOGIN_SECTION.style.display = 'block';
                LOGIN_PAGE.style.display = 'block';
                REGISTER_PAGE.style.display = 'none';
                document.body.style.backgroundColor = '#f7f7f7';
                break;
            case 'register':
                MAIN_SECTION.style.display = 'none';
                LOGIN_PAGE.style.display = 'none';
                LOGIN_SECTION.style.display = 'block';
                REGISTER_PAGE.style.display = 'block';
                document.body.style.backgroundColor = '#f7f7f7';
                break;
            default:
                MAIN_SECTION.style.display = 'block';
                LOGIN_SECTION.style.display = 'none';
        }
    }
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('DOMContentLoaded', onHashChange);
})();