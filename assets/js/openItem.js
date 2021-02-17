//OPEN AN ITEM
function openItem(currentItem, currentPrice) {
    OPEN_ITEM_CONTAINER.innerHTML = '';
    OPEN_ITEM.style.display = 'block';
    const titleContainer = createNewElement('div');
    titleContainer.className = 'title-article';
    const currentTitle = createNewElement('p', currentItem.title);
    const fixedInformation = createNewElement('div');
    fixedInformation.className = 'fixed-info';
    const currentID = createNewElement('span', currentItem.id);
    const social = createNewElement('span');
    const fbBtn = createNewElement('a');
    fbBtn.className = 'fb-btn';
    fbBtn.href = '#';
    const fbIcon = createNewElement('i');
    fbIcon.className = 'fab fa-facebook-f';
    const fbTitle = createNewElement('span', 'Сподели');
    const compareBox = createNewElement('span');
    compareBox.className = 'compare-box';
    const check = createNewElement('input');
    check.type = 'checkbox';
    const text = createNewElement('span', 'Сравни');
    const mainContainer = createNewElement('div');
    mainContainer.className = 'items-main-container';
    const containerImages = createNewElement('div', 'IMAGES CONTAINER');
    containerImages.className = 'item-images';
    const containerInformation = createNewElement('div');
    containerInformation.className = 'container-info';
    const itemInformation = createNewElement('div');
    const addItemContainer = createNewElement('div');
    addItemContainer.className = 'add-item-in';
    const raitingContainer = createNewElement('div');
    const textClient = createNewElement('p', 'Оценка от клиенти:');
    const review = createNewElement('div');
    review.className = 'review';
    const addReview = createNewElement('a', 'Добави ревю');
    addReview.href = '#';
    const line = createNewElement('span', '|');
    line.className = 'lines';
    const addQuestion = createNewElement('a', 'Добави въпрос');
    addQuestion.href = '#';
    const delivery = createNewElement('div', 'Предлаган и с доставка от: eMAG');
    delivery.className = 'delivery';
    const deliveryCity = createNewElement('div', `Ще се достави в: София-град(Столична)`);
    const changeBtn = createNewElement('a', 'промени');
    changeBtn.hfre = '#';
    changeBtn.className = 'change';
    const prices = createNewElement('div');
    prices.className = 'prices';
    const total = createNewElement('span', currentPrice);
    total.className = 'total';
    const leasing = createNewElement('span');
    const leasingTitle = createNewElement('p', 'Месечни вноски');
    const btnContainer = createNewElement('div');
    const addToShoppingCart = createNewElement('div');
    addToShoppingCart.className = 'add-shopping-cart';
    const iconContainer = createNewElement('span');
    const cartIcon = createNewElement('i');
    cartIcon.className = 'fas fa-shopping-cart cart';
    const cartText = createNewElement('span', 'Добави в количката');
    cartText.className = 'cart-text';
    const addToFavourite = createNewElement('div');
    addToFavourite.className = 'add-favourite';
    const favIconContainer = createNewElement('span');
    const favIcon = createNewElement('i');
    favIcon.className = 'far fa-heart heart';
    const favText = createNewElement('span', 'Добави в любими');
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
        const star = createNewElement('i');
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
