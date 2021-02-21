const utils = (function () {
    // SEARCH BAR
    function onFocus() {
        SEARCH_BOX.style.display = 'block';
        SEARCH_FORM.style.borderBottomLeftRadius = 0;
        SEARCH_FORM.style.borderBottomRightRadius = 0;
        SEARCH_FORM.style.borderBottom = 'none';
        SUBMIT_BUTTON.style.borderBottomRightRadius = 0;
        SEARCH_FORM.style.backgroundColor = 'white';
        document.body.style.pointerEvents = 'none';
        SEARCH_FORM.style.pointerEvents = 'all';
        SEARCH_BOX.style.pointerEvents = 'all';
        SEARCH_BAR.addEventListener('focusout', onFocusOut);
    }

    function onFocusOut() {
        SEARCH_BOX.style.display = 'none';
        SEARCH_FORM.style.borderBottom = '1px solid #0082e6';
        SEARCH_FORM.style.borderBottomLeftRadius = '25px';
        SEARCH_FORM.style.borderBottomRightRadius = '25px';
        SUBMIT_BUTTON.style.borderBottomRightRadius = '25px';
        document.body.style.pointerEvents = 'all';
    }

    // HELPER FUNCTIONS
    function getById(id) {
        return document.getElementById(id);
    }

    function success(message) {
        const successBanner = utils.getById('success');
        successBanner.innerText = message;
        successBanner.style.display = 'block';
        setTimeout(() => {
            successBanner.style.display = 'none';
        }, 3000);
    }

    function error(message) {
        const errorBanner = utils.getById('error');
        errorBanner.innerText = message;
        errorBanner.style.display = 'block';
        setTimeout(() => {
            errorBanner.style.display = 'none';
        }, 3000);
    }

    //CREATE NEW HTML ELEMENT
    function createNewElement(type, text) {
        const element = document.createElement(type);
        if (text) {
            element.innerText = text;
        }

        return element;
    }

    // LOGIN & LOGOUT
    function isLoggedIn() {
        return JSON.parse(localStorage.getItem('isLoggedIn'));
    }

    function login(username) {
        const users = utils.getUsers();
        users.forEach(user => {
            if (user.username === username) {
                user.isLoggedIn = true;
                return;
            }
        });

        utils.setUsers(users);
        localStorage.setItem('isLoggedIn', true);
    }

    function logout() {
        const users = utils.getUsers();
        users.forEach(user => {
            if (user.isLoggedIn) {
                user.isLoggedIn = false;
                return;
            }
        });

        utils.setUsers(users);
        localStorage.setItem('isLoggedIn', false);
    }

    // LOCAL STORAGE
    function getUsers() {
        return JSON.parse(localStorage.getItem('users'));
    }

    function setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getItem(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // ADD & REMOVE TO/FROM FAVOURITES & CART
    function addToFav(article) {
        if (!isLoggedIn()) {
            const guest = getItem('guest');
            guest.favourites.unshift(article);
            setItem('guest', guest);
            return;
        }

        const users = utils.getUsers();
        users.forEach(user => {
            if (user.isLoggedIn) {
                return user.favourites.unshift(article);
            }
        });

        setUsers(users);
        success('Продуктът беше добавен в любими');
    }

    function removeFromFav(article) {
        if (!isLoggedIn()) {
            const guest = getItem('guest');
            guest.favourites = guest.favourites.filter(el => el.id !== article.id);
            setItem('guest', guest);
            return;
        }

        let users = utils.getUsers();
        users.forEach(user => {
            if (user.isLoggedIn) {
                return user.favourites = user.favourites.filter(el => el.id !== article.id);
            }
        });

        setUsers(users);
        success('Продуктът беше премахнат от любими');
    }

    function addToCart(article) {
        if (!isLoggedIn()) {
            const guest = getItem('guest');
            if (guest.cart.some(el => el.id === article.id)) {
                guest.cart.forEach(el => {
                    if (el.id === article.id) {
                        if (el.count === 5) return;
                        return el.count = el.count + 1 || 1;
                    }
                });
            } else {
                article.count = 1;
                guest.cart.push(article);
            }

            setItem('guest', guest);
        } else {
            const users = getUsers();
            users.forEach(user => {
                if (user.isLoggedIn) {
                    if (user.cart.some(el => el.id === article.id)) {
                        user.cart.forEach(el => {
                            if (el.id === article.id) {
                                return el.count = el.count + 1 || 1;
                            }
                        });
                    } else {
                        article.count = 1;
                        user.cart.push(article);
                    }

                    return;
                }
            });

            setUsers(users);
        }

        success('Продуктът беше добавен в количката');
    }

    function removeFromCart(article) {
        if (!isLoggedIn()) {
            const guest = getItem('guest');
            guest.cart = guest.cart.filter(el => el.id !== article.id);
            return setItem('guest', guest);
        }

        let users = utils.getUsers();
        users.forEach(user => {
            if (user.isLoggedIn) {
                return user.cart = user.cart.filter(el => el.id !== article.id);
            }
        });

        setUsers(users);
    }

    //CALCULATING PERCENTAGE
    function calculatingPercentage(currentItem) {
        const currentPr = parseFloat(currentItem.currentPrice + '.' + currentItem.currentPennies);
        const regularPr = parseFloat(currentItem.regularPrice + '.' + currentItem.regularPennies);
        return Math.floor(100 - 100 * (currentPr / regularPr));
    }

    //HELPER FUNCTION FOR CALCULATING PRICES
    function calculatingPrices(currentOption, firstPrice, firstPennies) {
        let totalCurrentPrice = (currentOption * parseFloat(firstPrice + '.' + firstPennies)).toFixed(2).toString().split('.');
        changeCurrentPrice = totalCurrentPrice[0];
        changeCurrentPennies = totalCurrentPrice[1];
    }

    //HELPER FUNCTION FOR CALCULATING AMOUNT
    function calculateAmount(amount) {
        let currentAmount = amount.toFixed(2).toString().split('.');
        CART_AMOUNT_PRICE.innerHTML = currentAmount[0];
        PRODUCTS_AMOUNT.innerHTML = currentAmount[0];
        PRODUCTS_PENNIES.innerHTML = currentAmount[1];
        AMOUNT_PENNIES.innerHTML = currentAmount[1];
    }

    //CHANGE PRICE WHEN CHANGE COUNT
    function changePrice(currentOption, currentElement, currentPrice, currentPennies, regularPrice, regularPennies, savePrice, savePennies) {
        const firstPrice = currentElement.currentPrice;
        const firstPennies = currentElement.currentPennies;
        const regPrice = currentElement.regularPrice;
        const regPennies = currentElement.regularPennies;
        calculatingPrices(currentOption, firstPrice, firstPennies);
        currentPrice.innerHTML = changeCurrentPrice;
        currentPennies.innerHTML = changeCurrentPennies;
        let currentMoney = eval(`${changeCurrentPrice}.${changeCurrentPennies}`);
        if (currentElement.regularPrice !== '-') {
            calculatingPrices(currentOption, regPrice, regPennies);
            regularPrice.innerHTML = changeCurrentPrice;
            regularPennies.innerHTML = changeCurrentPennies;
            let currentRegular = eval(`${changeCurrentPrice}.${changeCurrentPennies}`);
            let savedMoney = (currentRegular - currentMoney).toFixed(2).toString().split('.');
            savePrice.innerHTML = savedMoney[0];
            savePennies.innerHTML = savedMoney[1];
        }
    }

    return {
        onFocus,
        onFocusOut,
        getById,
        success,
        error,
        createNewElement,
        isLoggedIn,
        login,
        logout,
        getUsers,
        setUsers,
        getItem,
        setItem,
        addToFav,
        removeFromFav,
        addToCart,
        removeFromCart,
        calculatingPercentage,
        changePrice,
        calculateAmount
    }
})();