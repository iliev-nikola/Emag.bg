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
let focusSectionItems = new Items();
ALL_FOCUS_ITEMS.forEach(function (item) {
    focusSectionItems.addProduct(item);
});
//CREATING ITEMS
function createItemsCard(array, container) {
    container.innerHTML = '';
    array.forEach(function (currentItem) {
        let cardContainer = createNewElement('div');
        cardContainer.className = 'items-card';
        let tooltipContainer = createNewElement('div');
        tooltipContainer.className = 'tooltip';
        let addFavourite = createNewElement('i');
        addFavourite.className = 'far fa-heart fav';
        let tooltipText = createNewElement('div', 'Добави в Любими');
        tooltipText.className = 'tooltiptext';
        let addShoppingCard = createNewElement('i');
        addShoppingCard.className = 'fas fa-shopping-cart shop-card';
        let imageContainer = createNewElement('a');
        imageContainer.href = '#image';
        let itemImage = createNewElement('img');
        itemImage.src = currentItem.image;
        let sup = createNewElement('sup', '99');
        let valute = createNewElement('small', 'лв');
        let titleContainer = createNewElement('a');
        titleContainer.href = '#title';
        let itemTitle = createNewElement('h5', currentItem.title);
        let regular = createNewElement('div');
        regular.className = 'regular-price';
        let regPrice = createNewElement('strong', currentItem.regularPrice);
        regPrice.className = 'line';
        let itemPrice = createNewElement('span', currentItem.currentPrice);
        let percentage = Math.floor(100 - 100 * (currentItem.currentPrice / currentItem.regularPrice));
        let percentageBar = createNewElement('div', `-${percentage}%`);
        let sale = createNewElement('b', `(-${percentage}%)`);
        percentageBar.className = 'percentage';
        regular.append(regPrice);
        tooltipContainer.addEventListener("click", function () {
            addFavourite.className = 'fas fa-heart fav';
            addFavourite.style.color = "red";
            if (addFavourite.style.color === 'red') {
                tooltipText.innerText = 'Добавено в Любими';
            }
        });
        itemPrice.append(sup, valute);
        container.append(cardContainer);
        imageContainer.append(itemImage);
        titleContainer.append(itemTitle);
        cardContainer.append(imageContainer, titleContainer, itemPrice, addShoppingCard, percentageBar, regular, tooltipContainer);
        tooltipContainer.append(tooltipText, addFavourite);
        if (currentItem.regularPrice === '-') {
            regular.style.visibility = 'hidden';
            percentageBar.style.display = 'none';
        } else {
            let sup = createNewElement('sub', '99');
            sup.style.textDecoration = 'line-through';
            let valute = createNewElement('small', `лв `);
            valute.className = 'line';
            regular.append(sup, valute, sale);
        }

        //ADDING ITEMS IN HISTORY SECTION
        function watchedItem(array) {
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
            array.forEach(function (item) {
                let mainContainer = createNewElement('div');
                let watchedImage = createNewElement('img');
                watchedImage.className = 'watched-images';
                watchedImage.src = item;
                WATCHED_ITEMS.append(mainContainer);
                mainContainer.append(watchedImage);
            });
        }

        titleContainer.addEventListener('click', function () {
            watchedItem(focusSectionItems.watchedItems);
            openItem();

        });
        imageContainer.addEventListener('click', function () {
            watchedItem(focusSectionItems.watchedItems);
            openItem();
        });

        //DELETE ITEMS FROM HISTORY SECTION
        DELETE_WATCHED.addEventListener('click', function () {
            let counterLoader = 0;
            let intervalLoader = setInterval(function () {
                counterLoader++;
                WATCHED_CONTAINER.style.opacity = '0.3';
                ANIMATION_HISTORY.className = 'loader';
                if (counterLoader === 3) {
                    window.clearInterval(intervalLoader);
                    ANIMATION_HISTORY.style.display = 'none';
                    WATCHED_CONTAINER.style.display = 'none';
                }
            }, 800);
        });
    });
}
//ITEMS IN FOCUS-BAR SECTION
createItemsCard(focusSectionItems.allItems, CARDS_CONTAINER);
//ITEMS IN OTHER-CLIENTS-WATCHED
let otherWatched = new Items();
OTHER_CLIENTS_WATCHED.forEach(function (item) {
    otherWatched.addProduct(item);
});
createItemsCard(otherWatched.allItems, OTHER_WATCHED_CONTAINER);