function renderFavAndCart(favourites, cart) {
    if (favourites.length) {
        FAVOURITE_COUNTER.innerText = favourites.length;
        FAVOURITE_COUNTER.style.display = 'block';
        FAVOURITE_NAV_CONTAINER.style.padding = '0';
        FAVOURITE_NAV_CONTAINER.style.width = '300px';
        FAVOURITE_NAV_CONTAINER.innerHTML = '';
        const soonAddedText = utils.createNewElement('p', 'НАСКОРО ДОБАВЕНИ');
        soonAddedText.className = 'soon-added-text';
        FAVOURITE_NAV_CONTAINER.append(soonAddedText);
        favourites.forEach(el => {
            const articleDiv = utils.createNewElement('div');
            articleDiv.className = 'nav-dropdown-item';
            const img = utils.createNewElement('img');
            img.src = el.image;
            img.className = 'nav-dropdown-img';
            const title = utils.createNewElement('a', el.title);
            title.href = `#article/${el.id}`;
            title.className = 'nav-dropdown-title';
            const percentage = Math.floor(100 - 100 * (el.currentPrice / el.regularPrice));
            title.addEventListener('click', () => {
                watchedItem(focusSectionItems.watchedItems);
                openItem(el);
            });

            img.addEventListener('click', () => {
                watchedItem(focusSectionItems.watchedItems);
                openItem(el);
            });

            const price = utils.createNewElement('p');
            price.innerHTML = `${el.currentPrice}<sup>${el.currentPennies}</sup>лв.`;
            price.className = 'nav-dropdown-price';
            const hiddenOptions = utils.createNewElement('div');
            const addToCartText = utils.createNewElement('p');
            addToCartText.innerHTML = '<i class="fas fa-shopping-cart"></i>Добави в количката';
            addToCartText.addEventListener('click', () => {
                utils.addToCart(el);
                main.renderHeader();
            });
            const closeButton = utils.createNewElement('i');
            closeButton.className = 'fas fa-times nav-close-button';
            closeButton.addEventListener('click', () => {
                utils.removeFromFav(el);
                main.renderHeader();
            });

            hiddenOptions.append(addToCartText, closeButton);
            hiddenOptions.className = 'hidden-options';
            articleDiv.append(img, title, price, hiddenOptions);
            FAVOURITE_NAV_CONTAINER.append(articleDiv);
        });

        const goToFavsDiv = utils.createNewElement('div');
        const goToFavsText = utils.createNewElement('a', '>> Виж всички любими продукти');
        goToFavsText.href = '#favourites';
        goToFavsDiv.className = 'go-to-favs';
        goToFavsDiv.append(goToFavsText);
        FAVOURITE_NAV_CONTAINER.append(goToFavsDiv);
    } else {
        FAVOURITE_NAV_CONTAINER.style.padding = '10px';
        FAVOURITE_NAV_CONTAINER.innerHTML = '<p>Нямаш любими продукти</p>';
        FAVOURITE_NAV_CONTAINER.style.width = '180px';
        FAVOURITE_COUNTER.style.display = 'none';
    }

    if (cart.length) {
        let count = cart.reduce((acc, curr) => acc + +curr.count, 0);
        CART_COUNTER.innerText = count;
        CART_COUNTER.style.display = 'block';
        SHOPPING_CART_NAV.style.padding = '0';
        SHOPPING_CART_NAV.style.width = '300px';
        CART_NAV_CONTAINER.innerHTML = '';
        const soonAddedText = utils.createNewElement('p', 'НАСКОРО ДОБАВЕНИ');
        soonAddedText.className = 'soon-added-text';
        CART_NAV_CONTAINER.append(soonAddedText);
        let totalPrice = 0;
        cart.forEach(el => {
            const articleDiv = utils.createNewElement('div');
            articleDiv.className = 'nav-dropdown-item';
            const img = utils.createNewElement('img');
            img.src = el.image;
            img.className = 'nav-dropdown-img';
            const title = utils.createNewElement('a', el.title);
            title.href = `#article/${el.id}`;
            title.className = 'nav-dropdown-title';
            const percentage = Math.floor(100 - 100 * (el.currentPrice / el.regularPrice));
            title.addEventListener('click', () => {
                watchedItem(focusSectionItems.watchedItems);
                openItem(el, percentage);
            });

            img.addEventListener('click', () => {
                watchedItem(focusSectionItems.watchedItems);
                openItem(el, percentage);
            });

            const count = utils.createNewElement('p', 'x' + el.count);
            count.className = 'cart-items-count';
            const price = utils.createNewElement('p');
            price.innerHTML = `${el.currentPrice}<sup>${el.currentPennies}</sup>лв.`;
            price.className = 'nav-dropdown-price';
            const hiddenOptions = utils.createNewElement('div');
            const closeButton = utils.createNewElement('i');
            closeButton.className = 'fas fa-times nav-close-button';
            closeButton.addEventListener('click', () => {
                utils.removeFromCart(el);
                main.renderHeader();
            });
            hiddenOptions.append(closeButton);
            hiddenOptions.className = 'hidden-options';
            articleDiv.append(img, title, count, price, hiddenOptions);
            CART_NAV_CONTAINER.append(articleDiv);
            totalPrice += eval(`${el.currentPrice}.${el.currentPennies}`);
        });

        const totalText = utils.createNewElement('div');
        totalText.className = 'total-cart-text';
        const span = utils.createNewElement('span', 'ОБЩО:');
        const p = utils.createNewElement('p', `${cart.length} ${cart.length > 1 ? 'продукти' : 'продукт'}`);
        const price = utils.createNewElement('span', totalPrice + 'лв.');
        totalText.append(span, p, price);
        CART_NAV_CONTAINER.append(totalText);
    } else {
        CART_NAV_CONTAINER.innerHTML = '<p>Нямаш нито един продукт в количката</p>';
        CART_NAV_CONTAINER.style.width = '230px';
        CART_COUNTER.style.display = 'none';
    }
}