# Auto printing

### Install

```js
meteor add theara:autoprint
```

### Usage

```js
// At the end of view
{{autoprint}}

{{autoprint close="true" timeout=2000}}
// Default: close = false, timeout = 500
```