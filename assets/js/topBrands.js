// SHOW TOP BRANDS SECTION
TOP_BRANDS.style.display = 'block';
MOBILE_BRANDS.style.display = 'none';
ELECTRONIC_BRANDS.style.display = 'none';
HEALTH_BRANDS.style.display = 'none';
FASHION_BRANDS.style.display = 'none';

for (let i = 0; i < ALL_BRANDS_SECTION.length; i++) {
    ALL_BRANDS_SECTION[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        switch (i) {
            case 0:
                TOP_BRANDS.style.display = 'block';
                MOBILE_BRANDS.style.display = 'none';
                ELECTRONIC_BRANDS.style.display = 'none';
                HEALTH_BRANDS.style.display = 'none';
                FASHION_BRANDS.style.display = 'none';
                break;
            case 1:
                TOP_BRANDS.style.display = 'none';
                MOBILE_BRANDS.style.display = 'block';
                ELECTRONIC_BRANDS.style.display = 'none';
                HEALTH_BRANDS.style.display = 'none';
                FASHION_BRANDS.style.display = 'none';
                MOST_POPULAR_STYLE.id = '';
                break;
            case 2:
                TOP_BRANDS.style.display = 'none';
                MOBILE_BRANDS.style.display = 'none';
                ELECTRONIC_BRANDS.style.display = 'block';
                HEALTH_BRANDS.style.display = 'none';
                FASHION_BRANDS.style.display = 'none';
                break;
            case 3:
                TOP_BRANDS.style.display = 'none';
                MOBILE_BRANDS.style.display = 'none';
                ELECTRONIC_BRANDS.style.display = 'none';
                HEALTH_BRANDS.style.display = 'block';
                FASHION_BRANDS.style.display = 'none';
                break;
            case 4:
                TOP_BRANDS.style.display = 'none';
                MOBILE_BRANDS.style.display = 'none';
                ELECTRONIC_BRANDS.style.display = 'none';
                HEALTH_BRANDS.style.display = 'none';
                FASHION_BRANDS.style.display = 'block';
                break;
        }
    })
}