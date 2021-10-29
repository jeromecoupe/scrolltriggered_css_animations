# Scroll-triggered CSS animations

- Use ES6 modules and feature detection as Cut the Mustard test
- Use intersectionObserver
- Elements displayed on pages if JS is not supported

[Demo](https://jeromecoupe.github.io/onscroll_css_animations/)

## Usage

### Basic usage

Add a `data-scrollanimation="true"` and either a `data-scroll-animation-type="slideFromBottom"`,  `data-scroll-animation-type="slideFromLeft"` or `data-scroll-animation-type="slideFromRight"` data attribute to elements you wish to animate.

- Animation classes are set via JS
- All animations are switched to running when animated elements are displayed in the viewport. If elements are in the viewport when the page is loaded, animations will be triggered immediately.
- Adding new animations types using CSS is really easy.

### Utilities

Delays can be specified using `data-scrollanimation-delay=[valid CSS delay]"`. The following data attribute will delay an animation by 0.5 seconds: `data-scrollanimation-delay=0.5s]"`. Delays are added as inline styles via JS.

## Installation

- Install node and NPM
- run `npm i`
- run `npm run watch`
