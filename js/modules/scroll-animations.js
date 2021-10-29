// data attibute pour dire que l'animation devient active
const runningAttribute = "data-scrollanimation-running";

// element à animer
const animatedElements = document.querySelectorAll("[data-scrollanimation]");

/**
 * IntersectionObserver détecte des collisions entre un élément racine et un élément cible. Le mécanisme est analogue à celui de deux puces RFID attachées aux éléments, dont on détecte la collision
 *
 * - racine: définie dans les options d'IntersectionObserver (root)
 * - cible: le ou les éléments auxquels sont attachés la "puce RFID" d'IntersectionObserver
 */
const observerOptions = {
  // root: défini le viewport comme élément racine
  // threshold 0.5: 50% de l'objet cible doit être en collision avec l'élément racine
  root: null,
  threshold: 0.5,
};

function init() {
  if (!"IntersectionObserver" in window) return;
  /**
   * Création d'observer: prend une fonction de callback et des options
   *
   * - callback (function): on regarde si un des item intersecte
   *   si oui on start l'animation et on supprime l'observer
   * - option: cf supra (racine et threshold)
   */
  const observer = new IntersectionObserver(function (observerEntries) {
    observerEntries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // attention intersection observer ne s'applique pas directement à des éléments (comme une puce RFID). Si vous voulez cibler l'élément auquel est attachée la puce RFID, il faut utiliser el.target
        entry.target.setAttribute(runningAttribute, true);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  /**
   * ajout des classes d'animation
   * attacher un observer à chaque element
   */
  animatedElements.forEach(function (el) {
    // generate animation classes
    let animationClass = el.dataset.scrollanimationType;
    el.classList.add(animationClass);
    // generate delays (inline styles)
    let delay = el.dataset.scrollanimationDelay;
    el.style.animationDelay = delay;
    observer.observe(el);
  });
}

export { init };
