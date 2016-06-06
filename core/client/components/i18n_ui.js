import {Template} from 'meteor/templating';
import {TAPi18n} from 'meteor/tap:i18n';
import {i18n} from 'meteor/anti:i18n';

// Page
import './i18n_ui.html';

Template.i18n_ui.events({
    'click .js-i18n-ui' (event, instance) {
        let tag = this.tag;
        TAPi18n.setLanguageAmplify(tag);

        //anti:i18n
        i18n.setLanguage(tag);
    }
});