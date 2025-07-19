export const getNextZIndex = (): number => {
    const cards = document.querySelectorAll('.employee-card');
    let maxZIndex = 1;

    cards.forEach(card => {
        const zIndex = parseInt(window.getComputedStyle(card).zIndex || '1', 10);
        if (!isNaN(zIndex)) {
            maxZIndex = Math.max(maxZIndex, zIndex);
        }
    });

    return maxZIndex + 1;
};
