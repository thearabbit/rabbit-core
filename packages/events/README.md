# Events 0.0.1

### Install
```js
meteor add theara:events
```
### Usage (Client/Server)
```js
    Events.track({
        createdAt: Match.Optional(Date),
        type: String,
        description: Match.Optional(Match.Any),
        module: Match.Optional(String)
        branch: Match.Optional(String),
        userId: Match.Optional(String),
    });
  
    Events.trackInsert({
        createdAt: Match.Optional(Date),
        description: Match.Optional(Match.Any),
        module: Match.Optional(String)
        branch: Match.Optional(String),
        userId: Match.Optional(String),
    });
    Events.trackUpdate({});
    Events.trackRemove({});
    Events.trackReport({});
```

### Changelog
- v 0.0.1 (2014-05-21)
    - init
