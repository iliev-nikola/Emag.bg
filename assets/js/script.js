// Search bar on focus
const searchBox = document.querySelector('.searchbox');
const searchBar = document.getElementById('search');
const searchForm = document.getElementById('searchForm');
const submitBtn = document.getElementById('submitBtn');
searchBar.addEventListener('focus', () => {
    searchBox.style.display = 'block';
    searchForm.style.borderBottomLeftRadius = 0;
    searchForm.style.borderBottomRightRadius = 0;
    searchForm.style.borderBottom = 'none';
    submitBtn.style.borderBottomRightRadius = 0;
    searchForm.style.backgroundColor = 'white';
    searchBar.addEventListener('focusout', () => {
        searchBox.style.display = 'none';
        searchForm.style.borderBottom = '1px solid #0082e6';
        searchForm.style.borderBottomLeftRadius = '25px';
        searchForm.style.borderBottomRightRadius = '25px';
        submitBtn.style.borderBottomRightRadius = '25px';
    });
});