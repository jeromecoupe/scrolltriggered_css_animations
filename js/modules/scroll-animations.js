// elements à animer
const animatedElements = document.querySelectorAll("[data-scrollanimation]");

// observer threshold
const observerThreshold = 0.5;

/**
 * IntersectionObserver détecte des collisions entre un élément racine et un élément cible.
 * Le mécanisme est analogue à celui de deux puces RFID attachées aux éléments, dont on détecte la collision
 * - racine: définie dans les options d'IntersectionObserver (root = viewport)
 * - cible: le ou les éléments auxquels sont attachés la "puce RFID" d'IntersectionObserver
 */
const observerOptions = {
  // root: null - défini le viewport comme élément racine
  // threshold 0.5 - 50% de l'objet cible doit être en collision avec l'élément racine
  root: null,
  threshold: observerThreshold,
};

/**
 * Add animation classes to element
 * @param {DOM node} el - target DOM node
 */
function addAnimationClasses(el) {
  // prepare values
  let animationClass = el.dataset.scrollanimationType;
  let delay = el.dataset.scrollanimationDelay;
  // apply values
  el.classList.add(animationClass);
  el.style.animationDelay = delay;
  el.style.animationPlayState = "paused";
}

/**
 * Change the animation play state for element
 * @param {DOM node} el - target DOM node
 */
function playAnimation(el) {
  el.style.animationPlayState = "running";
}

function init() {
  if (!"IntersectionObserver" in window) return;

  /**
   * Création d'observer: prend une fonction de callback et des options
   *
   * - callback (function):
   *    - si intersection ratio > threshold: on supprime l'observer et on ne fait rien
   *    - si intersetcion ratio < threshold: on appliquer les classes d'animation et on pause
   *    - si intersection: on passe l'animation en play et on supprime l'observer
   * - option: cf supra (racine et threshold)
   */
  const observer = new IntersectionObserver(function (observerEntries) {
    // attention intersection observer ne s'applique pas directement à des éléments (comme une puce RFID). Si vous voulez cibler l'élément auquel est attachée la puce RFID, il faut utiliser entry.target
    observerEntries.forEach(function (entry) {
      if (entry.intersectionRatio > observerThreshold) {
        observer.unobserve(entry.target);
      }
      if (entry.intersectionRatio < observerThreshold) {
        addAnimationClasses(entry.target);
      }
      if (entry.isIntersecting) {
        playAnimation(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  /**
   * ajout des classes d'animation
   * attacher un observer à chaque element
   */
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
}

export { init };
