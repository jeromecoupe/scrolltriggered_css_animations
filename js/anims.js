/**
 * Variables
 */

let animatedElements = document.querySelectorAll(".js-animate-scroll");
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
 *
 * Swap classes
 */
let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(PAUSED_CLASS);
      entry.target.classList.add(RUNNING_CLASS);
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.add(PAUSED_CLASS);
    }
  });
}, observerOptions);

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

  // loop through elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

export default { init };
