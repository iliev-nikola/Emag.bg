//ITEMS IN CART & FAVOURITES
function openFavAndCart(favourites, cart) {
    if (cart.length) {
        EMPTY_CART.style.display = 'none';
        EMPTY_CART.style.display = 'none';
        CART_CONTAINER.display = 'block';
        ITEMS_IN_CART.innerHTML = '';
        let amount = 0;
        const mainContainer = utils.createNewElement('div');
        mainContainer.className = 'main-cart-container';
        ITEMS_IN_CART.append(mainContainer);
        cart.forEach(currentElement => {
            const elContainer = utils.createNewElement('div');
            elContainer.className = 'item-cont';
            const elImage = utils.createNewElement('img');
            elImage.src = currentElement.image;
            const elInformation = utils.createNewElement('div');
            elInformation.className = 'cart-inf';
            const elTitle = utils.createNewElement('p', currentElement.title);
            elTitle.className = 'cart-title';
            const available = utils.createNewElement('p', 'В наличност: в наличност');
            available.className = 'instock';
            const buyWith = utils.createNewElement('div');
            buyWith.className = 'buy-with';
            const buyIcon = utils.createNewElement('i');
            buyIcon.className = 'fas fa-arrow-right';
            const buyText = utils.createNewElement('span', 'Купи със');
            const numberContainer = utils.createNewElement('div');
            const selectNav = utils.createNewElement('select');
            selectNav.className = 'select-cart';
            const numb = utils.createNewElement('span', 'бр.');
            numb.className = 'numb';
            const pricesContainer = utils.createNewElement('div');
            pricesContainer.className = 'prices-cart';
            const currentContainer = utils.createNewElement('div');
            currentContainer.className = 'cart-price';
            const currentPrice = utils.createNewElement('span');
            currentPrice.className = 'cart-current-price';
            const currentPennies = utils.createNewElement('span');
            currentPennies.className = 'current-pennies-cart';
            const lv = utils.createNewElement('span', 'лв.')
            lv.className = 'current-lv-cart';
            pricesContainer.append(currentContainer);
            currentContainer.append(currentPrice, currentPennies, lv);
            const regularPrice = utils.createNewElement('span')
            regularPrice.className = 'cart-regular-price';
            const regularPennies = utils.createNewElement('span');
            regularPennies.className = 'regular-pennies-cart';
            let totalSavePrice;
            let totalSavePennies;
            if (currentElement.regularPrice !== '-') {
                const regularContainer = utils.createNewElement('p');
                regularContainer.className = 'cart-price';
                const lv = utils.createNewElement('span', 'лв.')
                lv.className = 'regular-lv-cart';
                regularContainer.append(regularPrice, regularPennies, lv);
                const save = utils.createNewElement('p', 'Спестяваш:');
                save.className = 'cart-price';
                let totalSave = utils.createNewElement('div');
                totalSave.className = 'cart-price save-cart';
                totalSavePrice = utils.createNewElement('span');
                totalSavePennies = utils.createNewElement('span');
                totalSavePennies.className = 'save-pennies';
                const saveLv = utils.createNewElement('span', 'лв.');
                totalSave.append(totalSavePrice, totalSavePennies, saveLv);
                pricesContainer.append(regularContainer, save, totalSave);
            }
            const addOrRemoveContainer = utils.createNewElement('div');
            addOrRemoveContainer.className = 'add-delete-cart';
            const addToFav = utils.createNewElement('span', 'добави в Любими');
            const remove = utils.createNewElement('span', 'Изтрий');
            remove.addEventListener('click', utils.removeFromCart);
            mainContainer.append(elContainer);
            elContainer.append(elImage, elInformation, numberContainer, pricesContainer);
            elInformation.append(elTitle, available, buyWith);
            buyWith.append(buyIcon, buyText);
            numberContainer.append(selectNav, numb);
            pricesContainer.append(addOrRemoveContainer);
            addOrRemoveContainer.append(addToFav, remove);
            let currentAmount = eval(`${currentElement.currentPrice}.${currentElement.currentPennies}`);
            let optionLength = currentElement.count;
            if (optionLength < 5) {
                optionLength = 5;
            }
            for (let i = 0; i < optionLength; i++) {
                const option = utils.createNewElement('option', i + 1);
                if (i + 1 === currentElement.count) {
                    option.selected = true;
                    let currentOption = i + 1;
                    amount += currentOption * currentAmount;
                    utils.changePrice(currentOption, currentElement, currentPrice, currentPennies, regularPrice, regularPennies, totalSavePrice, totalSavePennies);
                }
                selectNav.append(option);
            }
            let lastOption = selectNav.options.selectedIndex + 1;
            selectNav.addEventListener('change', () => {
                let currentOption = selectNav.options.selectedIndex + 1;
                utils.changePrice(currentOption, currentElement, currentPrice, currentPennies, regularPrice, regularPennies, totalSavePrice, totalSavePennies);
                amount -= lastOption * currentAmount;
                amount += currentOption * currentAmount;
                utils.calculateAmount(amount);
                lastOption = currentOption;
            });

            utils.calculateAmount(amount);

        });
        // const totalPriceContainer = utils.createNewElement('div', 'Всички продукти:');
        // totalPriceContainer.className = 'total-price-container';
        // let totalPrice = utils.createNewElement('span');
        // totalPrice.className = 'cart-total-price';
        // let totalPennies = utils.createNewElement('span');
        // totalPennies.className = 'total-pennies-cart';
        // const totalLv = utils.createNewElement('span', 'лв.')
        // totalLv.className = 'total-lv-cart';
        // mainContainer.append(totalPriceContainer);
        // totalPriceContainer.append(totalPrice, totalPennies, totalLv);

    } else {
        CART_CONTAINER.display = 'none';
    }

    if (favourites.length) {
        EMPTY_FAV.style.display = 'none';
        FULL_FAV.style.display = 'block';
        favourites = new Set(favourites);
        favourites = Array.from(favourites);
        favourites.forEach(fav => {
            const favContainer = utils.createNewElement('div');
            favContainer.className = 'fav-container'
            const mainCont = utils.createNewElement('div');
            mainCont.className = 'main-fav-cont';
            const favImage = utils.createNewElement('img');
            favImage.src = fav.image;
            favImage.className = 'fav-images';
            const favTitle = utils.createNewElement('p', fav.title);
            favTitle.className = 'fav-p';
            const info = utils.createNewElement('div');
            info.className = 'fav-info';
            const available = utils.createNewElement('p', 'в наличност');
            available.className = 'info-cart fav-available';
            const offeredBy = utils.createNewElement('p', `Предлаган от: eMAG`);
            offeredBy.className = 'info-cart';
            FULL_FAV.append(favContainer);
            favContainer.append(mainCont);
            mainCont.append(favImage, favTitle, info);
            info.append(available, offeredBy);
            if (fav.regularPrice !== '-') {
                const regularContainer = utils.createNewElement('div');
                regularContainer.className = 'info-cart';
                const regularPrice = utils.createNewElement('span', fav.regularPrice);
                regularPrice.className = 'fav-regular-price';
                const regularPennies = utils.createNewElement('span', fav.regularPennies);
                regularPennies.className = 'fav-regular-pennies';
                const regularLv = utils.createNewElement('span', 'лв.')
                regularLv.className = 'fav-regular-lv';
                info.append(regularContainer);
                regularContainer.append(regularPrice, regularPennies, regularLv);
            }
            const currentContainer = utils.createNewElement('div');
            currentContainer.className = 'info-cart';
            const currentPrice = utils.createNewElement('span', fav.currentPrice);
            currentPrice.className = 'fav-current-price';
            const currentPennies = utils.createNewElement('span', fav.currentPennies);
            currentPennies.className = 'fav-current-pennies';
            const lv = utils.createNewElement('span', 'лв.')
            lv.className = 'fav-current-lv';
            let addShoppingCart = utils.createNewElement('div');
            addShoppingCart.className = 'add-shopping-cart info-cart';
            const iconContainer = utils.createNewElement('span');
            iconContainer.className = 'cart';
            const cartIcon = utils.createNewElement('i');
            cartIcon.className = 'fas fa-shopping-cart fav-cart-icon';
            const cartText = utils.createNewElement('span', 'Добави в количката');
            cartText.className = 'cart-text';
            const deleteContainer = utils.createNewElement('div');
            deleteContainer.className = 'info-cart fav-delete';
            const deleteIcon = utils.createNewElement('i');
            deleteIcon.className = 'fas fa-trash-alt';
            const deleteText = utils.createNewElement('span', 'Изтрий');
            info.append(currentContainer, addShoppingCart, deleteContainer)
            currentContainer.append(currentPrice, currentPennies, lv);
            addShoppingCart.append(iconContainer, cartText);
            iconContainer.append(cartIcon);
            deleteContainer.append(deleteIcon, deleteText);
            favTitle.addEventListener('click', () => {
                openItem(fav);
            });
            favImage.addEventListener('click', () => {
                openItem(fav);
            });
        })
    } else {
        EMPTY_FAV.style.display = 'block';
        FULL_FAV.style.display = 'none';
    }
}



