# Meteor Factory

A package for creating test data or for generating fixtures.

### Install

```js
meteor add theara:factory
```

### Usage
#### Factory.define(name, collection, attributes)

Defines a factory that can be used to build documents.

```javascript
Factory.define('post', Posts, {
  title: 'Hello World',
  author: {
    _id: 'testAuthorId',
    name: 'jon'
  }
});
```

#### Factory.build(name, attributes)

Build an object using the factory with the given name. Previously defined
attributes can be overwritten.

Returns the object that is built. The returned object does not have `_id`.

```javascript
Factory.build('post');
// => {title: 'Hello World', author: {_id: 'testAuthorId', name: 'jon'}}

Factory.build('post', {title: 'Cool story, bro.'});
// => {title: 'Cool story, bro.', author: {_id: 'testAuthorId', name: 'jon'}}
```

#### Factory.create(name, attributes)

Insert a new document to the collection using the given factory.

Previously defined attributes can be overwritten. Returns the inserted document.

```javascript
var post = Factory.create('post');

Posts.findOne(post._id);
// => {title: 'Hello World', author: {_id: 'testAuthorId', name: 'jon'}}
```
