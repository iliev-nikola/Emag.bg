//CREATING ITEMS
function createItemsCard(array, container) {
    container.innerHTML = '';
    array.forEach(currentItem => {
        const cardContainer = utils.createNewElement('div');
        cardContainer.className = 'position-relative main-bckgr items-card main-align displ-inl-bl fs-10';
        const mainContainer = utils.createNewElement('div');
        mainContainer.className = 'fav-main-cont';
        const tooltipContainer = utils.createNewElement('div');
        tooltipContainer.className = 'position-absolute cursor tooltip';
        const addFavourite = utils.createNewElement('i');
        addFavourite.className = 'far fa-heart fav';
        const tooltipText = utils.createNewElement('div', 'Добави в любими');
        tooltipText.className = 'color-white position-absolute display-flex tooltiptext main-align';

        const isInFav = userModel.getFavourites().some(el => el.id === currentItem.id);
        if (!isInFav) {
            addFavourite.className = 'far fa-heart fav';
            addFavourite.style.color = '#2196f3';
            tooltipText.innerText = 'Добави в Любими';
        } else {
            addFavourite.className = 'fas fa-heart fav';
            addFavourite.style.color = 'red';
            tooltipText.innerText = 'Добавено в Любими';
        }
        const currentPr = currentItem.currentPrice.split('.');
        const tooltipShoppingCardContainer = utils.createNewElement('div');
        tooltipShoppingCardContainer.className = 'cursor shop-tooltip';
        const tooltipShoppingCard = utils.createNewElement('div', 'Добави в количката');
        tooltipShoppingCard.className = 'color-white position-absolute display-flex fs-11 tooltip-shopping-card main-align';
        const addShoppingCard = utils.createNewElement('img');
        addShoppingCard.src = './assets/images/icons/shopping-cart.png';
        addShoppingCard.alt = 'shopping-cart-icon';
        addShoppingCard.className = 'position-absolute cursor shop-card';
        const imageContainer = utils.createNewElement('a');
        imageContainer.href = `#article/${currentItem.id}`;
        const itemImage = utils.createNewElement('img');
        itemImage.className = 'mb-20 item-image';
        itemImage.src = currentItem.image;
        const sup = utils.createNewElement('sup', currentPr[1]);
        sup.className = 'position-absolute fs-10';
        const valute = utils.createNewElement('small', 'лв');
        const titleContainer = utils.createNewElement('a');
        titleContainer.href = `#article/${currentItem.id}`;
        const itemTitle = utils.createNewElement('h5', currentItem.title);
        itemTitle.className = 'fw-600';
        const regular = utils.createNewElement('div');
        regular.className = 'main-bckgr mb-10 regular-price fs-12';
        const regPrice = utils.createNewElement('strong');
        regPrice.className = 'main-bckgr line';
        const itemPrice = utils.createNewElement('span', currentPr[0]);
        itemPrice.className = 'fw-600 position-absolute';
        // const percentage = utils.calculatingPercentage(currentItem);
        const percentageBar = utils.createNewElement('div');
        if (currentItem.discount !== 0) {
            percentageBar.innerHTML = `-${currentItem.discount}%`;
        }
        const sale = utils.createNewElement('b', `(-${currentItem.discount}%)`);
        percentageBar.className = 'position-absolute display-flex fw-400 fs-13 color-white percentage rounded-3';
        regular.append(regPrice);
        tooltipContainer.addEventListener('click', () => {
            // Adding to favs and render the header
            if (addFavourite.style.color === 'red') {
                userModel.removeFromFav(currentItem.id);
                addFavourite.className = 'far fa-heart fav';
                addFavourite.style.color = '#2196f3';
                tooltipText.innerText = 'Добави в Любими';
                utils.success('Продуктът беше премахнат от любими');
            } else {
                userModel.addToFav(currentItem.id);
                addFavourite.className = 'fas fa-heart fav';
                addFavourite.style.color = 'red';
                tooltipText.innerText = 'Добавено в Любими';
                utils.success('Продуктът беше добавен в любими');
            }

            renderHeader();
        });

        tooltipShoppingCardContainer.addEventListener('click', () => {
            // Adding to cart and render the header
            userModel.addToCart(currentItem.id);
            renderHeader();
        });

        const ratingContainer = utils.createNewElement('div');
        let currentRating = currentItem.rating;
        utils.rating(currentRating, ratingContainer);
        itemPrice.append(sup, valute);
        container.append(cardContainer);
        imageContainer.append(itemImage);
        titleContainer.append(itemTitle);
        cardContainer.append(imageContainer, titleContainer, ratingContainer, itemPrice, addShoppingCard, percentageBar, regular, tooltipContainer, tooltipShoppingCardContainer);
        tooltipShoppingCardContainer.append(tooltipShoppingCard, addShoppingCard);
        tooltipContainer.append(tooltipText, addFavourite);
        if (currentItem.regularPrice) {
            const sub = utils.createNewElement('sub');
            let regularPr = currentItem.regularPrice;
            regularPr = regularPr.split('.');
            regPrice.innerHTML = regularPr[0];
            sub.innerHTML = regularPr[1];
            sub.style.textDecoration = 'line-through';
            sub.className = 'position-absolute';
            const valute = utils.createNewElement('small', `лв `);
            valute.className = 'main-bckgr line';
            regular.append(sub, valute, sale);
        } else {
            regular.innerHTML = '-';
            regular.style.visibility = 'hidden';
            percentageBar.style.display = 'none';
        }

        titleContainer.addEventListener('click', () => {
            userModel.watchItem(currentItem.id);
            watchedItem(userModel.getWatched(), currentItem);
            openItem(currentItem);
        });
        imageContainer.addEventListener('click', () => {
            userModel.watchItem(currentItem.id);
            watchedItem(userModel.getWatched(), currentItem);
            openItem(currentItem);
        });
    });
}

//ITEMS IN FOCUS-BAR SECTION
createItemsCard(ALL_FOCUS_ITEMS, CARDS_CONTAINER);

//ITEMS IN OTHER-CLIENTS-WATCHED
function watchedItem(array, currentItem) {
    array = array.map(el => el.image);
    WATCHED_CONTAINER.style.display = 'block';
    WATCHED_ITEMS.innerHTML = '';
    if (array.length === 12) {
        array.pop();
        array.unshift(currentItem.image);
    } else {
        array.push(currentItem.image);
    }

    array = new Set(array);
    array = Array.from(array);
    array.forEach((item, index) => {
        const mainContainer = utils.createNewElement('div');
        const hrefContainer = utils.createNewElement('a');
        const findIdPattern = /\d+/g;
        const id = +item.match(findIdPattern)[0];
        hrefContainer.href = `#article/${id}`;
        const watchedImage = utils.createNewElement('img');
        watchedImage.className = 'watched-images';
        if (index === 0) {
            mainContainer.style.border = '2px solid rgb(0, 94, 184)';
        }

        watchedImage.src = item;
        hrefContainer.append(watchedImage)
        mainContainer.append(hrefContainer);
        WATCHED_ITEMS.append(mainContainer);
    });
}

createItemsCard(OTHER_CLIENTS_WATCHED, OTHER_WATCHED_CONTAINER);
createItemsCard(ALL_ARTICLES, ALL_ITEMS_CONTAINER);