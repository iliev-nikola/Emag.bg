// CREATING RADIO BUTTONS
function createDots(array, container) {
    for (let i = 0; i < array.length / 6; i++) {
        const dot = utils.createNewElement('input');
        dot.type = 'radio';
        if (container.id === 'dots-container') {
            dot.name = 'dots-container';
            dot.className = 'dots';
        } else {
            dot.name = 'other-dots-container';
            dot.className = 'other-dots';
        }

        dot.value = i + 1;
        container.append(dot);
        if (i === 0) {
            dot.checked = true;
        }
    }
}

createDots(focusSectionItems.allItems, DOTS_CONTAINER);
createDots(otherWatched.allItems, DOTS_CONTAINER_OTHER);