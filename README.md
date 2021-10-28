# Scroll-triggered CSS animations

- Use ES6 modules and feature detection as Cut the Mustard test
- Use intersectionObserver
- Elements displayed on pages if JS is not supported

# Usage

Add a `data-scrollanimation="true"` and either a `data-scroll-animation-type="slideFromBottom"`,  `data-scroll-animation-type="slideFromLeft"` or `data-scroll-animation-type="slideFromRight"` data attribute to elements you wish to animate.

- All animations classes are set via JS
- All animations are switched to running when animated elements are displayed in the viewport. If elements are in the viewport when the page is loaded, animations will be triggered immediately.
- Adding new animations types using CSS is really easy.

## Installation

- Install node and NPM
- run `npm i`
- run `npm run watch`
