//CREATE NEW HTML ELEMENT
function createNewElement(type, text) {
    let element = document.createElement(type);
    if (text) {
        element.innerText = text;
    }
    return element;
}
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
allFocusItems.forEach(function (item) {
    focusSectionItems.addProduct(item);
});
//CREATING ITEMS
let cardsContainer = document.getElementById('cards-container');
let watchedItems = document.getElementById('watched-items');
function createItemsCard(array, container) {
    container.innerHTML = '';
    array.forEach(function (currentItem) {
        let cardContainer = createNewElement('div');
        cardContainer.className = 'items-card';
        let addFavourite = createNewElement('i');
        addFavourite.className = 'far fa-heart fav';
        let addShoppingCard = createNewElement('i');
        addShoppingCard.className = 'fas fa-shopping-cart shop-card';
        let imageContainer = createNewElement('a');
        imageContainer.href = '#';
        let itemImage = createNewElement('img');
        itemImage.src = currentItem.image;
        let sup = createNewElement('sup', '99');
        let valute = createNewElement('small', 'лв');
        let titleContainer = createNewElement('a');
        titleContainer.href = '#';
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
        addFavourite.addEventListener("click", function () {
            addFavourite.className = 'fas fa-heart fav';
            addFavourite.style.color = "red";
        });
        itemPrice.append(sup, valute);
        container.append(cardContainer);
        imageContainer.append(itemImage);
        titleContainer.append(itemTitle);
        cardContainer.append(imageContainer, titleContainer, itemPrice, addFavourite, addShoppingCard, percentageBar, regular);
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

        let watchedContainer = document.getElementById('history-section');
        //ADDING ITEMS IN HISTORY SECTION
        function watchedItem(array) {
            watchedContainer.style.display = 'block';
            watchedItems.innerHTML = '';
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
                watchedItems.append(mainContainer);
                mainContainer.append(watchedImage);
            });
        }

        titleContainer.addEventListener('click', function () {
            watchedItem(focusSectionItems.watchedItems);
        });
        imageContainer.addEventListener('click', function () {
            watchedItem(focusSectionItems.watchedItems);
        });
        //DELETE ITEMS FROM HISTORY SECTION
        let deleteWatched = document.getElementById('delete-watched');
        deleteWatched.addEventListener('click', function () {
            let counterLoader = 0;
            let intervalLoader = setInterval(function () {
                counterLoader++;
                watchedContainer.style.opacity = '0.1';
                let animationHistory = document.getElementById('animation-history')
                animationHistory.className = 'loader';
                if (counterLoader === 2) {
                    window.clearInterval(intervalLoader);
                    animationHistory.style.display = 'none';
                    watchedContainer.style.display = 'none';
                }
            }, 800);
        });
    });
}
//ITEMS IN FOCUS-BAR SECTION
createItemsCard(focusSectionItems.allItems, cardsContainer);
//ITEMS IN OTHER-CLIENTS-WATCHED
let otherWatched = new Items();
otherClientsWatched.forEach(function (item) {
    otherWatched.addProduct(item);
});
let otherWatchedContainer = document.getElementById('other-watched-container');
createItemsCard(otherWatched.allItems, otherWatchedContainer);