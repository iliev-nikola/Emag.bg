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
    }
    addProduct(item) {
        this.allItems.push(item);
    }
}
let focusSectionItems = new Items();
allFocusItems.forEach(function (item) {
    focusSectionItems.addProduct(item);
})
//CREATING ITEMS
let cardsContainer = document.getElementById('cards-container');
function createItemsCard(array, container) {
    container.innerHTML = '';
    array.forEach(function (currenItem) {
        let cardContainer = createNewElement('div');
        cardContainer.className = 'items-card';
        let addFavourite = createNewElement('i');
        addFavourite.className = 'far fa-heart fav';
        let addShoppingCard = createNewElement('i');
        addShoppingCard.className = 'fas fa-shopping-cart shop-card';
        let imageContainer = createNewElement('a');
        imageContainer.href = '#';
        let itemImage = createNewElement('img');
        itemImage.src = currenItem.image;
        let sup = createNewElement('sup', '99');
        let valute = createNewElement('small', 'лв');
        let titleContainer = createNewElement('a');
        titleContainer.href = '#';
        let itemTitle = createNewElement('h5', currenItem.title);
        let regular = createNewElement('div');
        regular.className = 'regular-price';
        let regPrice = createNewElement('strong', currenItem.regularPrice);
        let itemPrice = createNewElement('span', currenItem.currentPrice);
        let percentage = Math.floor(100 - 100 * (currenItem.currentPrice / currenItem.regularPrice));
        let percentageBar = createNewElement('div', `-${percentage}%`);
        let sale = createNewElement('b', `(-${percentage}%)`);
        percentageBar.className = 'percentage';
        regular.append(regPrice);
        addFavourite.addEventListener("click", function () {
            addFavourite.className = 'fas fa-heart fav';
            addFavourite.style.color = "red";
        })
        itemPrice.append(sup, valute);
        container.append(cardContainer);
        imageContainer.append(itemImage);
        titleContainer.append(itemTitle);
        cardContainer.append(imageContainer, titleContainer, itemPrice, addFavourite, addShoppingCard, percentageBar, regular);
        if (currenItem.regularPrice === '-') {
            regular.style.visibility = 'hidden';
            percentageBar.style.display = 'none';
        } else {
            let sup = createNewElement('sub', '99');
            let valute = createNewElement('small', `лв `);
            regular.append(sup, valute, sale);
        }
    });
}
//ITEMS IN FOCUS-BAR SECTION
createItemsCard(focusSectionItems.allItems, cardsContainer);