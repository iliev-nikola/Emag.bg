function goToLoginPage() {
    location.replace('#login');
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
const userModel = (function () {
    // if (!utils.getUsers()) {
    //     utils.setUsers([]);
    // }

    // if (localStorage.getItem('isLoggedIn') === null) {
    //     localStorage.setItem('isLoggedIn', false);
    // }

    // if (utils.getItem('guest') === null) {
    //     utils.setItem('guest', { favourites: [], cart: [], watched: [] })
    // }

    class User {
        constructor(username, password, firstName, lastName) {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.isLoggedIn = false;
            this.cart = [];
            this.favourites = [];
            this.watched = [];
        }
    }

    class UserManager {
        constructor() {
            if (!utils.getUsers()) {
                utils.setUsers([]);
                this.users = [];
            } else {
                this.users = utils.getUsers();
            }

            if (utils.getItem('guest') === null) {
                utils.setItem('guest', { favourites: [], cart: [], watched: [] });
            }

            if (localStorage.getItem('isLoggedIn') === null) {
                localStorage.setItem('isLoggedIn', false);
            }
        }

        // LOGIN & REGISTER
        registerUser(names, username, password, rePasword) {
            names = names.trim();
            username = username.trim();
            password = password.trim();
            rePasword = rePasword.trim();
            if (!names.includes(' ')) {
                return utils.error('Моля, въведи име и фамилия.');
            }

            if (!username) {
                return utils.error('Моля, въведи потребителско име.');
            }

            if (username.length < 4) {
                return utils.error('Потребителското име трябва да е поне 4 символа.');
            }

            for (const user of this.users) {
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
            this.users.push(new User(username, password, firstName, lastName));
            utils.setUsers(this.users);
            // NAMES.value = '';
            // REGISTER_USER.value = '';
            // REGISTER_PASS.value = '';
            // REGISTER_RE_PASS.value = '';
            utils.success('Успешна регистрация!');
            location.replace('#login');
        }

        loginUser(username, password) {
            username = username.trim();
            password = password.trim();
            if (!username) {
                return utils.error('Невалидно потребителско име');
            }

            if (!password) {
                return utils.error('Невалидна парола');
            }

            this.users = utils.getUsers();
            const user = this.users.find(user => user.username === username);
            if (!user) {
                return utils.error('Невалидно потребителско име.');
            }

            const hasPassword = user.password === password;
            if (!hasPassword) {
                return utils.error('Невалидна парола.');
            }

            this.users.find(user => user.username === username).isLoggedIn = true;
            // this.users.forEach(user => {
            //     if (user.username === username) {
            //         user.isLoggedIn = true;
            //         return;
            //     }
            // });

            utils.setUsers(this.users);
            localStorage.setItem('isLoggedIn', true);
            onLoginSuccess(user.firstName, user.lastName, true);
        }

        logoutUser() {
            this.users.find(user => user.isLoggedIn).isLoggedIn = false;
            utils.setUsers(this.users);
            localStorage.setItem('isLoggedIn', false);

            // this.users.forEach(user => {
            //     if (user.isLoggedIn) {
            //         user.isLoggedIn = false;
            //         return;
            //     }
            // });
        }

        isLoggedIn() {
            return JSON.parse(localStorage.getItem('isLoggedIn'));
        }

        // FAVOURITES ITEMS
        addToFav(article) {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                if (guest.favourites.some(el => el.id === article.id)) {
                    return;
                }

                guest.favourites.unshift(article);
                setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                if (currentUser.favourites.some(el => el.id === article.id)) {
                    return;
                }

                currentUser.favourites.unshift(article);
                // this.users.forEach(user => {
                //     if (user.isLoggedIn) {
                //         if (user.favourites.some(el => el.id === article.id)) {
                //             return;
                //         }

                //         return user.favourites.unshift(article);
                //     }
                // });

                setUsers(this.users);
            }

            utils.success('Продуктът беше добавен в любими');
        }

        removeFromFav(article) {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                guest.favourites = guest.favourites.filter(el => el.id !== article.id);
                setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                currentUser.favourites = currentUser.favourites.filter(el => el.id !== article.id);
                // this.users.forEach(user => {
                //     if (user.isLoggedIn) {
                //         return user.favourites = user.favourites.filter(el => el.id !== article.id);
                //     }
                // });

                setUsers(this.users);
            }

            utils.success('Продуктът беше премахнат от любими');
        }

        getFavourites() {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                return guest.favourites;
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                return currentUser.favourites;
            }
        }

        // SHOPPING CART ITEMS
        addToCart(article) {
            let limitReach = false;
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                if (guest.cart.some(el => el.id === article.id)) {
                    guest.cart.forEach(el => {
                        if (el.id === article.id) {
                            if (el.count === 5) return limitReach = true;
                            return el.count = el.count + 1 || 1;
                        }
                    });
                } else {
                    article.count = 1;
                    guest.cart.push(article);
                }

                setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                if (currentUser.cart.some(el => el.id === article.id)) {
                    currentUser.cart.forEach(el => {
                        if (el.id === article.id) {
                            return el.count = el.count + 1 || 1;
                        }
                    });
                } else {
                    article.count = 1;
                    currentUser.cart.push(article);
                }
                // this.users.forEach(user => {
                //     if (user.isLoggedIn) {
                //         if (user.cart.some(el => el.id === article.id)) {
                //             user.cart.forEach(el => {
                //                 if (el.id === article.id) {
                //                     return el.count = el.count + 1 || 1;
                //                 }
                //             });
                //         } else {
                //             article.count = 1;
                //             user.cart.push(article);
                //         }

                //         return;
                //     }
                // });

                setUsers(users);
            }

            if (!limitReach) utils.success('Продуктът беше добавен в количката');
        }

        removeFromCart(article) {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                guest.cart = guest.cart.filter(el => el.id !== article.id);
                setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                currentUser.cart = user.cart.filter(el => el.id !== article.id);
                // this.users.forEach(user => {
                //     if (user.isLoggedIn) {
                //         return user.cart = user.cart.filter(el => el.id !== article.id);
                //     }
                // });

                setUsers(this.users);
            }
        }

        getCart() {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                return guest.cart;
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                return currentUser.cart;
            }
        }

        // WATCHED ITEMS
        watchItem(article) {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                if (guest.watched.some(el => el.id === article.id)) {
                    return;
                }

                guest.watched.unshift(article);
                setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                if (currentUser.watched.some(el => el.id === article.id)) {
                    return;
                }

                currentUser.watched.unshift(article);
                setUsers(this.users);

                // this.users.forEach(user => {
                //     if (user.isLoggedIn) {
                //         if (user.favourites.some(el => el.id === article.id)) {
                //             return;
                //         }

                //         return user.favourites.unshift(article);
                //     }
                // });
            }
        }

        getWatched() {
            if (!isLoggedIn()) {
                const guest = getItem('guest');
                return guest.watched;
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                return currentUser.watched;
            }
        }

        // LOCAL STORAGE
        getUsers() {
            return JSON.parse(localStorage.getItem('users'));
        }

        setUsers(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        getItem(item) {
            return JSON.parse(localStorage.getItem(item));
        }

        setItem(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    return new UserManager();
})();

