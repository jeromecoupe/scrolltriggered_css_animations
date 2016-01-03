var cssAnimations = (function () {

  'use strict';

  var scrollInterval = 200; //miliseconds
  var animationClass = "js-animate";
  var animationActiveClass = "js-animate--active";
  var animatedElements = document.querySelectorAll("[data-animation='animated']");
  var delayedElements = document.querySelectorAll("[data-animation-delay");

  console.log(animatedElements);

  // initiate
  var initiate = function () {

    // cut the mustard test
    if ( ! _cutTheMustard() ) {
      return;
    }

    // add inline styles for delayed elements
    _addDelays();

    // add animation classes
    _addAnimationClasses();

    window.addEventListener('load', _runAnimations, false);

    // throttled scroll event
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

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

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
    console.log((rect.bottom - rect.height) + "///" +  window.innerHeight);

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
