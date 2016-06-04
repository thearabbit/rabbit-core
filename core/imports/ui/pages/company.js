import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import 'meteor/arillo:flow-router-helpers';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';
import {createNewAlertify} from '../../../client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../client/libs/render-template.js';
import {displaySuccess, displayError} from '../../../client/libs/display-alert.js';

// Collection
import {Company} from '../../api/collections/company.js';

// Page
import './company.html';

// Declare template
var indexTmpl = Template.Core_company,
    editTmpl = Template.Core_companyEdit;

// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify("company", {size: 'lg'});
});
indexTmpl.helpers({
    data () {
        return Company.findOne();
    }
});
indexTmpl.events({
    'click .js-update' (event, instance) {
        let data = Blaze.getData(event.target);
        alertify.company(fa("pencil", TAPi18n.__('core.company.title')), renderTemplate(editTmpl, {_id: data._id}));
    }
});

// Edit
editTmpl.helpers({
    collection () {
        return Company;
    },
    data () {
        let data = {};
        let currentData = Template.currentData();
        if (currentData) {
            data = Company.findOne(currentData._id);
        }

        return data;
    }
});

// Hook
let hooksObject = {
    onSuccess: function (formType, result) {
        alertify.company().close();
        displaySuccess();
    }
    ,
    onError: function (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks([
    'Core_companyEdit'
], hooksObject);
