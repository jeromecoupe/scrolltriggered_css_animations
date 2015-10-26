# Scroll-triggered css animations

In needed to trigger CSS animation onScroll for an upcoming project. I didn't want to rely on jQuery and needed something that would remain usable with JS turned off so I decided to have a shot at it. Here is the result.

This is still a Work in Progress to a few things still need to be improved but the base is solid enough for me to put it out there.

## Goals

- Throttled scroll
- Animations powered by data attributes
- All elements on pages if JS is not supported
- Easy to make compatible with [Animate CSS](http://daneden.github.io/animate.css/)

## Usage

Add a `.js-animate` class to any element you wish to animate and provide a `data-animation-type` attribute with one of the following values:

- `slidefromleft`
- `slidefromright`
- `slidefromtop`
- `slidefrombottom`
- `zoomin`

All animation classes are added via JS so elements will be displayed statically on the page if JS is not available.

All animations play state are set to `paused` by default. They are switched to `running` via a `.js-animate--active` added via JS upon scroll and when the animated element is entirely displayed in the viewport.

## Demo

Here is a [small demo](http://jeromecoupe.github.com/) (to be updated)
