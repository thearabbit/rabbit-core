import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {moment} from  'meteor/momentjs:moment';
import 'meteor/lbee:moment-helpers';

// Lib
import {Logout} from '../../../../client/libs/logout.js';

// Page
import './header-user.html';

Template._HeaderUserLayout.helpers({
    user: function () {
        let currentUser = Meteor.user();
        if (currentUser) {
            currentUser.emailsAddress = currentUser.emails[0].address;
            return currentUser;
        }
    }
});
Template._HeaderUserLayout.events({
    'click .js-logout'(event, instance) {
        Logout();
    }
});
