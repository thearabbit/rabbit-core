# Fetcher

Fetcher is designed to make retrieve and store Method results easy. It will run Meteor.call() for you, then deposit the result into a reactive dictionary. Just like a Session variable, you can use that data anywhere in your application, and it persists through hot reloads.

## Install

```js
meteor add theara:fetcher
```

## How to Use

```javascript
// get data from server
// params are for the Method call
Fetcher.retrieve("taco", "methodName", param1, param2, param3, etc)

// return data
Fetcher.get("taco")

// modify the data
Fetcher.set("taco", {'cheese' : 'yes please'})  

// re-run previous Fetcher.retrieve()
Fetcher.refresh("taco")
```