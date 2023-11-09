/**
 * Variables
 */

// Element to be animated (data attribute)
const animatedElements = document.querySelectorAll("[data-scrollanimation]");

// Observer threshold
const observerThreshold = 0.5;

// Observer options
const observerOptions = {
  // root: null - the root element is the viewport
  root: null,
  // threshold 0.5 - at least 50% of the observed objects need to collide with the root
  threshold: observerThreshold,
};

/**
 * Add animation classes to element
 * @param {DOM node} el - target DOM node
 */
function addAnimationClasses(el) {
  // prepare values
  let animationClass = el.dataset.scrollanimationClass;
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

/**
 * Handle Intersections
 * @params {IntersectionObserverEntries} observerEntries - list of observed entries
 * @params {Observer} observer - intersectionObserver
 */
function handleIntersections(observerEntries, observer) {
  // WARNING: intersectionObserver is like an RFID chip attached to elements
  // if you need to target the element to which the RFID chip is attached, you need to use `entry.target` and not `entry` itself.
  observerEntries.forEach(function (entry) {
    // if intersectionRatio > threshold (element visible)
    // do nothing and remove the observer
    if (entry.intersectionRatio > observerThreshold) {
      observer.unobserve(entry.target);
    }
    // if intersectionRatio > threshold (element not visible)
    // add animation classes and pause animations
    if (entry.intersectionRatio < observerThreshold) {
      addAnimationClasses(entry.target);
    }
    // if element is intersecting
    // play animations
    if (entry.isIntersecting) {
      playAnimation(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

function init() {
  // if IntersectionObserver is not supported, bail out
  if (!"IntersectionObserver" in window) return;

  /**
   * IntersectionObserver detects collisions between a root elmement and target elements
   * The mecanism is similar to RFID chips attached to elements adn the root.
   * IntersectionObserver detects collisions between both RFID chips.
   * <https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API>
   *
   * When created, IntersectionObserver takes two parameters
   * - A callback function used by the observer. The following parameters get passed to it.
   *   - observed entries
   *   - the observer
   * - An options object: cf supra (root and threshold)
   *   - root: the element with which oberverEntries will collide (null = viewport)
   *   - threshold: the proportion of the entries that need to collide with the root
   *                for the collision to be observed
   */
  const observer = new IntersectionObserver(
    handleIntersections,
    observerOptions
  );

  /**
   * attacher un observer à chaque element
   */
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
}

export { init };
