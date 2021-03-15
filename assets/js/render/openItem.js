function openItem(currentItem) {
    OPEN_ITEM_CONTAINER.innerHTML = '';
    OPEN_ITEM.style.display = 'block';
    const titleContainer = utils.createNewElement('div');
    titleContainer.className = 'fw-400 title-article';
    const currentTitle = utils.createNewElement('p', currentItem.title);
    const fixedInformation = utils.createNewElement('div');
    fixedInformation.className = 'display-flex justify-between mb-10 fixed-info';
    const currentID = utils.createNewElement('span', `Код на продукта: ${currentItem.id}`);
    currentID.className = 'fs-12 items-id';
    const social = utils.createNewElement('span');
    const fbBtn = utils.createNewElement('a');
    fbBtn.className = 'fs-12 color-white rounded-3 fb-btn';
    fbBtn.href = '#';
    const fbIcon = utils.createNewElement('i');
    fbIcon.className = 'fab fa-facebook-f';
    const fbTitle = utils.createNewElement('span', 'Сподели');
    const compareBox = utils.createNewElement('span');
    compareBox.className = 'fs-12 rounded-3 compare-box';
    const check = utils.createNewElement('input');
    check.type = 'checkbox';
    const text = utils.createNewElement('span', 'Сравни');
    const mainContainer = utils.createNewElement('div');
    mainContainer.className = 'display-flex justify-between mt-10';
    const containerImages = utils.createNewElement('div');
    let mainImage = utils.createNewElement('img');
    mainImage.src = currentItem.image;
    mainImage.className = 'cursor main-image-item';
    containerImages.className = 'item-images';
    let allImgs = utils.createNewElement('div');
    if (currentItem.allImages) {
        let firstImg, secondImg;
        for (let i = 0; i < currentItem.allImages.length; i++) {
            let image = utils.createNewElement('img');
            image.src = currentItem.allImages[i];
            if (i === 0) {
                image.className = 'images-item-hover cursor rounded-3';
                firstImg = image;
            } else {
                image.className = 'images-item cursor';
                secondImg = image;
            }

            allImgs.append(image);
            const item = currentItem;
            image.addEventListener('mouseover', () => {
                mainImage.className += ' slide';
                mainImage.src = item.allImages[i];
                if (i === 0) {
                    firstImg.className = 'images-item-hover wrapper cursor rounded-3';
                    secondImg.className = 'images-item wrapper cursor';
                } else {
                    secondImg.className = 'images-item-hover wrapper cursor rounded-3';
                    firstImg.className = 'images-item wrapper cursor';
                }
            });

            image.addEventListener('mouseout', () => {
                mainImage.classList.remove('slide');
            });
        }
    }

    const containerInformation = utils.createNewElement('div');
    containerInformation.className = 'display-flex justify-between fs-13 container-info';
    const itemInformation = utils.createNewElement('div');
    const addItemContainer = utils.createNewElement('div');
    addItemContainer.className = 'add-item-in';
    const ratingContainer = utils.createNewElement('div');
    const textClient = utils.createNewElement('p', 'Оценка от клиенти:');
    const review = utils.createNewElement('div');
    review.className = 'mb-20 cursor review clr-bl-94';
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
    changeBtn.href = '#';
    changeBtn.className = 'mb-20 cursor change clr-bl-94';
    const benefits = utils.createNewElement('div', 'Ползи:');
    benefits.className = 'delivery benefits-delivery';
    const giftContainer = utils.createNewElement('div');
    giftContainer.className = 'benefits-containers';
    const giftIcon = utils.createNewElement('i');
    giftIcon.className = 'fas fa-gift';
    const giftText = utils.createNewElement('span', 'Получавате 9 точки при плащане с еMAG');
    const cart = utils.createNewElement('div')
    cart.className = 'benefits-containers';
    const cartTxt = utils.createNewElement('span', 'карта');
    const cartLink = utils.createNewElement('a', 'вижте повече');
    cartLink.href = '#';
    cartLink.className = 'change clr-bl-94';
    const shipContainer = utils.createNewElement('div');
    shipContainer.className = 'benefits-containers';
    const shipIcon = utils.createNewElement('i');
    shipIcon.className = 'fas fa-box-open';
    const shipText = utils.createNewElement('span', 'Проверка на пратката');
    const persText = utils.createNewElement('li', 'Физическо лице: 24 месеца');
    persText.className = 'benef-strong';
    const prices_container = utils.createNewElement('div');
    prices_container.className = 'display-flex mb-10 justify-between prices-container';
    const prices = utils.createNewElement('div');
    prices.className = 'prices';
    const regularContainer = utils.createNewElement('div');
    regularContainer.className = 'fw-600 position-relative regular-container-item';
    const totalContainer = utils.createNewElement('div');
    totalContainer.className = 'position-relative total-container';
    const currPr = currentItem.currentPrice.split('.');
    const currentPrice = utils.createNewElement('span', currPr[0])
    currentPrice.className = 'fw-600 current-price-item';
    const currentPennies = utils.createNewElement('sup', currPr[1]);
    currentPennies.className = 'fw-600 position-absolute current-pennies-item';
    const lv = utils.createNewElement('span', 'лв.')
    lv.className = 'fw-600 lv-item';
    if (currentItem.regularPrice) {
        const regPr = currentItem.regularPrice.split('.');
        const regularPrice = utils.createNewElement('span', regPr[0])
        regularPrice.className = 'regular-price-item';
        const regularPennies = utils.createNewElement('sup', regPr[1]);
        regularPennies.className = 'position-absolute regular-pennies-item';
        const lv = utils.createNewElement('span', 'лв.')
        lv.className = 'lv';
        const sale = utils.createNewElement('span', `(-${currentItem.discount}%)`);
        sale.className = 'item-sale';
        regularContainer.append(regularPrice, regularPennies, lv, sale);
    }

    totalContainer.append(currentPrice, currentPennies, lv);
    const availableText = utils.createNewElement('span', 'в наличност');
    availableText.className = 'main-bckgr fw-700 rounded-3 available-item fs-10';
    const leasing = utils.createNewElement('span');
    const leasingTitle = utils.createNewElement('p', 'Месечни вноски');
    const btnContainer = utils.createNewElement('div');
    btnContainer.id = 'buttonsContainer';
    btnContainer.className = 'mt-20';
    const addToShoppingCart = utils.createNewElement('div');
    addToShoppingCart.className = 'display-flex mb-10 cursor fw-400 rounded-4 add-shopping-cart color-white';
    const item = currentItem;
    addToShoppingCart.addEventListener('click', () => {
        userModel.addToCart(item.id);
        renderHeader();
    });
    const iconContainer = utils.createNewElement('span');
    const cartIcon = utils.createNewElement('i');
    cartIcon.className = 'fas fa-shopping-cart cart';
    const cartText = utils.createNewElement('span', 'Добави в количката');
    cartText.className = 'cart-text';
    const addToFavourite = utils.createNewElement('div');
    addToFavourite.className = 'display-flex mb-10 cursor fw-400 rounded-4 add-favourite clr-bl-94 main-align color-white';
    const favIconContainer = utils.createNewElement('span');
    const favIcon = utils.createNewElement('i');
    favIcon.className = 'far fa-heart heart';
    const favText = utils.createNewElement('span');
    favText.className = 'm-auto fav-text';
    let favourites;
    if (userModel.isLoggedIn()) {
        favourites = userModel.getUsers().find(user => user.isLoggedIn).favourites;
    } else {
        favourites = userModel.getItem('guest').favourites;
    }

    const isInFav = favourites.some(el => el.id === currentItem.id);
    if (!isInFav) {
        favIcon.className = 'far fa-heart heart';
        favIcon.style.color = '#2196f3';
        favText.innerHTML = 'Добави в любими';
    } else {
        favIcon.className = 'fas fa-heart heart';
        favIcon.style.color = 'red';
        favText.innerHTML = 'Добавено в любими';
    }

    addToFavourite.addEventListener('click', () => {
        if (favIcon.style.color !== 'red') {
            userModel.addToFav(item.id);
            favIcon.className = 'fas fa-heart heart';
            favIcon.style.color = 'red';
            utils.success('Продуктът беше добавен в любими');
            favText.innerHTML = 'Добавено в любими';
        }
        else {
            userModel.removeFromFav(item.id);
            favIcon.className = 'far fa-heart heart';
            favIcon.style.color = '#2196f3';
            utils.success('Продуктът беше премахнат от любими');
            favText.innerHTML = 'Добави в любими';
        }

        renderHeader();
    });

    OPEN_ITEM_CONTAINER.append(titleContainer, mainContainer);
    titleContainer.append(currentTitle, fixedInformation);
    fixedInformation.append(currentID, social);
    social.append(fbBtn, compareBox);
    fbBtn.append(fbIcon, fbTitle);
    compareBox.append(check, text);
    mainContainer.append(containerImages, containerInformation);
    containerInformation.append(itemInformation, addItemContainer);
    itemInformation.append(ratingContainer);
    ratingContainer.append(textClient);
    let currentRating = currentItem.rating;
    utils.rating(currentRating, ratingContainer);
    ratingContainer.append(review, delivery, deliveryCity, changeBtn, benefits, giftContainer, cart, shipContainer, persText);
    giftContainer.append(giftIcon, giftText);
    cart.append(cartTxt, cartLink);
    shipContainer.append(shipIcon, shipText);
    review.append(addReview, line, addQuestion);
    addItemContainer.append(prices_container, availableText, btnContainer);
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