function updateNavigationPoints(activeIndex) {
    const points = document.querySelectorAll('#navPoints-container .point');
    points.forEach((point, index) => {
        if (index === activeIndex) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    });
}

function initAdventures() {
    const adventures = document.querySelectorAll('.adventure');
    const adventuresContainer = document.getElementById('adventures-container');
    const points = document.querySelectorAll('#navPoints-container .point');

    adventures.forEach((adventure, index) => {
        adventure.addEventListener('click', () => {
            adventuresContainer.style.transition = 'transform 0.5s ease-in-out';
            adventuresContainer.style.transform = `translateX(-${index * 85}vw)`;
            updateNavigationPoints(index);
        });
    });

    points.forEach((point, index) => {
        point.addEventListener('click', () => {
            adventuresContainer.style.transition = 'transform 0.5s ease-in-out';
            adventuresContainer.style.transform = `translateX(-${index * 85}vw)`;
            updateNavigationPoints(index);
        });
    });
}

document.addEventListener('DOMContentLoaded', initAdventures);
