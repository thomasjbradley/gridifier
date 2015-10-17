# Gridifier

[Gridifier](http://tjb.io/grids) is a tool to build a responsive grid framework for modern websites.

*I use it on just about every website I create.* For me it’s an alternative to monolithic frameworks like Bootstrap and Foundation.

---

## Taught at Algonquin Graphic Design

These grid systems are taught as part of the [Algonquin College Graphic Design](http://algonquindesign.ca) program.

This tool is introduced to the students after they learn the “long, hard, stupid way.”

- [**☛ Grid system tutorials & videos**](http://learn-the-web.algonquindesign.ca/topics/grids/)
- [**☛ Gridifier cheat sheet**](http://learn-the-web.algonquindesign.ca/topics/gridifier-cheat-sheet/)

---

## Common Problems

There are a few problems people can run into and here’s the common solutions.

### Mashy text

Where the letters of your text are all mashed together and overlapping.

#### Solution

This is caused by putting content inside `.grid` and not inside `.unit`—the only direct descendants of `.grid` should be `.unit`.

**Bad**

```html
<div class="grid">
  <h2>Text!</h2>
</div>
```

**Good**

```html
<div class="grid">
  <div class="unit">
    <h2>Text!</h2>
  </div>
</div>
```

### Custom font issues

Sometimes when using a custom webfont for the body copy it can wreak a little havoc on the grid system. Generally only happens on older browsers that don’t support `flexbox`.

This is documented on the [Pure documentation](http://purecss.io/grids/#using-grids-with-custom-fonts), this [pull request](https://github.com/yui/pure/issues/41/), & the [Pure grid CSS file](https://github.com/yui/pure/blob/master/src/grids/css/grids-core.css).

#### Solution

**1. Define your custom font on `html` as usual:**

```css
html {
	font-family: "Custom Font", serif;
}
```

**2. Define this default set font families on `.grid`:**

```css
.grid {
	⋮
	font-family: FreeSans, Arimo, "Droid Sans", Helvetica, Arial, sans-serif;
}
```

**3. Redefine your custom font on `.unit`:**

```css
.unit {
	⋮
	font-family: "Custom Font", serif;
}
```

---

## License & copyright

© 2015 Thomas J Bradley

Gridifier is licensed under the [MIT License](LICENSE).
Some of the output code is inspired by [Pure CSS by Yahoo! Inc.](http://purecss.io/).
Some of the output code is inspired by [Foundation by Zurb](http://foundation.zurb.com/).
[Paper icon](http://thenounproject.com/term/paper/29062/) copyright Yazmin Alanis.
