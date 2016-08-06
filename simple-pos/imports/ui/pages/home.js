import {Template} from  'meteor/templating';
import {TAPi18n} from 'meteor/tap:i18n';

// Page
import './home.html';

Template.SimplePos_home.events({
    'click .uiblock'(event, instance){
        // UIBlock.block('Wait...');

        $.blockUI();

        Meteor.setTimeout(()=> {
            UIBlock.unblock();

            // $.unblockUI();
        }, 500);
    }
});
