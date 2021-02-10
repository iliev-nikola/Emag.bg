// Search bar on focus
const searchBox = document.querySelector('.searchbox');
const searchBar = document.getElementById('search');
const searchForm = document.getElementById('searchForm');
const submitBtn = document.getElementById('submitBtn');
const profileNav = document.getElementsByClassName('profile-nav')[0];
const profileIcon = document.getElementsByClassName('profile-icon')[0];
searchBar.addEventListener('focus', () => {
    searchBox.style.display = 'block';
    searchForm.style.borderBottomLeftRadius = 0;
    searchForm.style.borderBottomRightRadius = 0;
    searchForm.style.borderBottom = 'none';
    submitBtn.style.borderBottomRightRadius = 0;
    searchForm.style.backgroundColor = 'white';
    document.body.style.pointerEvents = 'none';
    searchForm.style.pointerEvents = 'all';
    searchBox.style.pointerEvents = 'all';
    searchBar.addEventListener('focusout', () => {
        searchBox.style.display = 'none';
        searchForm.style.borderBottom = '1px solid #0082e6';
        searchForm.style.borderBottomLeftRadius = '25px';
        searchForm.style.borderBottomRightRadius = '25px';
        submitBtn.style.borderBottomRightRadius = '25px';
        document.body.style.pointerEvents = 'all';
    });
});