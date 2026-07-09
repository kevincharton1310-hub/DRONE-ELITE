/* ====== DRONE ELITE - SCRIPT JAVASCRIPT ====== */
/* Interactivité, animations et gestion des formulaires */

// ====== MENU MOBILE ======
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Ouvrir/fermer le menu mobile
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fermer le menu au clic en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ====== GESTION DU FORMULAIRE DE DEVIS ======
const devisForm = document.getElementById('devisForm');

if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(devisForm);
        const data = Object.fromEntries(formData);
        
        // Valider les données
        if (!validateForm(data)) {
            return;
        }
        
        // Afficher un message de traitement
        const submitBtn = devisForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler l'envoi
        setTimeout(() => {
            showSuccessMessage();
            devisForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ====== VALIDATION DU FORMULAIRE ======
function validateForm(data) {
    const requiredFields = ['nom', 'email', 'service', 'description', 'conditions'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            showErrorMessage(`Le champ "${field}" est obligatoire`);
            return false;
        }
    }
    
    if (!isValidEmail(data.email)) {
        showErrorMessage('L\'adresse email n\'est pas valide');
        return false;
    }
    
    return true;
}

// ====== VÉRIFIER LE FORMAT EMAIL ======
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ====== AFFICHER MESSAGE DE SUCCÈS ======
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    if (message) {
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 5000);
    }
}

// ====== FERMER MESSAGE DE SUCCÈS ======
function closeSuccessMessage() {
    const message = document.getElementById('successMessage');
    if (message) {
        message.classList.remove('show');
    }
}

// ====== AFFICHER MESSAGE D'ERREUR ======
function showErrorMessage(text) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 90px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #E74C3C;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        max-width: 500px;
    `;
    errorDiv.textContent = text;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 4000);
}

// ====== ANIMATION AU SCROLL ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .avis-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ====== HAUTEUR DE LA VIEWPORT ======
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

// ====== DÉTECTION RESIZE VIEWPORT ======
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (lastWidth !== currentWidth) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        lastWidth = currentWidth;
    }
});

// ====== LOG DE DÉMARRAGE ====== 
console.log('%c🛸 DRONE ELITE - Site vitrine chargé', 'color: #FF6B35; font-size: 14px; font-weight: bold;');
console.log('%cVersion 1.0 | Hébergé sur Cloudflare Pages', 'color: #004E89; font-size: 12px;');