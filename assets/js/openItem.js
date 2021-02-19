//OPEN AN ITEM
function openItem(currentItem, percentage) {
    OPEN_ITEM_CONTAINER.innerHTML = '';
    OPEN_ITEM.style.display = 'block';
    const titleContainer = utils.createNewElement('div');
    titleContainer.className = 'title-article';
    const currentTitle = utils.createNewElement('p', currentItem.title);
    const fixedInformation = utils.createNewElement('div');
    fixedInformation.className = 'fixed-info';
    const currentID = utils.createNewElement('span', currentItem.id);
    const social = utils.createNewElement('span');
    const fbBtn = utils.createNewElement('a');
    fbBtn.className = 'fb-btn';
    fbBtn.href = '#';
    const fbIcon = utils.createNewElement('i');
    fbIcon.className = 'fab fa-facebook-f';
    const fbTitle = utils.createNewElement('span', 'Сподели');
    const compareBox = utils.createNewElement('span');
    compareBox.className = 'compare-box';
    const check = utils.createNewElement('input');
    check.type = 'checkbox';
    const text = utils.createNewElement('span', 'Сравни');
    const mainContainer = utils.createNewElement('div');
    mainContainer.className = 'items-main-container';
    const containerImages = utils.createNewElement('div');
    let mainImage = utils.createNewElement('img');
    mainImage.src = currentItem.image;
    mainImage.className = 'main-image-item';
    containerImages.className = 'item-images';
    let allImgs = utils.createNewElement('div');
    if (currentItem.allImages) {
        for (let i = 0; i < currentItem.allImages.length; i++) {
            let image = utils.createNewElement('img');
            image.className = 'images-item';
            image.src = currentItem.allImages[i];
            allImgs.append(image);
            image.addEventListener('mouseover', () => {
                mainImage.src = currentItem.allImages[i];
            });
        }
    }

    const containerInformation = utils.createNewElement('div');
    containerInformation.className = 'container-info';
    const itemInformation = utils.createNewElement('div');
    const addItemContainer = utils.createNewElement('div');
    addItemContainer.className = 'add-item-in';
    const raitingContainer = utils.createNewElement('div');
    const textClient = utils.createNewElement('p', 'Оценка от клиенти:');
    const review = utils.createNewElement('div');
    review.className = 'review';
    const addReview = utils.createNewElement('a', 'Добави ревю');
    addReview.href = '#';
    const line = utils.createNewElement('span', '|');
    line.className = 'lines';
    const addQuestion = utils.createNewElement('a', 'Добави въпрос');
    addQuestion.href = '#';
    const delivery = utils.createNewElement('div', 'Предлаган и с доставка от: eMAG');
    delivery.className = 'delivery';
    const deliveryCity = utils.createNewElement('div', `Ще се достави в: София-град(Столична)`);
    const changeBtn = utils.createNewElement('a', 'промени');
    changeBtn.hfre = '#';
    changeBtn.className = 'change';
    const prices_container = utils.createNewElement('div');
    prices_container.className = 'prices-container';
    const prices = utils.createNewElement('div');
    prices.className = 'prices';
    const regularContainer = utils.createNewElement('div');
    regularContainer.className = 'regular-container-item';
    if (currentItem.regularPrice !== '-') {
        const regularPrice = utils.createNewElement('span', currentItem.regularPrice)
        regularPrice.className = 'regular-price-item';
        const regularPennies = utils.createNewElement('sup', currentItem.regularPennies);
        regularPennies.className = 'regular-pennies-item';
        const lv = utils.createNewElement('span', 'лв.')
        lv.className = 'lv';
        const sale = utils.createNewElement('span', `(-${percentage}%)`);
        sale.className = 'item-sale';
        regularContainer.append(regularPrice, regularPennies, lv, sale);
    }

    const totalContainer = utils.createNewElement('div');
    totalContainer.className = 'total-container';
    const currentPrice = utils.createNewElement('span', currentItem.currentPrice)
    currentPrice.className = 'current-price-item';
    const currentPennies = utils.createNewElement('sup', currentItem.currentPennies);
    currentPennies.className = 'current-pennies-item';
    const lv = utils.createNewElement('span', 'лв.')
    lv.className = 'lv-item';
    totalContainer.append(currentPrice, currentPennies, lv);
    const leasing = utils.createNewElement('span');
    const leasingTitle = utils.createNewElement('p', 'Месечни вноски');
    const btnContainer = utils.createNewElement('div');
    const addToShoppingCart = utils.createNewElement('div');
    addToShoppingCart.className = 'add-shopping-cart';
    const iconContainer = utils.createNewElement('span');
    const cartIcon = utils.createNewElement('i');
    cartIcon.className = 'fas fa-shopping-cart cart';
    const cartText = utils.createNewElement('span', 'Добави в количката');
    cartText.className = 'cart-text';
    const addToFavourite = utils.createNewElement('div');
    addToFavourite.className = 'add-favourite';
    const favIconContainer = utils.createNewElement('span');
    const favIcon = utils.createNewElement('i');
    favIcon.className = 'far fa-heart heart';
    const favText = utils.createNewElement('span', 'Добави в любими');
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
        const star = utils.createNewElement('i');
        star.className = 'fas fa-star stars';
        raitingContainer.append(star);
        let currentIndex;
        star.addEventListener('click', () => {
            currentIndex = i;
            for (let i = 0; i < RAITING_STARS.length; i++) {
                if (i <= currentIndex) {
                    RAITING_STARS[i].classList.remove('inactives');
                    RAITING_STARS[i].classList.add('actives');
                } else {
                    RAITING_STARS[i].classList.remove('actives');
                    RAITING_STARS[i].classList.add('inactives');
                }
            }
        });
    }

    raitingContainer.append(review, delivery, deliveryCity, changeBtn);
    review.append(addReview, line, addQuestion);
    addItemContainer.append(prices_container, btnContainer);
    prices_container.append(prices, leasing);
    prices.append(regularContainer, totalContainer);
    leasing.append(leasingTitle);
    btnContainer.append(addToShoppingCart, addToFavourite);
    addToShoppingCart.append(iconContainer, cartText);
    iconContainer.append(cartIcon);
    addToFavourite.append(favIconContainer, favText);
    favIconContainer.append(favIcon);
    containerImages.append(mainImage, allImgs);
}