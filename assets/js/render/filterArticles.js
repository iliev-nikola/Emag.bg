const filter = (function () {
    function onlyOneCheckbox(checkbox) {
        const checkboxes = document.getElementsByName(checkbox.name);
        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false
        });
    }

    return {
        onlyOneCheckbox,
    }
})();