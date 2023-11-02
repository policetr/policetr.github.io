function pxToVw(px) {
    // Récupérer la largeur de la fenêtre du navigateur en pixels
    const screenWidth = window.innerWidth;
  
    // Convertir les pixels en vw et arrondir le résultat à l'entier le plus proche
    return Math.round((px / screenWidth) * 100);
}

function vwToPx(vw) {
    // Récupérer la largeur de la fenêtre du navigateur en pixels
    const screenWidth = window.innerWidth;

    // Convertir les vw en pixels
    return vw * screenWidth / 100;
}


function positionBulle(elementFrise, bulle) {
    const conteneurParent = document.querySelector('#all-container');
    const elementRect = elementFrise.getBoundingClientRect();
    const conteneurRect = conteneurParent.getBoundingClientRect();

    // Obtenir la largeur de la bulle
    const bulleWidth = pxToVw(bulle.offsetWidth);


    const position = elementRect.left - conteneurRect.left ;
    console.log("largeur ",bulleWidth);
    console.log("position", pxToVw(elementRect.left));
    bulle.style.left = position - vwToPx(4.95)+ 'px';
    console.log("position de la bulle", pxToVw(bulle.getBoundingClientRect().left));
}


function initializeTimeline() {
    // Sélectionner tous les ronds
    const ronds = document.querySelectorAll('.element-frise');
    console.log(ronds);
  
    ronds.forEach(function(rond) {
        rond.addEventListener('mouseover', function() {
            selection = rond.getElementsByClassName("rond");
            selection[0].style.backgroundColor="white";
            const bulle = document.getElementById(rond.id);
            positionBulle(rond, bulle);
            // Afficher la bulle correspondante
            bulle.style.display = 'flex';
        });

    });
}



// Initialiser la timeline quand le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", initializeTimeline);
