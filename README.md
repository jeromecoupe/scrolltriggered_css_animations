# Progressively enhanced CSS animation onScroll

In needed to trigger CSS animation onScroll for an upcoming project. I didn't want to rely on jQuery and needed something that would remain usable with JS turned off so I decided to have a shot at it. Here is the result.

This is still a Work in Progress to a few things still need to be improved but the base is solid enough for me to put it out there.

## Goals

- Throttled scroll
- Animations powered by data attributes
- All elements on pages if JS is not supported
- Easy to make compatible with [Animate CSS](http://daneden.github.io/animate.css/)
