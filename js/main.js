// Attendre que tout le contenu HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. ANNÉE DYNAMIQUE DANS LE FOOTER (Exigence Sujet)
    // ==========================================================================
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 2. NAVBAR DYNAMIQUE AU DÉFILEMENT (Exigence Sujet)
    // ==========================================================================
    const header = document.querySelector(".main-header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            // On ajoute une classe CSS (que nous styliserons pour l'ombre et le fond complet)
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // ==========================================================================
    // 3. GESTION DU DARK / LIGHT MODE PERSISTANT (Exigence Sujet)
    // ==========================================================================
    const themeToggleBtn = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;
    
    // Vérifier si un thème est déjà sauvegardé dans le localStorage du navigateur
    const savedTheme = localStorage.getItem("theme");
    
    // Si un thème existe, on l'applique immédiatement
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggleBtn.addEventListener("click", () => {
        // On récupère le thème actuel
        const currentTheme = htmlElement.getAttribute("data-theme");
        let newTheme = "light";
        
        // Si on est en light, on passe en dark, et inversement
        if (currentTheme !== "dark") {
            newTheme = "dark";
        }
        
        // Application du nouveau thème sur la balise HTML et sauvegarde
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    // Fonction utilitaire pour changer le look de l'icône de l'interrupteur
    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector("i");
        if (theme === "dark") {
            icon.className = "bi bi-sun-fill"; // Icône Soleil en mode sombre
        } else {
            icon.className = "bi bi-moon-stars"; // Icône Lune en mode clair
        }
    }

    // ==========================================================================
    // 4. GESTION DES ONGLETS DU PROGRAMME (Exigence Sujet)
    // ==========================================================================
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Retirer la classe 'active' de tous les boutons d'onglets
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // 2. Retirer la classe 'active' de tous les panneaux de planning
            tabPanels.forEach(panel => panel.classList.remove("active"));

            // 3. Ajouter la classe 'active' sur le bouton cliqué
            button.classList.add("active");
            
            // 4. Récupérer l'identifiant du jour à afficher (ex: 'day1', 'day2'...)
            const targetDay = button.getAttribute("data-day");
            const targetPanel = document.getElementById(targetDay);
            
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

});

// ==========================================================================
    // 5. FILTRAGE DYNAMIQUE DES INTERVENANTS (Exigence Sujet)
    // ==========================================================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const speakerCards = document.querySelectorAll(".speaker-card-main");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Mettre en évidence le bouton actif
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            speakerCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                // Si "Tous" est sélectionné ou si la catégorie correspond
                if (filterValue === "all" || filterValue === cardCategory) {
                    card.style.display = "block"; // Affiche la carte
                } else {
                    card.style.display = "none";  // Cache la carte
                }
            });
        });
    });

    // ==========================================================================
    // 6. BOUTON RETOUR EN HAUT (Exigence Sujet)
    // ==========================================================================
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            // Apparaît après 300px de défilement
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        // Remonte en douceur au clic
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================================================
    // 7. MENU HAMBURGER MOBILE (Exigence Sujet)
    // ==========================================================================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            
            // Change l'icône entre le menu "liste" et la croix "X"
            const icon = hamburger.querySelector("i");
            if (navLinks.classList.contains("open")) {
                icon.className = "bi bi-x-lg";
            } else {
                icon.className = "bi bi-list";
            }
        });
    }

    // ==========================================================================
    // 8. ANIMATIONS D'APPARITION AU SCROLL (Intersection Observer) (Exigence Sujet)
    // ==========================================================================
    const observerOptions = {
        root: null, // utilise le viewport par défaut
        threshold: 0.15, // se déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // On ajoute une classe qui déclenche la transition CSS
                entry.target.classList.add("appeared");
                // Une fois animé, on arrête d'observer cet élément
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Cibler tous les éléments ayant la classe 'scroll-reveal'
    const elementsToReveal = document.querySelectorAll(".scroll-reveal");
    elementsToReveal.forEach(el => {
        scrollObserver.observe(el);
    });