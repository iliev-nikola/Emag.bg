//BUTTONS ANIMATION IN FOCUS-BAR SECTION AND OTHER CLIENTS WATCHED SECTION
function scrollItems(array, rightScroll, leftScroll, container) {
    let counterFocus = 0;
    let counterOther = 0;
    let lengthScroll = 100 * ((array.length) / 6 - 1);
    let totalAmount = 0;
    function scrollLeft() {
        container.className = 'blur';
        let scrollAmount = 0;
        let slideTimer = setInterval(function () {
            container.scrollLeft += 121;
            scrollAmount += 10;
            if (scrollAmount >= 100) {
                window.clearInterval(slideTimer);
                container.classList.remove('blur');
                totalAmount += scrollAmount;
            }

            if (totalAmount >= lengthScroll) {
                rightScroll.style.display = 'none';
            }

            if (container.scrollLeft > 0) {
                leftScroll.style.display = 'block';
            }
        }, 30);

        if (container === CARDS_CONTAINER) {
            counterFocus++;
            ALL_RADIO_BUTTONS[counterFocus].checked = true;
        } else {
            counterOther++;
            ALL_OTHER_BUTTONS[counterOther].checked = true;
        }
    }

    function scrollRight() {
        container.className = 'blur';
        let scrollAmount = 0;
        let slideTimer = setInterval(function () {
            container.scrollLeft -= 121;
            scrollAmount += 10;
            if (scrollAmount >= 100) {
                window.clearInterval(slideTimer);
                container.classList.remove('blur');
                totalAmount -= scrollAmount;
            }

            if (container.scrollLeft === 0) {
                leftScroll.style.display = 'none';
            }

            if (totalAmount < lengthScroll) {
                rightScroll.style.display = 'block';
            }
        }, 30);

        if (container === CARDS_CONTAINER) {
            counterFocus--;
            ALL_RADIO_BUTTONS[counterFocus].checked = true;
        } else {
            counterOther--;
            ALL_OTHER_BUTTONS[counterOther].checked = true;
        }
    }

    rightScroll.addEventListener('click', scrollLeft);
    leftScroll.addEventListener('click', scrollRight);
}

scrollItems(ALL_FOCUS_ITEMS, RIGHT_SCROLL, LEFT_SCROLL, CARDS_CONTAINER);
scrollItems(OTHER_CLIENTS_WATCHED, RIGTH_OTHER_SCROLL, LEFT_OTHER_SCROLL, OTHER_WATCHED_CONTAINER);

