# Asynchronous Method Calls

### Install
```js
meteor add theara:call-async
```

### Usage

```js
// Template
<template name="hello">
  {{#if data}}
    <!--render data-->
    {{data}}
  {{else}}
    <!--render loading...-->
    {{> loading}}
  {{/if}}
</template>

Template.hello.helpers({
  data: function () {
    var callId = 'add-5-5';
    var call = Meteor.callAsync(callId, 'add', 5, 5);

    if(!call.ready()) {
      // method call has not finished yet
      return false;
    }

    var err = call.error();
    if(err) {
      // method call returned an error
      console.error(err);
      return 'error';
    }

    return call.result();
  }
});

// Method on server
Meteor.methods({
  add: function(x, y){
    var sum = x + y;

    // Sleep
    Meteor.sleepForMs(2000);

    return sum;
  }
})
```