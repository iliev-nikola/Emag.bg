const userModel = (function () {
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
            if (this.getUsers()) {
                this.users = this.getUsers();
            } else {
                this.setUsers([]);
                this.users = [];
            }

            if (this.getItem('guest') === null) {
                this.setItem('guest', { favourites: [], cart: [], watched: [] });
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
            this.setUsers(this.users);
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

            this.users = this.getUsers();
            const user = this.users.find(user => user.username === username);
            if (!user) {
                return utils.error('Невалидно потребителско име.');
            }

            const hasPassword = user.password === password;
            if (!hasPassword) {
                return utils.error('Невалидна парола.');
            }

            this.users.find(user => user.username === username).isLoggedIn = true;

            this.setUsers(this.users);
            localStorage.setItem('isLoggedIn', true);
            onLoginSuccess(user.firstName, user.lastName, true);
        }

        logoutUser() {
            this.users.find(user => user.isLoggedIn).isLoggedIn = false;
            this.setUsers(this.users);
            localStorage.setItem('isLoggedIn', false);
        }

        isLoggedIn() {
            return JSON.parse(localStorage.getItem('isLoggedIn'));
        }

        // FAVOURITES ITEMS
        addToFav(id) {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                if (guest.favourites.some(el => el === id)) {
                    return;
                }

                guest.favourites.unshift(id);
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                if (currentUser.favourites.some(el => el === id)) {
                    return;
                }

                currentUser.favourites.unshift(id);
                this.setUsers(this.users);
            }

            utils.success('Продуктът беше добавен в любими');
        }

        removeFromFav(id) {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                guest.favourites = guest.favourites.filter(el => el !== id);
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                currentUser.favourites = currentUser.favourites.filter(el => el !== id);
                this.setUsers(this.users);
            }

            utils.success('Продуктът беше премахнат от любими');
        }

        getFavourites() {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                return utils.getArticles(guest.favourites);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                return utils.getArticles(currentUser.favourites);
            }
        }

        // SHOPPING CART ITEMS
        addToCart(id) {
            let limitReach = false;
            const article = utils.getArticle(id);
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                if (article.id === id) {
                    if (article.count === 5) limitReach = true;
                    article.count = article.count + 1 || 1;
                } else {
                    article.count = 1;
                }

                guest.cart.push({ id: article.id, count: article.count });
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                if (article.id === id) {
                    article.count = article.count + 1 || 1;
                } else {
                    article.count = 1;
                }

                currentUser.cart.push({ id: article.id, count: article.count });
                this.setUsers(this.users);
            }

            if (!limitReach) utils.success('Продуктът беше добавен в количката');
        }

        removeFromCart(id) {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                guest.cart = guest.cart.filter(el => el.id !== id);
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                currentUser.cart = currentUser.cart.filter(el => el.id !== id);
                this.setUsers(this.users);
            }
        }

        getCart() {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                return utils.getArticles(guest.cart);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                return utils.getArticles(currentUser.cart);
            }
        }

        changeAmount(id, count) {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                const article = guest.cart.find(el => el.id === id);
                article.count = count;
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                const article = currentUser.cart.find(el => el.id === id);
                article.count = count;
                this.setUsers(this.users);
            }
        }

        // WATCHED ITEMS
        watchItem(id) {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                if (guest.watched.some(el => el.id === id)) {
                    return;
                }

                guest.watched.unshift(id);
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                if (currentUser.watched.some(el => el.id === id)) {
                    return;
                }

                currentUser.watched.unshift(id);
                this.setUsers(this.users);
            }
        }

        getWatched() {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                return utils.getArticles(guest.watched);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                return utils.getArticles(currentUser.watched);
            }
        }

        removeWatched() {
            if (!this.isLoggedIn()) {
                const guest = this.getItem('guest');
                guest.watched = [];
                this.setItem('guest', guest);
            } else {
                const currentUser = this.users.find(user => user.isLoggedIn);
                currentUser.watched = [];
                this.setItem('users', this.users);
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