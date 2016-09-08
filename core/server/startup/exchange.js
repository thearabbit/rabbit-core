import {Meteor} from 'meteor/meteor';
import {Exchange} from '../../common/collections/exchange';

Meteor.startup(function () {
    Exchange._ensureIndex({exDateText: 'text'});
});
