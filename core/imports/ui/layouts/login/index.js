import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {TAPi18n} from 'meteor/tap:i18n';
import 'meteor/tap:i18n-ui';
import {moment} from  'meteor/momentjs:moment';
import 'meteor/lbee:moment-helpers';
import 'meteor/255kb:meteor-status';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {faker} from 'meteor/digilord:faker';

// Lib
import '../../../../client/components/i18n_ui.js';

// Admin-lte layout
import 'meteor/theara:admin-lte/admin-lte.js';

// Method
import {currentServerDateTime} from '../../../../common/methods/current-date.js';

// Template
import './index.html';

/**
 * Login Layout
 */
Template.LoginLayout.onCreated(function () {
    // Get current date time from server
    this.state = new ReactiveDict();
    this.state.setDefault({
        cssColor: 'blue',
        currentDateTime: '',
        currentYear: ''
    });

    Meteor.setInterval(()=> {
        currentServerDateTime.call((err, res)=> {
            let currentDateTime = moment(res);
            if (currentDateTime.day() == 0 || currentDateTime.day() == 6) {
                this.state.set('cssColor', 'red');
            }
            this.state.set('currentDateTime', currentDateTime.format('dddd D, MMMM YYYY H:mm:ss'));
        });
    }, 1000);
});

Template.LoginLayout.onRendered(function () {
    /* ---- particles.js config ---- */
    particlesJS('particles-js', pJSConfig);
});

Template.LoginLayout.helpers({
    currentDate(){
        let instance = Template.instance();
        return {
            cssColor: instance.state.get('cssColor'),
            value: instance.state.get('currentDateTime')
        }
    },
    currentYear(){
        let instance = Template.instance();
        currentServerDateTime.call((err, res)=> {
            let currentDateTime = moment(res);
            instance.state.set('currentYear', currentDateTime.format('YYYY'));
        });

        return instance.state.get('currentYear');
    },
    headerInfo(){
        // Check use login
        if (Meteor.user()) {
            return Spacebars.SafeString(TAPi18n.__('core.welcome.hi') + `, <b>${Meteor.user().profile.name} !</b>`);
        }
        return TAPi18n.__('core.welcome.headerInfo');
    }
});
