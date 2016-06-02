Events = new Mongo.Collection('events');

Events.track = function (event) {
    var event = getCurrent(event);
    Meteor.call('eventsInsert', event);
};

Events.trackInsert = function (event) {
    var event = getCurrent(event);
    Meteor.call('eventsInsert', event, 'Insert');
};

Events.trackUpdate = function (event) {
    var event = getCurrent(event);
    Meteor.call('eventsInsert', event, 'Update');
};

Events.trackRemove = function (event) {
    var event = getCurrent(event);
    Meteor.call('eventsInsert', event, 'Remove');
};

Events.trackReport = function (event) {
    var event = getCurrent(event);
    Meteor.call('eventsInsert', event, 'Report');
};

if (Meteor.isServer) {
    Meteor.methods({
        'eventsInsert': function (event, type) {
            event.createdAt = event.createdAt || new Date();
            // Check type
            if (!_.isUndefined(type)) {
                check(event, {
                    createdAt: Match.Optional(Date),
                    type: Match.Optional(String),
                    description: Match.Optional(Match.Any),
                    module: Match.Optional(String),
                    branch: Match.Optional(String),
                    userId: Match.Optional(String)
                });
                event.type = type;

            } else {
                check(event, {
                    createdAt: Match.Optional(Date),
                    type: String,
                    description: Match.Optional(Match.Any),
                    module: Match.Optional(String),
                    branch: Match.Optional(String),
                    userId: Match.Optional(String)
                });
                event.type = event.type;
            }

            if (!_.isString(event.description)) {
                event.description = EJSON.stringify(event.description);
            }else{
                event.description = event.description;
            }
            event.module = event.module;
            event.branch = event.branch;
            event.userId = event.userId || this.userId;

            Events.insert(event);
        }
    })
}

var getCurrent = function (event) {
    if (Meteor.isClient) {
        event.module = _.isUndefined(event.module) ? Session.get('currentModule') : event.module;
        event.branch = _.isUndefined(event.branch) ? Session.get('currentBranch') : event.branch;
    }
    return event;
};