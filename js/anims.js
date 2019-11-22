/**
 * Variables
 */

const animatedElements = document.querySelectorAll("[data-scroll-animation]");

const SCROLLANIMATE_CLASS = "js-scroll-animate";
const RUNNING_CLASS = "is-running";
const PAUSED_CLASS = "is-paused";

/**
 * observer options
 *
 * `root: null` viewport as intersection observer target
 * `threshold: 0.25` fire when 25% of the objects are in the viewport
 */

let observerOptions = {
  root: null,
  threshold: 0.5
};

/**
 * Intersection Observer
 * Swap running / paused classes
 */
let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(PAUSED_CLASS);
      entry.target.classList.add(RUNNING_CLASS);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/**
 * Choose animation classes to apply
 */

function whichType(animationType) {
  animationType = animationType.toLowerCase();
  let cssClass = `js-scroll-animate--${animationType}`;
  return cssClass;
}

/**
 * Initialize
 *
 * Apply observer to all animated elements
 */

function init() {
  // cut the mustard
  if (!"IntersectionObserver" in window) {
    return false;
  }

  animatedElements.forEach(el => {
    el.classList.add();
    let animClass = whichType(el.dataset.scrollAnimationType);
    el.classList.add(animClass);
    observer.observe(el);
  });

  // loop through elements
  // add classes and observer
  animatedElements.forEach(el => {
    el.classList.add(SCROLLANIMATE_CLASS);
    el.classList.add(PAUSED_CLASS);
    let animClass = whichType(el.dataset.scrollAnimationType);
    el.classList.add(animClass);
    observer.observe(el);
  });
}

export default { init };
