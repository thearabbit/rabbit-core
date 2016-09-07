import {Meteor} from 'meteor/meteor';
import {Exchange} from '../../imports/api/collections/exchange';

Meteor.startup(function () {
    Exchange._ensureIndex({exDateText: 'text'});
});
