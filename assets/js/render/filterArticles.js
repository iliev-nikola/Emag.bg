const filter = (function () {
    const manufacturer = document.getElementsByName('manufacturer');
    const rating = document.getElementsByName('rating');
    const price = document.getElementsByName('price');

    function onlyOneCheckbox(checkbox) {
        const checkboxes = document.getElementsByName(checkbox.name);
        checkboxes.forEach(item => {
            if (item !== checkbox) item.checked = false
        });
    }

    function filterArticles() {
        let filtered = ITEMS_IN_CATEGORY_PAGE;
        manufacturer.forEach(checkbox => {
            if (checkbox.checked) {
                const value = checkbox.nextElementSibling.innerHTML;
                filtered = filtered.filter(article => article.manufacturer === value);
            }
        });

        rating.forEach(checkbox => {
            if (checkbox.checked) {
                switch (checkbox.id) {
                    case 'fiveStars':
                        filtered = filtered.filter(article => article.raiting === 5);
                        break;
                    case 'fourStars':
                        filtered = filtered.filter(article => article.raiting === 4);
                        break;
                    case 'threeStars':
                        filtered = filtered.filter(article => article.raiting === 3);
                        break;
                    case 'twoStars':
                        filtered = filtered.filter(article => article.raiting === 2);
                        break;
                    case 'oneStar':
                        filtered = filtered.filter(article => article.raiting === 1);
                        break;
                }
            }
        });

        price.forEach(checkbox => {
            if (checkbox.checked) {
                const id = checkbox.id;
                if (id.includes('over')) {
                    filtered = filtered.filter(article => article.currentPrice > 2000);
                } else {
                    const [from, to] = id.split('to').map(Number);
                    console.log(from, to);
                    filtered = filtered.filter(article => {
                        return article.currentPrice >= from && article.currentPrice <= to
                    });
                }
            }
        });

        if (SEARCH_CATEGORY_ITEM.value) {
            filtered = filtered.filter(article => {
                return article.title.toLowerCase().includes(SEARCH_CATEGORY_ITEM.value.toLowerCase())
            });
        }

        if (SORT_BY.value) {
            switch (SORT_BY.value) {
                case 'name':
                    filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'price-asc':
                    filtered.sort((a, b) => a.currentPrice - b.currentPrice);
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => b.currentPrice - a.currentPrice);
                    break;
                case 'discount':
                    filtered.sort((a, b) => b.discount - a.discount);
                    break;
            }
        }


        return filtered;
    }

    function clearCheckboxes() {
        [manufacturer, rating, price].forEach(type => {
            type.forEach(checkbox => {
                if (checkbox.checked) checkbox.checked = false;
            });
        });

        CLEAR_FILTERS_BUTTON.style.visibility = 'hidden';
    }

    function checkTheCheckboxes() {
        let isChecked = false;
        [manufacturer, rating, price].forEach(type => {
            type.forEach(checkbox => {
                if (checkbox.checked) return isChecked = true;
            });
        });

        if (isChecked) {
            CLEAR_FILTERS_BUTTON.style.visibility = 'visible';
        } else {
            CLEAR_FILTERS_BUTTON.style.visibility = 'hidden';
        }
    }

    return {
        onlyOneCheckbox,
        filterArticles,
        clearCheckboxes,
        checkTheCheckboxes
    }
})();