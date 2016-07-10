# round2

> Round a number to a specific number of decimal places: `1.234` → `1.2`


## Install

```
$ meteor add theara:round2
```


## Usage

```js
import {round2} from 'meteor/theara:round2';

round2(value, precision, type = [null, up, down]);
```

## Example

```js
round2(1.234, 2);
//=> 1.23

round2(1.231, 2, 'up');
//=> 1.24

round2(1.239, 2, 'down');
//=> 1.23
```

Numbers are rounded to a specific number of significant figures. Specifying a negative precision will round to any number of places to the left of the decimal.

```js
round2(1234.56, -2);
//=> 1200

round2(1211.56, -2, 'up');
//=> 1300

round2(1299.56, -2, 'down');
//=> 1200
```
