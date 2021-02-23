//BUTTONS ANIMATION IN FOCUS-BAR SECTION AND OTHER CLIENTS WATCHED SECTION
function scrollItems(array, rightScroll, leftScroll, container, mainContainer) {
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

        if (leftScroll && container === CARDS_CONTAINER) {
            counterFocus++;
            ALL_RADIO_BUTTONS[counterFocus].checked = true;
        }
        if (leftScroll && container === OTHER_WATCHED_CONTAINER) {
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

        if (rightScroll && container === CARDS_CONTAINER) {
            counterFocus--;
            ALL_RADIO_BUTTONS[counterFocus].checked = true;
        }
        if (rightScroll && container === OTHER_WATCHED_CONTAINER) {
            counterOther--;
            ALL_OTHER_BUTTONS[counterOther].checked = true;
        }
    }

    mainContainer.addEventListener('click', function (ev) {
        let counter;
        if (container === CARDS_CONTAINER) {
            counter = counterFocus + 1;
        }
        if (container === OTHER_WATCHED_CONTAINER) {
            counter = counterOther + 1;
        }
        if (ev.target.tagName === 'INPUT' && counter < parseInt(ev.target.value)) {
            for (let i = 0; i < parseInt(ev.target.value) - counter; i++) {
                scrollLeft();
            }
            ev.target.checked = true;
            counter = ev.target.value;
        }
        if (ev.target.tagName === 'INPUT' && counter > parseInt(ev.target.value)) {
            for (let i = 0; i < counter - parseInt(ev.target.value); i++) {
                scrollRight();
            }
            ev.target.checked = true;
            counter = ev.target.value;
        }
    });

    rightScroll.addEventListener('click', scrollLeft);
    leftScroll.addEventListener('click', scrollRight);
}

scrollItems(ALL_FOCUS_ITEMS, RIGHT_SCROLL, LEFT_SCROLL, CARDS_CONTAINER, FOCUS_BAR);
scrollItems(OTHER_CLIENTS_WATCHED, RIGTH_OTHER_SCROLL, LEFT_OTHER_SCROLL, OTHER_WATCHED_CONTAINER, DOTS_CONTAINER_OTHER);

// SLIDESHOW IMAGES IN MAIN
let radioBtns = Array.from(RADIO_MAIN);
let currentSlide = 0;
function slideShow() {
    CURRENT_IMAGE.src = slideImages[currentSlide];
    radioBtns[currentSlide].checked = true;
}

setInterval(function () {
    if (currentSlide === slideImages.length - 1) {
        currentSlide = -1;
    }
    currentSlide++;
    slideShow();
}, 6000);

CHEVRON_RIGHT.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide === slideImages.length) {
        currentSlide -= 1;
    }
    slideShow();
});

CHEVRON_LEFT.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide <= 0) {
        currentSlide = 0;
    }
    slideShow();
});

radioBtns.forEach(radio => {
    radio.addEventListener('click', () => {
        currentSlide = radio.value;
        slideShow();
    });
});



