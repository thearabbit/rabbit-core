# Lightbox Helpers

### Install

```js
meteor add theara:lightbox-helpers
```

### Usage

```js
// in template
{{lightbox url="img-url" name="img-name" title="img-title" [icon="paperclip"]}}

// in js
lightbox('img-url', 'img-name', 'img-title', [icon=paperclip], [safeString=boolean]);
// Default don't have icon (show own image), safeString = false
```

If you have a group of related images that you would like to combine into a set,
please use the same name

```js
{{lightbox url="img-url" name="rabbit" title="img-title"}}
{{lightbox url="img-url" name="rabbit" title="img-title"}}
{{lightbox url="img-url" name="rabbit" title="img-title"}}
```

### Changelog
- v 0.0.6 (2015-07-13)
    - fix icon
- v 0.0.1 (2015-07-12)
    - init
