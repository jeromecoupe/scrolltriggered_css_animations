var cssAnimations = (function () {

  'use strict';

  // instantiate config variables
  var scrollInterval,
      animationClass,
      animationActiveClass,
      animatedElements,
      delayedElements;

  // initiate
  var initiate = function () {

    // cut the mustard test
    if ( ! _cutTheMustard() ) {
      return;
    }

    // populate config variables
    scrollInterval = 200; //miliseconds
    animationClass = "js-animate";
    animationActiveClass = "js-animate--active";
    animatedElements = document.querySelectorAll("[data-animation='animated']");
    delayedElements = document.querySelectorAll("[data-animation-delay");

    // add inline styles for delayed elements
    _addDelays(delayedElements);

    // add animation classes
    _addAnimationClasses(animatedElements);

    // run animations for elements in viewport upon page load
    window.addEventListener('load', _runAnimations(animatedElements), false);

    // debounced scroll event
    var throttledScroll = _throttle( function(){ _runAnimations(animatedElements) }, scrollInterval, false);
    window.addEventListener('scroll', throttledScroll, false);

  };

  // cust the mustard test
  var _cutTheMustard = function () {

    return ( 'querySelector' in document &&
             'addEventListener' in window &&
             'classList' in document.createElement('div') );

  };

  // add animations classes
  var _addAnimationClasses = function (elements) {

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];

      // add base animation class
      el.classList.add(animationClass);

      // add modifier class for animation type
      var animationTypeClass = "js-animate--" + el.getAttribute('data-animation-type');
      el.classList.add(animationTypeClass);
    }

  };


  // put animations in "running" mode
  // uses animation-play-state: running;
  var _runAnimations = function (elements) {

    for (var i = 0; i < elements.length; i++) {

      var el = elements[i];

      if ( _isInViewport(el) && !el.classList.contains(animationActiveClass) ) {
        el.classList.add(animationActiveClass);
      }
    }

  };


  // add delay styles in html
  var _addDelays = function(elements) {

    for (var i = 0; i < elements.length; i++) {

      var el = elements[i];
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

    return ( rect.top >= 0 &&
             (rect.bottom - rect.height) <= (window.innerHeight || document.documentElement.clientHeight) );

  };

  // debounce function
  // doesn't execute function again until after threshold has been reached (group events)
  // https://ict.ken.be/javascript-debounce-vs-throttle-function
  var _debounce = function (func, threshold) {

    var timer = null;

    return function () {

      var context = this, args = arguments;
      clearTimeout(timer);

      timer = setTimeout(function () {
        func.apply(context, args);
      }, threshold);

    };

  };

  // throttle function
  // diminishes the frequency of function execution using a certain threshold (regulates frequency)
  // https://ict.ken.be/javascript-debounce-vs-throttle-function
  var _throttle = function (func, threshold, scope) {

    threshold || (threshold = 250);

    var last, deferTimer;

    return function () {

      var context = scope || this;
      var now = +new Date, args = arguments;
      if (last && now < last + threshold) {

        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          func.apply(context, args);
        }, threshold);

      } else {

        last = now;
        func.apply(context, args);

      }

    };

  };

  return {

    init:initiate

  };

})();

cssAnimations.init();
