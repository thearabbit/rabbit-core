import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

Meteor.publish('core.user', function coreUser(selector = {}, options = {}) {
    this.unblock();

    if (this.userId) {
        new SimpleSchema({
            selector: {type: Object, blackbox: true},
            options: {type: Object, blackbox: true}
        }).validate({selector, options});

        let data = Meteor.users.find(selector, options);

        return data;
    }

    this.ready();
});

// Publish createAt and rolesBranch field
Meteor.publish(null, function () {
    this.unblock();

    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                createdAt: 1,
                rolesBranch: 1
            }
        });
    }

    return this.ready();
});

// Publish roles field
Meteor.publish(null, function () {
    return Meteor.roles.find();
});
