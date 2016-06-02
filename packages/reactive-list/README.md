# Reactive List

### Install

```js
meteor add theara:reactive-list
```

### Usage

```js
var lists = new ReactiveList();

// Insert
lists.insert('a', {name: 'A', age: 35});
lists.insert('b', {name: 'B', age: 35});
lists.insert('c', {name: 'C', age: 35});

// Fetch
lists.fetch();
lists.fetchReverse();

// Get
lists.get('a');

// Update
lists.update('b', {age: 18});

// Remove
lists.remove('c');

// Clear
lists.clear();

// First
lists.first();

// Last
lists.last();

// Length
lists.length();
```

### Changelog
- v 0.0.1 2015-08-21
    - init
