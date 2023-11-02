function initSkills () {
    document.querySelectorAll('.logo').forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            // Met en pause l'animation du logo et de son conteneur.
            logo.classList.add('paused-animation');
            logo.closest('.logo-container').classList.add('paused-animation');
        });

        logo.addEventListener('mouseleave', () => {
            // Reprend l'animation.
            logo.classList.remove('paused-animation');
            logo.closest('.logo-container').classList.remove('paused-animation');
        });
});
}

document.addEventListener("DOMContentLoaded", initSkills);