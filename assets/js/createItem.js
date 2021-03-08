//TEMPLATE FOR ADDING ITEMS
class Items {
    constructor() {
        this.allItems = [];
        this.watchedItems = [];
    }

    addProduct(item) {
        this.allItems.push(item);
    }

    addWatched(item) {
        if (this.watchedItems.length === 3) {
            this.watchedItems.shift();
        }

        this.watchedItems.push(item);
    }
}

const focusSectionItems = new Items();
ALL_FOCUS_ITEMS.forEach(item => {
    focusSectionItems.addProduct(item);
});

//CREATING ITEMS
function createItemsCard(array, container) {
    container.innerHTML = '';
    array.forEach(currentItem => {
        const cardContainer = utils.createNewElement('div');
        cardContainer.className = 'items-card';
        const mainContainer = utils.createNewElement('div');
        mainContainer.className = 'fav-main-cont';
        const tooltipContainer = utils.createNewElement('div');
        tooltipContainer.className = 'tooltip';
        const addFavourite = utils.createNewElement('i');
        addFavourite.className = 'far fa-heart fav';
        const tooltipText = utils.createNewElement('div', 'Добави в любими');
        tooltipText.className = 'tooltiptext';
        let favourites;
        if (utils.isLoggedIn()) {
            favourites = utils.getUsers().filter(user => user.isLoggedIn)[0].favourites;
        } else {
            favourites = utils.getItem('guest').favourites;
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
        tooltipShoppingCardContainer.className = 'shop-tooltip';
        const tooltipShoppingCard = utils.createNewElement('div', 'Добави в количката');
        tooltipShoppingCard.className = 'tooltip-shopping-card';
        const addShoppingCard = utils.createNewElement('img');
        addShoppingCard.src = './assets/images/icons/shopping-cart.png';
        addShoppingCard.alt = 'shopping-cart-icon';
        addShoppingCard.className = 'shop-card';
        const imageContainer = utils.createNewElement('a');
        imageContainer.href = `#article/${currentItem.id}`;
        const itemImage = utils.createNewElement('img');
        itemImage.className = 'item-image';
        itemImage.src = currentItem.image;
        const sup = utils.createNewElement('sup', currentItem.currentPennies);
        const valute = utils.createNewElement('small', 'лв');
        const titleContainer = utils.createNewElement('a');
        titleContainer.href = `#article/${currentItem.id}`;
        const itemTitle = utils.createNewElement('h5', currentItem.title);
        const regular = utils.createNewElement('div');
        regular.className = 'regular-price';
        const regPrice = utils.createNewElement('strong', currentItem.regularPrice);
        regPrice.className = 'line';
        const itemPrice = utils.createNewElement('span', currentItem.currentPrice);
        const percentage = utils.calculatingPercentage(currentItem);
        const percentageBar = utils.createNewElement('div', `-${percentage}%`);
        const sale = utils.createNewElement('b', `(-${percentage}%)`);
        percentageBar.className = 'percentage';
        regular.append(regPrice);
        tooltipContainer.addEventListener('click', () => {
            // Adding to favs and render the header
            if (addFavourite.style.color === 'red') {
                utils.removeFromFav(currentItem);
                addFavourite.className = 'far fa-heart fav';
                addFavourite.style.color = '#2196f3';
                tooltipText.innerText = 'Добави в Любими';
                utils.success('Продуктът беше премахнат от любими');
            } else {
                utils.addToFav(currentItem);
                addFavourite.className = 'fas fa-heart fav';
                addFavourite.style.color = 'red';
                tooltipText.innerText = 'Добавено в Любими';
                utils.success('Продуктът беше добавен в любими');
            }

            main.renderHeader();
        });

        tooltipShoppingCardContainer.addEventListener('click', () => {
            // Adding to cart and render the header
            utils.addToCart(currentItem);
            utils.success('Продуктът беше добавен в количката');
            main.renderHeader();
        });
        const raitingContainer = utils.createNewElement('div');
        let currentRaiting = currentItem.raiting;
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
            const valute = utils.createNewElement('small', `лв `);
            valute.className = 'line';
            regular.append(sub, valute, sale);
        } else {
            regular.innerHTML = '-';
            regular.style.visibility = 'hidden';
            percentageBar.style.display = 'none';
        }

        titleContainer.addEventListener('click', () => {
            watchedItem(focusSectionItems.watchedItems, currentItem);
            openItem(currentItem);
        });

        imageContainer.addEventListener('click', () => {
            watchedItem(focusSectionItems.watchedItems, currentItem);
            openItem(currentItem);
        });
    });
}
//ITEMS IN FOCUS-BAR SECTION
createItemsCard(focusSectionItems.allItems, CARDS_CONTAINER);
//ITEMS IN OTHER-CLIENTS-WATCHED
const otherWatched = new Items();
OTHER_CLIENTS_WATCHED.forEach(item => {
    otherWatched.addProduct(item);
});

function watchedItem(array, currentItem) {
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

    DELETE_WATCHED.addEventListener('click', () => {
        let counterLoader = 0;
        const intervalLoader = setInterval(() => {
            counterLoader++;
            WATCHED_CONTAINER.style.opacity = '0.3';
            ANIMATION_HISTORY.className = 'loader';
            if (counterLoader >= 3) {
                window.clearInterval(intervalLoader);
                ANIMATION_HISTORY.style.display = 'none';
                WATCHED_CONTAINER.style.display = 'none';
            }
        }, 800);
    });
}

createItemsCard(otherWatched.allItems, OTHER_WATCHED_CONTAINER);
const ITEMS_IN_CATEGORY_PAGE = [...otherWatched.allItems, ...focusSectionItems.allItems];
createItemsCard(ITEMS_IN_CATEGORY_PAGE, ALL_ITEMS_CONTAINER);
