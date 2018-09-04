# Scroll-triggered css animations

I needed to trigger CSS animation onScroll for an upcoming project. I didn't want to rely on jQuery and needed something that would remain usable with JS turned off so I decided to have a shot at it. Here is the result.

This is still a Work in Progress to a few things still need to be improved but the base is solid enough for me to put it out there.

## Goals

- Use ES6 modules and feature detection as Cut the Mustard test
- Use intersectionObserver
- All elements displayed on pages if JS is not supported

## Usage

Add a `js-animate-scroll` class to any element you wish to animate. Add a `js-animate-scroll--left` or `js-animate-scroll--right` class.

- All animations play state are set to `paused` by JavaScript, which mean they will run once onload when JavaScript is not supported. They are switched to `running` via JS upon scroll and when the animated element is displayed in the viewport. If elements are in the viewport when the page is loaded, animations will be triggered immediately.
- Adding new animations types using CSS is really easy.

## Demo

Here is a [small demo](http://jeromecoupe.github.com/onscroll_css_animations) (to be updated)
