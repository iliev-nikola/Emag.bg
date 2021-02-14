function createDots(array, container) {
    for (let i = 0; i < array.length / 6; i++) {
        let dot = createNewElement('input');
        dot.type = 'radio';
        dot.name = 'radio-button';
        dot.className = 'dots';
        dot.value = i + 1;
        container.append(dot);
        if (dot.value === i) {
            dot.checked = true;
        }
    }
}
createDots(focusSectionItems.allItems, DOTS_CONTAINER);
createDots(otherWatched.allItems, DOTS_CONTAINER_OTHER);