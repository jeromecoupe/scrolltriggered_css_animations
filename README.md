# Scroll-triggered css animations

I needed to trigger CSS animation onScroll for an upcoming project. I didn't want to rely on jQuery and needed something that would remain usable with JS turned off so I decided to have a shot at it. Here is the result.

This is still a Work in Progress to a few things still need to be improved but the base is solid enough for me to put it out there.

## Goals

- Throttled scroll events
- Animations powered by data attributes
- All elements displayed on pages if JS is not supported

## Usage

Add `data-animation="animated"` attribute to any element you wish to animate and provide a `data-animation-type` attribute with one of the following values:

- `slidefromleft`
- `slidefromright`
- `slidefromtop`
- `slidefrombottom`
- `zoomin`

A `data-animation-delay="0.2s"` attribute can also be added if you need delays.

- All animations play state are set to `paused` by default. They are switched to `running` via a `.js-animate--active` added via JS upon scroll and when the animated element is displayed in the viewport. If elements are in the viewport when the page is loaded, they are displayed immediately.
- All animation classes are added via JS so elements will be displayed statically on the page if JS is not available.
- Adding new animations types using CSS is really easy.

## Sample HTML

```html
<div data-animation="animated" data-animation-type="zoomin">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas recusandae aliquam et aut eligendi, facere assumenda consectetur hic saepe molestias, optio atque placeat earum natus illum dignissimos sequi labore repudiandae.</p>
</div>
<p>Quam porro maxime distinctio nulla officiis ullam, iure eaque. Assumenda quasi repellendus sequi suscipit corporis expedita ea nostrum vero, minima debitis, provident accusantium modi! Facere eaque optio quidem quia placeat.</p>
<ul>
  <li data-animation="animated" data-animation-type="slidefromright">Beatae, nulla. Ipsum sit rem delectus commodi dolorem a temporibus</li>
  <li data-animation="animated" data-animation-type="slidefromright" data-animation-delay="0.2s">Beatae, nulla. Ipsum sit rem delectus commodi dolorem a temporibus</li>
  <li data-animation="animated" data-animation-type="slidefromright" data-animation-delay="0.4s">Beatae, nulla. Ipsum sit rem delectus commodi dolorem a temporibus</li>
</ul>
```

## Demo

Here is a [small demo](http://jeromecoupe.github.com/onscroll_css_animations) (to be updated)
