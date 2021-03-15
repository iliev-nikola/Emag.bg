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
    function display(display, ...args) {
        [...args].forEach(el => el.style.display = display);
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function querySelect(param) {
        return document.querySelector(param);
    }

    function goToLoginPage() {
        location.replace('#login');
    }

    function success(message) {
        if (message.includes('добавен в любими')) {
            SUCCESS_BANNER.innerHTML = `<i class="fas fa-heart"></i><p>${message}</p>`;
            SUCCESS_BANNER.children[0].style.color = 'red';
        } else if (message.includes('премахнат от любими')) {
            SUCCESS_BANNER.innerHTML = `<i class="far fa-heart"></i><p>${message}</p>`;
            SUCCESS_BANNER.children[0].style.color = '#2196f3';
        } else if (message.includes('количка')) {
            SUCCESS_BANNER.innerHTML = `<img src="./assets/images/icons/shopping-cart-white.png"></img><p>${message}</p>`;
        } else {
            SUCCESS_BANNER.innerHTML = message;
        }

        SUCCESS_BANNER.style.display = 'flex';
        SUCCESS_BANNER.addEventListener('click', () => {
            SUCCESS_BANNER.style.display = 'none';
        });

        setTimeout(() => {
            SUCCESS_BANNER.style.display = 'none';
        }, 3000);
    }

    function error(message) {
        ERROR_BANNER.innerHTML = `<p>${message}</p>`;
        ERROR_BANNER.style.display = 'block';
        ERROR_BANNER.addEventListener('click', () => {
            ERROR_BANNER.style.display = 'none';
        });

        setTimeout(() => {
            ERROR_BANNER.style.display = 'none';
        }, 3000);
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const effect = () => {
                timeout = null;
                return func.apply(this, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(effect, wait);
        };
    }

    function getArticle(id) {
        return ALL_ARTICLES.find(el => el.id === id);
    }

    function getArticles(arr) {
        const output = [];
        if (typeof arr[0] === 'object') {
            arr.forEach(el => {
                const article = getArticle(el.id);
                article.count = el.count || 1;
                output.push(article);
            });
        } else {
            arr.forEach(el => {
                const article = getArticle(el);
                output.push(article);
            });
        }

        return output;
    }

    //CREATE NEW HTML ELEMENT
    function createNewElement(type, text) {
        const element = document.createElement(type);
        if (text) {
            element.innerText = text;
        }

        return element;
    }

    // HELPER FUNCTION FOR CALCULATING PRICES
    function calculatingPrices(currentOption, firstPrice) {
        let totalCurrentPrice = (currentOption * parseFloat(firstPrice)).toFixed(2).toString().split('.');
        changeCurrentPrice = totalCurrentPrice[0];
        changeCurrentPennies = totalCurrentPrice[1];
    }

    // HELPER FUNCTION FOR CALCULATING AMOUNT
    function calculateAmount(amount) {
        let currentAmount = amount.toFixed(2).toString().split('.');
        CART_AMOUNT_PRICE.innerHTML = currentAmount[0];
        PRODUCTS_AMOUNT.innerHTML = currentAmount[0];
        PRODUCTS_PENNIES.innerHTML = currentAmount[1];
        AMOUNT_PENNIES.innerHTML = currentAmount[1];
    }

    // CHANGE PRICE WHEN CHANGE COUNT
    function changePrice(currentOption, currentElement, currentPrice, currentPennies, regularPrice, regularPennies, savePrice, savePennies) {
        const firstPrice = currentElement.currentPrice;
        const regPrice = currentElement.regularPrice;
        calculatingPrices(currentOption, firstPrice);
        currentPrice.innerHTML = changeCurrentPrice;
        currentPennies.innerHTML = changeCurrentPennies;
        let currentMoney = eval(`${changeCurrentPrice}.${changeCurrentPennies}`);
        if (currentElement.regularPrice) {
            calculatingPrices(currentOption, regPrice);
            regularPrice.innerHTML = changeCurrentPrice;
            regularPennies.innerHTML = changeCurrentPennies;
            let currentRegular = eval(`${changeCurrentPrice}.${changeCurrentPennies}`);
            let savedMoney = (currentRegular - currentMoney).toFixed(2).toString().split('.');
            savePrice.innerHTML = savedMoney[0];
            savePennies.innerHTML = savedMoney[1];
        }
    }

    // MAIN MENU DROPDOWN ON SCROLL IN HOME PAGE
    function hideMainWhenScroll() {
        MAIN_MENU.style.display = 'none';
        CATEGORIES_LINK.className = 'display-flex main-bckgr categories-btn-close';
        window.removeEventListener('scroll', hideMainWhenScroll);
    }

    function onMainMouseOver() {
        HEADER_SANDWICH_BUTTON.className = 'fas fa-times';
        MAIN_MENU.style.visibility = 'visible';
        CATEGORIES_LINK.className = 'display-flex main-bckgr categories-btn-open';
    }

    function onMainMouseOut() {
        MAIN_MENU.className = 'select-categories-dropdown scroll content';
        MAIN_MENU.style.visibility = 'hidden';
        HEADER_SANDWICH_BUTTON.className = 'fas fa-bars';
        CATEGORIES_LINK.className = 'display-flex main-bckgr categories-btn-close';
    }

    function onSandwichMouseOver() {
        MAIN_MENU.className = 'select-categories-dropdown scroll content';
        MAIN_MENU.style.visibility = 'visible';
        MAIN_MENU.style.display = 'flex';
        MAIN_MENU.addEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.addEventListener('mouseout', onMainMouseOut);
        HEADER_SANDWICH_BUTTON.className = 'fas fa-times';
    }

    function sandwichHeaderOn() {
        HEADER_SANDWICH_BUTTON.className = 'fas fa-bars';
        HEADER.className = 'display-flex justify-between position-relative header-scroll content';
        NAV_MENU_ONSCROLL.style.display = 'block';
        HEADER_SANDWICH_BUTTON.style.display = 'block';
        HEADER_SANDWICH_BUTTON.addEventListener('mouseover', onSandwichMouseOver);
        HEADER_SECTION.className = 'main-bckgr header-section-scroll';
        SEARCH_BAR.style.width = '490px';
        FAVOURITE_COUNTER.style.width = '18%';
        FAVOURITE_COUNTER.style.textAlign = 'center';
        CART_COUNTER.style.width = '11.5%';
        CART_COUNTER.style.textAlign = 'center';
    }

    function sandwichHeaderOff(home) {
        MAIN_MENU.removeEventListener('mouseover', onMainMouseOver);
        MAIN_MENU.removeEventListener('mouseout', onMainMouseOut);
        HEADER.className = 'display-flex justify-between position-relative header content';
        if (home) {
            CATEGORIES_LINK.className = 'display-flex main-bckgr categories-btn-open';
            MAIN_MENU.style.display = 'flex';
            MAIN_MENU.style.visibility = 'visible';
            MAIN_MENU.className = 'select-categories content';
        } else {
            MAIN_MENU.className = 'select-categories-dropdown content';
        }
        NAV_MENU_ONSCROLL.style.display = 'none';
        HEADER_SANDWICH_BUTTON.style.display = 'none';
        HEADER_SECTION.className = 'main-bckgr header-section';
        SEARCH_BAR.style.width = '558px';
        FAVOURITE_COUNTER.style.width = '13%';
        FAVOURITE_COUNTER.style.textAlign = 'left';
        CART_COUNTER.style.width = '8%';
        CART_COUNTER.style.textAlign = 'left';
    }

    let counter = 0;
    function onScroll() {
        if (document.documentElement.scrollTop >= 565 && counter === 0) {
            counter++;
            sandwichHeaderOn();
        } else if (document.documentElement.scrollTop < 565 && counter === 1) {
            counter = 0;
            if (location.hash === '#home' || !location.hash) {
                sandwichHeaderOff('home');
            } else {
                sandwichHeaderOff();
                MAIN_MENU.style.display = 'none';
            }
        }
    }

    //RATING
    function rating(itemRating, container) {
        for (let i = 0; i < 5; i++) {
            const star = utils.createNewElement('i');
            star.className = 'fas fa-star stars';
            if (itemRating > 0) {
                star.className += ' actives';
            }
            itemRating--;
            container.append(star);
        }
    }

    return {
        onFocus,
        onFocusOut,
        display,
        debounce,
        getById,
        querySelect,
        goToLoginPage,
        success,
        error,
        createNewElement,
        changePrice,
        calculateAmount,
        hideMainWhenScroll,
        sandwichHeaderOn,
        sandwichHeaderOff,
        onScroll,
        rating,
        getArticle,
        getArticles
    }
})();