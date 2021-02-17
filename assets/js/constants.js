// MAIN
const BODY = document.body;

// SEARCH BAR
const SEARCH_BOX = document.querySelector('.searchbox');
const SEARCH_BOX_CONTENT = document.querySelector('.searchbox-content');
const SEARCH_BAR = document.querySelector('.search-bar');
const SEARCH_INPUT = getById('search')
const SEARCH_FORM = getById('searchForm');
const SUBMIT_BUTTON = getById('submitBtn');

// ROUTER
const MAIN_SECTION = document.querySelector('.main-section');
const LOGIN_SECTION = document.querySelector('.login-section');
const LOGIN_PAGE = getById('loginPage');
const REGISTER_PAGE = getById('registerPage');
const ERROR_PAGE = getById('errorPage');
const ERROR_TEXT = getById('errorText');

// LOGIN & REGISTER
const LOGIN_USER = getById('loginUsername');
const LOGIN_PASS = getById('loginPassword');
const LOGIN_BTN = getById('loginBtn');
const NAMES = getById('names');
const REGISTER_USER = getById('regUsername');
const REGISTER_PASS = getById('regPassword');
const REGISTER_RE_PASS = getById('regRePassword');
const REGISTER_BTN = getById('registerBtn');

// HEADER SECTION
const USER_PIC = getById('userPic');
const PROFILE_NAV = document.querySelector('.profile-nav');
const GUEST_NAV = document.querySelector('.guest-nav');
const HELLO_MESSAGE = getById('helloMessage');
const LOGOUT_BTN = getById('logoutBtn');

// INFORMATION BANNERS
const SUCCESS_BANNER = getById('success');
const ERROR_BANNER = getById('error');

//BUTONS IN FOCUS-BAR SECTION
const RIGHT_SCROLL = getById('right-scroll');
const LEFT_SCROLL = getById('left-scroll');

//BUTTONS IN OTHER CLIENTS WATCHED SECTION
const RIGTH_OTHER_SCROLL = getById('other-right-scroll');
const LEFT_OTHER_SCROLL = getById('other-left-scroll');

//CONTAINER IN FOCUS-BAR SECTION
const CARDS_CONTAINER = getById('cards-container');
const WATCHED_ITEMS = getById('watched-items');

//CONTAINER IN HISTORY SECTION
const WATCHED_CONTAINER = getById('history-section');

//DELETE ITEMS - HISTORY SECTION
const DELETE_WATCHED = getById('delete-watched');

//ANIMATION CONTAINER IN HISTORY SECTION
const ANIMATION_HISTORY = getById('animation-history')

//CONTAINER IN OTHER CLIENTS WATCHED SETION
const OTHER_WATCHED_CONTAINER = getById('other-watched-container');

//FOCUS-BAR SECTION
const FOCUS_BAR = getById('focus-section');

//RADIO BUTTONS CONTAINER IN FOCUS-BAR SECTION
const DOTS_CONTAINER = getById('dots-container');

//RADIO BUTTONS CONTAINER IN OTHER CLIENTS WATCHED
const DOTS_CONTAINER_OTHER = getById('other-dots-container');

//ALL RADIO BUTTONS IN FOCUS SECTION
const ALL_RADIO_BUTTONS = document.getElementsByClassName('dots');

//ALL RADIO BUTTONS IN OTHER CLIENTS WATCHED
const ALL_OTHER_BUTTONS = document.getElementsByClassName('other-dots');

//CONTAINERS IN TOP BRANDS
const TOP_BRANDS = getById("topBrands");
const MOBILE_BRANDS = getById("mobileBrands");
const ELECTRONIC_BRANDS = getById("electronicsBrands");
const HEALTH_BRANDS = getById("healthBrands");
const FASHION_BRANDS = getById("fashionBrands");
const ALL_BRANDS_SECTION = document.getElementsByClassName('brands');
const MOST_POPULAR_STYLE = getById('most-popular');

// SECTIONS
const FOCUS_SECTION = getById('focus-section');
const MAIN_MENU = getById('main');
const OPTIONS_PANEL = getById('optionsPanel');
const MOBILE_SECTION = getById('mobile-bar');
const MOBILE_APP = getById('mobile-app');
const TV_SECTION = getById('tv-bar');
const TOP_SECTION = getById('top');
const BIG_TECHNOLOGIES = getById('big-technologies');
const BULLETIN = getById('bulletin');
const OPEN_ITEM = getById('open-item-section');

//RAITING STARS
const RAITING_STARS = document.getElementsByClassName('stars');

//OPEN ITEM CONTAINER
let OPEN_ITEM_CONTAINER = getById('open-item-container');