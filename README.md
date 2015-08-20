# Gridifier

[Gridifier](http://tjb.io/grids) is a tool to build a responsive grid framework for modern websites.

---

### [☛ Grid system tutorial](http://learn-the-web.algonquindesign.ca/topics/grids/)

### [☛ Videos for grids](https://www.youtube.com/playlist?list=PLWjCJDeWfDdeUChfM6TV2U7jzQVRjsu60)

These grid systems are taught as part of the [Algonquin College Graphic Design](http://algonquindesign.ca) program.

This tool is introduced to the students after they learn the “long, hard, stupid way.”

---

## Common Problems

Sometimes when using a custom webfont for the body copy it can wreak a little havoc on the grid system.

This is documented on the [Pure documentation](http://purecss.io/grids/#using-grids-with-custom-fonts), this [pull request](https://github.com/yui/pure/issues/41/), & the [Pure grid CSS file](https://github.com/yui/pure/blob/master/src/grids/css/grids-core.css).

### Solution

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

## License

Gridifier is licensed under the [New BSD license](LICENSE.txt).

Some of the output code is copyright [Yahoo! Inc.](http://purecss.io/).

Some of the output code is inspired by [Foundation](http://foundation.zurb.com/).

[Paper icon](http://thenounproject.com/term/paper/29062/) copyright Yazmin Alanis.
