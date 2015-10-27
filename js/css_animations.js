var cssanimations = (function () {

  'use strict';

  var timer = Date.now();
  var scrollInterval = 200; //miliseconds
  var activeAnimationClass = "js-animate--active";
  var animatedElements = document.querySelectorAll(".js-animate");

  // initiate
  var initiate = function () {

    // cut the mustard test
    if ( ! _cutTheMustard() ) {
      return;
    }

    // throttled scroll event
    window.addEventListener('scroll', _throttleScroll, false);

    // add animation classes
    _addAnimationClasses();

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
      var animationClass = "js-animate--" + el.getAttribute('data-animation-type');
      el.classList.add(animationClass);
    }

  };

  var _runAnimations = function () {

    for (var i = 0; i < animatedElements.length; i++) {
      var el = animatedElements[i];
      if ( _isInViewport(el) && !el.classList.contains(activeAnimationClass) ) {
        el.classList.add(activeAnimationClass);
      }
    }

  };

  // throttled scroll
  var _throttleScroll = function(){

    var scrollTimer = Date.now();

    if (scrollTimer - timer >= scrollInterval) {
      _runAnimations();
      timer = scrollTimer;
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
        && (rect.bottom - (rect.height/2)) <= (window.innerHeight || document.documentElement.clientHeight)
    );

  };

  return {

    init:initiate

  };

})();

cssanimations.init();
