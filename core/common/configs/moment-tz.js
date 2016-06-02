import {Meteor} from 'meteor/meteor';
import {moment} from 'meteor/momentjs:moment';

Meteor.startup(function () {
    moment.tz.setDefault("Asia/Bangkok");
});