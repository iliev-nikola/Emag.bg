// MAIN
const BODY = document.body;

// SEARCH BAR
const SEARCH_BOX = document.querySelector('.searchbox');
const SEARCH_BOX_CONTENT = document.querySelector('.searchbox-content');
const SEARCH_BAR = document.querySelector('.search-bar');
const SEARCH_INPUT = utils.getById('search')
const SEARCH_FORM = utils.getById('searchForm');
const SUBMIT_BUTTON = utils.getById('submitBtn');

// ROUTER
const MAIN_SECTION = document.querySelector('.main-section');
const LOGIN_SECTION = document.querySelector('.login-section');
const LOGIN_PAGE = utils.getById('loginPage');
const REGISTER_PAGE = utils.getById('registerPage');
const ERROR_PAGE = utils.getById('errorPage');
const ERROR_TEXT = utils.getById('errorText');

// LOGIN & REGISTER
const LOGIN_USER = utils.getById('loginUsername');
const LOGIN_PASS = utils.getById('loginPassword');
const LOGIN_BTN = utils.getById('loginBtn');
const NAMES = utils.getById('names');
const REGISTER_USER = utils.getById('regUsername');
const REGISTER_PASS = utils.getById('regPassword');
const REGISTER_RE_PASS = utils.getById('regRePassword');
const REGISTER_BTN = utils.getById('registerBtn');

// HEADER SECTION
const HEADER_SECTION = document.querySelector('.header-section');
const HEADER = document.querySelector('.header-section > header');
const USER_PIC = utils.getById('userPic');
const PROFILE_NAV = document.querySelector('.profile-nav');
const GUEST_NAV = document.querySelector('.guest-nav');
const HELLO_MESSAGE = utils.getById('helloMessage');
const LOGOUT_BTN = utils.getById('logoutBtn');
const FAVOURITE_NAV_CONTAINER = document.querySelector('.favourite-nav');
const FAVOURITE_COUNTER = utils.getById('favCounter');
const CART_NAV_CONTAINER = document.querySelector('.cart-nav-container');
const CART_COUNTER = utils.getById('cartCounter');
const SHOPPING_CART_NAV = document.querySelector('.shopping-cart-nav');
const SHOPPING_CART_BTN = utils.getById('sh-cart-btn');
const PROFILE_ICON = document.querySelector('.profile-icon');
const FAVOURITE_ICON = document.querySelector('.favourite-icon');
const SHOPPING_CART_ICON = document.querySelector('.shopping-cart');
const HEADER_SANDWICH_BUTTON = utils.getById('header-sandwich-button');


// NAVIGATION BAR
const CATEGORIES_LINK = utils.getById('categories');
const NAV_MENU_ONSCROLL = utils.getById('navMenuOnScroll');
const NAV_BAR = document.querySelector('.nav-bar');

// INFORMATION BANNERS
const SUCCESS_BANNER = utils.getById('success');
const ERROR_BANNER = utils.getById('error');

// BUTTONS IN MAIN
const CHEVRON_RIGHT = utils.getById('chevronRight');
const CHEVRON_LEFT = utils.getById('chevronLeft');
const RADIO_MAIN = document.querySelectorAll(".radio-main-view");
const MAIN_SLIDESHOW = document.querySelector('.main-slideshow');
const CURRENT_IMAGE = utils.getById('slideImage');

// BUTTONS IN FOCUS-BAR SECTION
const RIGHT_SCROLL = utils.getById('right-scroll');
const LEFT_SCROLL = utils.getById('left-scroll');

// BUTTONS IN OTHER CLIENTS WATCHED SECTION
const RIGTH_OTHER_SCROLL = utils.getById('other-right-scroll');
const LEFT_OTHER_SCROLL = utils.getById('other-left-scroll');

// CONTAINER IN FOCUS-BAR SECTION
const CARDS_CONTAINER = utils.getById('cards-container');
const WATCHED_ITEMS = utils.getById('watched-items');

// CONTAINER IN HISTORY SECTION
const WATCHED_CONTAINER = utils.getById('history-section');

// DELETE ITEMS - HISTORY SECTION
const DELETE_WATCHED = utils.getById('delete-watched');

// ANIMATION CONTAINER IN HISTORY SECTION
const ANIMATION_HISTORY = utils.getById('animation-history')

// CONTAINER IN OTHER CLIENTS WATCHED SETION
const OTHER_WATCHED_CONTAINER = utils.getById('other-watched-container');

// FOCUS-BAR SECTION
const FOCUS_BAR = utils.getById('focus-section');

// RADIO BUTTONS CONTAINER IN FOCUS-BAR SECTION
const DOTS_CONTAINER = utils.getById('dots-container');

// RADIO BUTTONS CONTAINER IN OTHER CLIENTS WATCHED
const DOTS_CONTAINER_OTHER = utils.getById('other-dots-container');

// ALL RADIO BUTTONS IN FOCUS SECTION
const ALL_RADIO_BUTTONS = document.getElementsByClassName('dots');

// ALL RADIO BUTTONS IN OTHER CLIENTS WATCHED
const ALL_OTHER_BUTTONS = document.getElementsByClassName('other-dots');

// CONTAINERS IN TOP BRANDS
const TOP_BRANDS = utils.getById("topBrands");
const MOBILE_BRANDS = utils.getById("mobileBrands");
const ELECTRONIC_BRANDS = utils.getById("electronicsBrands");
const HEALTH_BRANDS = utils.getById("healthBrands");
const FASHION_BRANDS = utils.getById("fashionBrands");
const ALL_BRANDS_SECTION = document.getElementsByClassName('brands');
const MOST_POPULAR_STYLE = utils.getById('most-popular');

// SECTIONS
const FOCUS_SECTION = utils.getById('focus-section');
const MAIN_MENU = utils.getById('main');
const OPTIONS_PANEL = utils.getById('optionsPanel');
const MOBILE_SECTION = utils.getById('mobile-bar');
const MOBILE_APP = utils.getById('mobile-app');
const TV_SECTION = utils.getById('tv-bar');
const TOP_SECTION = utils.getById('top');
const BIG_TECHNOLOGIES = utils.getById('big-technologies');
const BULLETIN = utils.getById('bulletin');
const OPEN_ITEM = utils.getById('open-item-section');
const MARKETPLACE_SECTION = document.querySelector('.marketplace');
const OTHER_CLIENTS_SECTION = document.querySelector('.other-clients');
const APP_EMAG = document.querySelector('.app-emag');
const FOOTER = document.querySelector('.footer-nav');

// RAITING STARS
const RAITING_STARS = document.getElementsByClassName('stars');

// OPEN ITEM CONTAINER
const OPEN_ITEM_CONTAINER = utils.getById('open-item-container');

// FAVOURITES & SHOPPING CART
const FAVOURITES_PAGE = utils.getById('favouriteItems');
const HOME_PAGE_MENU = document.querySelector('.home-page-body');
const CART_PAGE = document.querySelector('.cart-page');
const EMPTY_CART = utils.getById('empty-cart');
const CART_CONTAINER = utils.getById('cart-container');
const ITEMS_IN_CART = document.querySelector('.items-cart');
const EMPTY_FAV = utils.getById('emptyFav');
const FULL_FAV = utils.getById('fullFav');
const CART_AMOUNT_PRICE = utils.getById('cart-amount-price');
const PRODUCTS_AMOUNT = utils.getById('products-amount');
const PRODUCTS_PENNIES = utils.getById('product-pennies');
const AMOUNT_PENNIES = utils.getById('cart-amount-pennies');
const ADD_VOUCHER = utils.getById('addVoucher');
const ADD_CODE = utils.getById('addCode');
const VOUCHER_CONTAINER = utils.getById('voucher');
const INFORMATION_ORDER = utils.getById('information-order');