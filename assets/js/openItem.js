//OPEN AN ITEM
function openItem(currentItem, currentPrice) {
    OPEN_ITEM_CONTAINER.innerHTML = '';
    OPEN_ITEM.style.display = 'block';
    let titleContainer = createNewElement('div');
    titleContainer.className = 'title-article';
    let currentTitle = createNewElement('p', currentItem.title);
    let fixedInformation = createNewElement('div');
    fixedInformation.className = 'fixed-info';
    let currentID = createNewElement('span', currentItem.id);
    let social = createNewElement('span');
    let fbBtn = createNewElement('a');
    fbBtn.className = 'fb-btn';
    fbBtn.href = '#';
    let fbIcon = createNewElement('i');
    fbIcon.className = 'fab fa-facebook-f';
    let fbTitle = createNewElement('span', 'Сподели');
    let compareBox = createNewElement('span');
    compareBox.className = 'compare-box';
    let check = createNewElement('input');
    check.type = 'checkbox';
    let text = createNewElement('span', 'Сравни');
    let mainContainer = createNewElement('div');
    mainContainer.className = 'items-main-container';
    let containerImages = createNewElement('div', 'IMAGES CONTAINER');
    containerImages.className = 'item-images';
    let containerInformation = createNewElement('div');
    containerInformation.className = 'container-info';
    let itemInformation = createNewElement('div');
    let addItemContainer = createNewElement('div');
    addItemContainer.className = 'add-item-in';
    let raitingContainer = createNewElement('div');
    let textClient = createNewElement('p', 'Оценка от клиенти:');
    let review = createNewElement('div');
    review.className = 'review';
    let addReview = createNewElement('a', 'Добави ревю');
    addReview.href = '#';
    let line = createNewElement('span', '|');
    line.className = 'lines';
    let addQuestion = createNewElement('a', 'Добави въпрос');
    addQuestion.href = '#';
    let delivery = createNewElement('div', 'Предлаган и с доставка от: eMAG');
    delivery.className = 'delivery';
    let deliveryCity = createNewElement('div', `Ще се достави в: София-град(Столична)`);
    let changeBtn = createNewElement('a', 'промени');
    changeBtn.hfre = '#';
    changeBtn.className = 'change';
    let prices = createNewElement('div');
    prices.className = 'prices';
    let total = createNewElement('span', currentPrice);
    total.className = 'total';
    let leasing = createNewElement('span');
    let leasingTitle = createNewElement('p', 'Месечни вноски');
    let btnContainer = createNewElement('div');
    let addToShoppingCart = createNewElement('div');
    addToShoppingCart.className = 'add-shopping-cart';
    let iconContainer = createNewElement('span');
    let cartIcon = createNewElement('i');
    cartIcon.className = 'fas fa-shopping-cart cart';
    let cartText = createNewElement('span', 'Добави в количката');
    cartText.className = 'cart-text';
    let addToFavourite = createNewElement('div');
    addToFavourite.className = 'add-favourite';
    let favIconContainer = createNewElement('span');
    let favIcon = createNewElement('i');
    favIcon.className = 'far fa-heart heart';
    let favText = createNewElement('span', 'Добави в любими');
    favText.className = 'fav-text';
    OPEN_ITEM_CONTAINER.append(titleContainer, mainContainer);
    titleContainer.append(currentTitle, fixedInformation);
    fixedInformation.append(currentID, social);
    social.append(fbBtn, compareBox);
    fbBtn.append(fbIcon, fbTitle);
    compareBox.append(check, text);
    mainContainer.append(containerImages, containerInformation);
    containerInformation.append(itemInformation, addItemContainer);
    itemInformation.append(raitingContainer);
    raitingContainer.append(textClient);
    for (let i = 0; i < 5; i++) {
        let star = createNewElement('i');
        star.className = 'fas fa-star stars';
        raitingContainer.append(star);
        let currentIndex;
        star.addEventListener('click', function () {
            star.className += ' active';
            currentIndex = i;
            for (let i = 0; i < RAITING_STARS.length; i++) {
                if (i <= currentIndex) {
                    RAITING_STARS[i].className += ' actives';
                }
            }
        });
    }
    raitingContainer.append(review, delivery, deliveryCity, changeBtn);
    review.append(addReview, line, addQuestion);
    addItemContainer.append(prices, btnContainer);
    prices.append(total, leasing);
    leasing.append(leasingTitle);
    btnContainer.append(addToShoppingCart, addToFavourite);
    addToShoppingCart.append(iconContainer, cartText);
    iconContainer.append(cartIcon);
    addToFavourite.append(favIconContainer, favText);
    favIconContainer.append(favIcon);
}
