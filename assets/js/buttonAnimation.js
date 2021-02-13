let rightScroll = document.getElementById('right-scroll');
let leftScroll = document.getElementById('left-scroll');
//BUTTONS' ANIMATION IN FOCUS-BAR SECTION
function scrollItems(rightScroll, leftScroll, container) {
    let lengthScroll = 100 * ((allFocusItems.length) / 6 - 1);
    let totalAmount = 0;
    rightScroll.addEventListener('click', function () {
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

    });

    leftScroll.addEventListener('click', function () {
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
    });
}

scrollItems(rightScroll, leftScroll, cardsContainer);