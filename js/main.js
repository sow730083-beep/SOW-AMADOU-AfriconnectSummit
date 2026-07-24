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