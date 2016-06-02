# money.js / fx() 

Simple and tiny JavaScript library for realtime currency conversion and exchange rate calculation, from any currency, to any currency. 

**money.js** is lightweight, has no dependencies, and works great client-side or server-side. Use standalone or as a nodeJS/npm and AMD/requireJS module.

Designed for seamless integration with the **[Open Exchange Rates API](https://openexchangerates.org "Free reliable exchange rates/currency conversion data API")**, but can be integrated with any source of currency data or with static/cached/approximate exchange rates.

Visit the plugin homepage for demos and documentation: **http://openexchangerates.github.io/money.js/**

### Install
```js
meteor add theara:moneyjs
```
### Quick Examples
```js
// Simple syntax:
fx.convert(1000, {from: "GBP", to: "HKD"});

// Method chaining:
fx(1.99).from("USD").to("AED");

// Basic parsing:
fx("$1.99 HKD").to("EUR");

// Default parameters:
fx(5318008).convert();

// Supports nodeJS / AMD:
var fx = require('money');
require(["money"], function(fx) { /* ... */ });
```
### Changelog
- v 0.0.2 (2014-04-22)
    - update readme
- v 0.0.1 (2014-04-21)
    - init
