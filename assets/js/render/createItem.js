//CREATING ITEMS
function createItemsCard(array, container) {
    container.innerHTML = '';
    array.forEach(currentItem => {
        const cardContainer = utils.createNewElement('div');
        cardContainer.className = 'position-relative main-bckgr items-card main-align displ-inl-bl';
        const mainContainer = utils.createNewElement('div');
        mainContainer.className = 'fav-main-cont';
        const tooltipContainer = utils.createNewElement('div');
        tooltipContainer.className = 'position-absolute cursor tooltip';
        const addFavourite = utils.createNewElement('i');
        addFavourite.className = 'far fa-heart fav';
        const tooltipText = utils.createNewElement('div', 'Добави в любими');
        tooltipText.className = 'color-white position-absolute display-flex tooltiptext main-align';
        let favourites;
        if (userModel.isLoggedIn()) {
            favourites = userModel.getUsers().filter(user => user.isLoggedIn)[0].favourites;
        } else {
            favourites = userModel.getItem('guest').favourites;
        }

        const isInFav = favourites.some(el => el.id === currentItem.id);
        if (!isInFav) {
            addFavourite.className = 'far fa-heart fav';
            addFavourite.style.color = '#2196f3';
            tooltipText.innerText = 'Добави в Любими';
        } else {
            addFavourite.className = 'fas fa-heart fav';
            addFavourite.style.color = 'red';
            tooltipText.innerText = 'Добавено в Любими';
        }

        const tooltipShoppingCardContainer = utils.createNewElement('div');
        tooltipShoppingCardContainer.className = 'cursor shop-tooltip';
        const tooltipShoppingCard = utils.createNewElement('div', 'Добави в количката');
        tooltipShoppingCard.className = 'color-white position-absolute display-flex tooltip-shopping-card main-align';
        const addShoppingCard = utils.createNewElement('img');
        addShoppingCard.src = './assets/images/icons/shopping-cart.png';
        addShoppingCard.alt = 'shopping-cart-icon';
        addShoppingCard.className = 'position-absolute cursor shop-card';
        const imageContainer = utils.createNewElement('a');
        imageContainer.href = `#article/${currentItem.id}`;
        const itemImage = utils.createNewElement('img');
        itemImage.className = 'mb-20 item-image';
        itemImage.src = currentItem.image;
        const sup = utils.createNewElement('sup', currentItem.currentPennies);
        sup.className = 'position-absolute';
        const valute = utils.createNewElement('small', 'лв');
        const titleContainer = utils.createNewElement('a');
        titleContainer.href = `#article/${currentItem.id}`;
        const itemTitle = utils.createNewElement('h5', currentItem.title);
        itemTitle.className = 'fw-600';
        const regular = utils.createNewElement('div');
        regular.className = 'main-bckgr mb-10 regular-price';
        const regPrice = utils.createNewElement('strong', currentItem.regularPrice);
        regPrice.className = 'main-bckgr line';
        const itemPrice = utils.createNewElement('span', currentItem.currentPrice);
        itemPrice.className = 'fw-600 position-absolute';
        const percentage = utils.calculatingPercentage(currentItem);
        const percentageBar = utils.createNewElement('div', `-${percentage}%`);
        const sale = utils.createNewElement('b', `(-${percentage}%)`);
        percentageBar.className = 'position-absolute display-flex fw-400 fs-13 color-white percentage rounded-3';
        regular.append(regPrice);
        tooltipContainer.addEventListener('click', () => {
            // Adding to favs and render the header
            if (addFavourite.style.color === 'red') {
                userModel.removeFromFav(currentItem);
                addFavourite.className = 'far fa-heart fav';
                addFavourite.style.color = '#2196f3';
                tooltipText.innerText = 'Добави в Любими';
                utils.success('Продуктът беше премахнат от любими');
            } else {
                userModel.addToFav(currentItem);
                addFavourite.className = 'fas fa-heart fav';
                addFavourite.style.color = 'red';
                tooltipText.innerText = 'Добавено в Любими';
                utils.success('Продуктът беше добавен в любими');
            }

            renderHeader();
        });

        tooltipShoppingCardContainer.addEventListener('click', () => {
            // Adding to cart and render the header
            userModel.addToCart(currentItem);
            renderHeader();
        });

        const raitingContainer = utils.createNewElement('div');
        let currentRaiting = currentItem.rating;
        utils.rating(currentRaiting, raitingContainer);
        itemPrice.append(sup, valute);
        container.append(cardContainer);
        imageContainer.append(itemImage);
        titleContainer.append(itemTitle);
        cardContainer.append(imageContainer, titleContainer, raitingContainer, itemPrice, addShoppingCard, percentageBar, regular, tooltipContainer, tooltipShoppingCardContainer);
        tooltipShoppingCardContainer.append(tooltipShoppingCard, addShoppingCard);
        tooltipContainer.append(tooltipText, addFavourite);
        if (currentItem.regularPrice) {
            const sub = utils.createNewElement('sub', currentItem.regularPennies);
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
            userModel.watchItem(currentItem);
            watchedItem(userModel.getWatched(), currentItem);
            openItem(currentItem);
        });
        imageContainer.addEventListener('click', () => {
            userModel.watchItem(currentItem);
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
const ITEMS_IN_CATEGORY_PAGE = [...OTHER_CLIENTS_WATCHED, ...ALL_FOCUS_ITEMS];
createItemsCard(ITEMS_IN_CATEGORY_PAGE, ALL_ITEMS_CONTAINER);