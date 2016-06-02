# ID Generator 0.0.5
Generate id for collection with or without prefix.
### Install
```js
meteor add theara:id-generator
```
### Usage
```js
// idGenerator.gen(collection, length, [field]); // default field = _id
var id = idGenerator.gen(CustomerCollection, 3); // 001, 002
var id = idGenerator.gen(CustomerCollection, 3, 'otherField'); // 001, 002

// idGenerator.genWithPrefix(collection, prefix, length, [field]); //default field = _id
var id = idGenerator.genWithPrefix(CustomerCollection, '001-', 3); // 001-0001, 001-0002 (BranchOffice-ID)
var id = idGenerator.genWithPrefix(CustomerCollection, '001-', 3, 'otherField'); // 001-0001, 001-0002 (BranchOffice-ID)
```
### Changelog
- v 0.0.6 (2015-07-13)
    - fix
- v 0.0.5 (2015-05-17)
    - fix max length (return null)
- v 0.0.4 (2015-04-24)
    - fix with prefix method
- v 0.0.3 (2015-04-23)
    - fix field param
- v 0.0.2 (2015-04-23)
    - fix generate with prefix
- v 0.0.1 (2015-04-21)
    - init
