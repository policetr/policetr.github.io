
let currentSectionIndex = 0; // Déclaration unique au niveau global
const footerElement = document.querySelector('footer');
const mainElement = document.querySelector('main');

document.addEventListener("DOMContentLoaded", () => {
    loadAllSections();
    setupScrolling();
    setupNavLinks();
    document.querySelector('nav a').classList.add('active'); // Met en évidence le premier lien
});

function setupNavLinks() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            const sections = document.querySelectorAll("main > section");
            const sectionIndex = Array.from(sections).findIndex(section => section.id === sectionId);
            if (sectionIndex >= 0) {
                changeSection(sectionIndex, sections);
            }
        });
    });
}

function loadAllSections() {
    const sections = ["about"];
    sections.forEach(section => {
        loadSection(section, `sections/${section}.html`);
    });
}

function setupScrolling() {
    const sections = document.querySelectorAll("main > section");
    const totalSections = sections.length;

    window.addEventListener("wheel", (event) => {
        if (event.deltaY > 0) {
            // Scroll vers le bas
            if (currentSectionIndex < totalSections - 1) {
                currentSectionIndex++;
                changeSection(currentSectionIndex, sections);
            }
        } else {
            // Scroll vers le haut
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                changeSection(currentSectionIndex, sections);
            }
        }
    });
}

function changeSection(index, sections) {
    const currentSection = document.querySelector('.section-visible');
    if (currentSection) {
        currentSection.classList.add('fade-out');
        currentSection.classList.remove('section-visible');
    }
    updateActiveTab(sections[index].id);
    setTimeout(() => {
        sections.forEach(section => section.classList.remove('fade-in', 'fade-out'));
        currentSectionIndex = index;
        sections[index].classList.add('section-visible', 'fade-in');
        loadSection(sections[index].id, `sections/${sections[index].id}.html`);
        
        // Gère la translation du footer
        if (sections[index].id === 'contact') {
            footerElement.classList.remove('footer-slide-down');
            footerElement.classList.add('footer-slide-up');
            mainElement.classList.add('main-adjusted-height'); // Ajuste la hauteur de <main>
        } else {
            footerElement.classList.remove('footer-slide-up');
            footerElement.classList.add('footer-slide-down');
            mainElement.classList.remove('main-adjusted-height'); // Rétablit la hauteur de <main>
        }

    }, 500); // correspond à la durée de l'animation CSS
}



function updateActiveTab(activeSectionId) {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${activeSectionId}`) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function loadSection(sectionId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(sectionId).innerHTML = data;
            document.getElementById(sectionId).classList.add('loaded');
            if(sectionId === 'timeline') {
                initializeTimeline(); // Fonction définie dans timeline.js
            }
            if(sectionId === 'adventures') {
                initAdventures(); // Fonction définie dans timeline.js
            }
        });
}

function openModal(src) {
    // Affiche le modal
    document.getElementById('imageModal').style.display = "block";
    // Met à jour la source de l'image
    document.getElementById('img01').src = src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}


function checkScreenRatio() {
    const ratio = window.innerWidth / window.innerHeight;
    const minRatio = 1.32; // Mettez ici la valeur que vous considérez comme limite pour le ratio d'écran
    if (ratio < minRatio) {
      document.getElementById('popup-ratio').style.display = 'flex';
    }
  }
  
  function closePopup() {
    document.getElementById('popup-ratio').style.display = 'none';
  }
  
  // Vérifiez le ratio lors du chargement de la page
  window.onload = checkScreenRatio;
  
  // Optionnel : révérifier lorsque la fenêtre est redimensionnée
  window.onresize = checkScreenRatio;