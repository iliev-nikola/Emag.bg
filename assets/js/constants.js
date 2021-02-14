// SEARCH BAR
const SEARCH_BOX = document.querySelector('.searchbox');
const SEARCH_BAR = getById('search');
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
let rightScroll = getById('right-scroll');
let leftScroll = getById('left-scroll');

//BUTTONS IN OTHER CLIENTS WATCHED SECTION
let rightOtherScroll = getById('other-right-scroll');
let lefttOtherScroll = getById('other-left-scroll');

//CONTAINER IN FOCUS-BAR SECTION
let cardsContainer = getById('cards-container');
let watchedItems = getById('watched-items');

//CONTAINER IN HISTORY SECTION
let watchedContainer = getById('history-section');

//DELETE ITEMS - HISTORY SECTION
let deleteWatched = getById('delete-watched');

//ANIMATION CONTAINER IN HISTORY SECTION
let animationHistory = getById('animation-history')

//CONTAINER IN OTHER CLIENTS WATCHED SETION
let otherWatchedContainer = getById('other-watched-container');