var cssAnimations = (function () {

  'use strict';

  var scrollInterval,
      animationClass,
      animationActiveClass,
      animatedElements,
      delayedElements;

  console.log(animatedElements);

  // initiate
  var initiate = function () {

    // cut the mustard test
    if ( ! _cutTheMustard() ) {
      return;
    }

    // initiate variables
    scrollInterval = 200; //miliseconds
    animationClass = "js-animate";
    animationActiveClass = "js-animate--active";
    animatedElements = document.querySelectorAll("[data-animation='animated']");
    delayedElements = document.querySelectorAll("[data-animation-delay");

    // add inline styles for delayed elements
    _addDelays();

    // add animation classes
    _addAnimationClasses();

    // run animations for elements in viewport upon page load
    window.addEventListener('load', _runAnimations, false);

    // debounced scroll event
    var animate = _debounce(_runAnimations, scrollInterval);
    window.addEventListener('scroll', animate, false);

  };

  var _cutTheMustard = function () {

    return (
      'querySelector' in document
      && 'addEventListener' in window
      && 'classList' in document.createElement('div')
    );

  };

  var _addAnimationClasses = function () {

    for (var i = 0; i < animatedElements.length; i++) {
      var el = animatedElements[i];

      // add base animation class
      el.classList.add(animationClass);

      // add modifier class for animation type
      var animationTypeClass = "js-animate--" + el.getAttribute('data-animation-type');
      el.classList.add(animationTypeClass);
    }

  };

  // all animations in "running" mode
  // uses animation-play-state: running;
  var _runAnimations = function () {

    for (var i = 0; i < animatedElements.length; i++) {

      var el = animatedElements[i];

      if ( _isInViewport(el) && !el.classList.contains(animationActiveClass) ) {
        el.classList.add(animationActiveClass);
      }
    }

  };

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var _debounce = function (func, threshold, execAsap) {

    var timeout;

    return function debounced () {

      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      };

      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(obj, args);
      }

      timeout = setTimeout(delayed, threshold || 100);

    };

  }

  // add delay styles in html
  var _addDelays = function() {

    for (var i = 0; i < delayedElements.length; i++) {

      var el = delayedElements[i];
      var delay = el.getAttribute('data-animation-delay');

      // vendor prefixes shenanigans
      var vendorPrefixes = [
        'WebkitAnimationDelay',
        'animationDelay'
      ];

      // applying vendor prefixes
      for (var j=0; j<vendorPrefixes.length; j++) {
        el.style[ vendorPrefixes[j] ] = delay;
      }
    }
  };

  // detect if element in viewport
  var _isInViewport = function (el) {

    var rect = el.getBoundingClientRect();

    // just checking top and bottom
    //
    // if you want animations to start before they are fully in the viewport
    // multiply rect-bottom by 0.9 or so
    // or use things like (rect.bottom - (rect.height / 2))

    return (
        rect.top >= 0
        && (rect.bottom - rect.height) <= (window.innerHeight || document.documentElement.clientHeight)
    );

  };

  return {

    init:initiate

  };

})();

cssAnimations.init();
