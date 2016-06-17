import {Meteor} from 'meteor/meteor';
import {moment} from 'meteor/momentjs:moment';

Meteor.startup(function () {
    moment.tz.setDefault("Asia/Bangkok");
    moment.updateLocale('en', {
        week: {
            dow: 1, // Monday is the first day of the week.
            // doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
});