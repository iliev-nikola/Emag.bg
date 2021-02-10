// Search bar
function onFocus() {
    SEARCH_BOX.style.display = 'block';
    SEARCH_FORM.style.borderBottomLeftRadius = 0;
    SEARCH_FORM.style.borderBottomRightRadius = 0;
    SEARCH_FORM.style.borderBottom = 'none';
    SUBMIT_BUTTON.style.borderBottomRightRadius = 0;
    SEARCH_FORM.style.backgroundColor = 'white';
    document.body.style.pointerEvents = 'none';
    SEARCH_FORM.style.pointerEvents = 'all';
    SEARCH_BOX.style.pointerEvents = 'all';
    SEARCH_BAR.addEventListener('focusout', onFocusOut);
}

function onFocusOut() {
    SEARCH_BOX.style.display = 'none';
    SEARCH_FORM.style.borderBottom = '1px solid #0082e6';
    SEARCH_FORM.style.borderBottomLeftRadius = '25px';
    SEARCH_FORM.style.borderBottomRightRadius = '25px';
    SUBMIT_BUTTON.style.borderBottomRightRadius = '25px';
    document.body.style.pointerEvents = 'all';
}