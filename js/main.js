// Attendre que tout le contenu HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. ANNÉE DYNAMIQUE DANS LE FOOTER (Exigence Sujet)
    // ==========================================================================
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

        // 2. NAVBAR DYNAMIQUE AU DÉFILEMENT 
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
        // recuperation du theme actuel
        const currentTheme = htmlElement.getAttribute("data-theme");
        let newTheme = "light";
        
        // passage de mode dark et light
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

    // ==========================================================================
    // 9. VALIDATION DU FORMULAIRE DE CONTACT (Exigence Sujet)
    // ==========================================================================
    const form = document.getElementById("registrationForm");
    const successMessageContainer = document.getElementById("formSuccessMessage");

    if (form) {
        form.addEventListener("submit", (event) => {
            // Empêcher le rechargement de la page par défaut lors de la soumission
            event.preventDefault();

            // Récupération des éléments du formulaire
            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            const participationType = document.getElementById("participationType");
            const country = document.getElementById("country");
            const message = document.getElementById("message");

            // Variable de contrôle pour savoir si tout est valide
            let isFormValid = true;

            // --- FONCTION UTILITAIRE DE VALIDATION ---
            function validateField(inputElement, errorElementId, errorMessage, validationCondition) {
                const errorSpan = document.getElementById(errorElementId);
                
                if (validationCondition) {
                    // Le champ est valide : bordure verte, effacer le texte d'erreur
                    inputElement.style.borderColor = "#10b981"; 
                    errorSpan.textContent = "";
                } else {
                    // Le champ est invalide : bordure rouge, afficher le texte d'erreur
                    inputElement.style.borderColor = "#dc2626";
                    errorSpan.textContent = errorMessage;
                    isFormValid = false; // Bloque la validation globale du formulaire
                }
            }

            // 1. Validation du Nom Complet (Requis)
            validateField(
                fullName, 
                "fullNameError", 
                "Le nom complet est obligatoire.", 
                fullName.value.trim() !== ""
            );

            // 2. validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(
                email, 
                "emailError", 
                "Veuillez entrer une adresse email valide.", 
                emailRegex.test(email.value.trim())
            );

            // 3. Validation du Téléphone (Minimum 8 chiffres)
            const phoneDigitsOnly = phone.value.replace(/\s/g, ""); // Enlever les espaces saisis par l'utilisateur
            validateField(
                phone, 
                "phoneError", 
                "Le numéro de téléphone doit contenir au moins 8 chiffres.", 
                phoneDigitsOnly.length >= 8 && !isNaN(phoneDigitsOnly)
            );

            // 4. Validation du Type de Participation (Sélection obligatoire)
            validateField(
                participationType, 
                "participationTypeError", 
                "Veuillez choisir un type de participation.", 
                participationType.value !== ""
            );

            // 5. Validation du Pays (Sélection obligatoire)
            validateField(
                country, 
                "countryError", 
                "Veuillez sélectionner votre pays.", 
                country.value !== ""
            );

            // 6. Validation du Message/Motivation (Minimum 20 caractères)
            validateField(
                message, 
                "messageError", 
                "Vos motivations doivent faire au moins 20 caractères.", 
                message.value.trim().length >= 20
            );

            // --- TRAITEMENT DU SUCCÈS DE SOUMISSION ---
            if (isFormValid) {
                // Remplir et afficher le bloc de succès stylisé
                successMessageContainer.textContent = `Félicitations ${fullName.value.trim()}, votre demande d'inscription pour le type "${participationType.options[participationType.selectedIndex].text}" a été validée avec succès !`;
                successMessageContainer.style.display = "block";

                // Réinitialiser les champs du formulaire après le succès
                form.reset();

                // Nettoyer les bordures vertes après réinitialisation
                const allInputs = [fullName, email, phone, participationType, country, message];
                allInputs.forEach(input => {
                    input.style.borderColor = "var(--border-color)";
                });

                // Faire défiler l'écran doucement vers le haut du formulaire pour voir le message de succès
                successMessageContainer.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                // Masquer le message de succès si de nouvelles erreurs sont présentes
                successMessageContainer.style.display = "none";
            }
        });
    }




    // ==========================================================================
    // 10. COMPTE À REBOURS EN TEMPS RÉEL (Exigence Sujet)
    // ==========================================================================
    // Date cible fictive de la conférence : 15 Octobre 2026 à 09:00:00
    const targetDate = new Date("October 15, 2026 09:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Si la date est dépassée
        if (difference < 0) {
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) countdownEl.innerHTML = "<h3>Le sommet a commencé !</h3>";
            return;
        }

        // convertions mathematique du temps
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Injection dans le code HTML avec un formatage à 2 chiffres (ex: 09 au lieu de 9)
        if (document.getElementById("days")) {
            document.getElementById("days").textContent = days < 10 ? "0" + days : days;
            document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    // Mettre à jour le compte à rebours toutes les secondes
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Exécution immédiate au chargement