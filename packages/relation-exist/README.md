# Relation exist 0.0.1
Check relation exist for meteor collection
### Install
```js
meteor add theara:relation-exist
```
### Usage
```js
var relation = relationExist(
    [
        {collection: TestCollection, selector: {_id: "001"}},
        {collection: TestCollection2, selector: {_id: "002"}}
    ]
);// return boolean

if(relation){
    // ...
}
```
### Changelog
- v 0.0.1 (2014-04-21)
    - init
