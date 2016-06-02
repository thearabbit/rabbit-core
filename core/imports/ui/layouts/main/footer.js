import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {ReactiveDict} from 'meteor/reactive-dict';
import {TAPi18n} from 'meteor/tap:i18n';
import 'meteor/tap:i18n-ui';

// Method
import {currentServerDateTime} from '../../../../common/methods/current-date.js';

// Page
import './footer.html';

Template._FooterLayout.onCreated(function () {
    // Get current date time from server
    this.state = new ReactiveDict();
    this.state.setDefault({
        currentYear: ''
    });
});

Template._FooterLayout.helpers({
    moduleVersion(){
        let currentModule = Session.get('currentModule');
        let version = 'No';
        if (currentModule) {
            version = Module[currentModule].version;
        }

        return version;
    },
    currentYear(){
        let instance = Template.instance();
        currentServerDateTime.call((err, res)=> {
            let currentDateTime = moment(res);
            instance.state.set('currentYear', currentDateTime.format('YYYY'));
        });

        return instance.state.get('currentYear');
    }
});
