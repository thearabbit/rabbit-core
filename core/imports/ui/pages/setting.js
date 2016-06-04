import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib
import '../../../client/components/loading.js';
import '../../../client/components/form-footer.js';
import {displaySuccess, displayError} from '../../../client/libs/display-alert.js';

// Collection
import {Setting} from '../../api/collections/setting.js';

// Page
import './setting.html';

// Declare template
var indexTmpl = Template.Core_setting;

// Index
indexTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('core.setting');
        this.subscribe('core.branch');
        this.subscribe('core.currency');
    });
});

indexTmpl.helpers({
    collection(){
        return Setting;
    },
    data: function () {
        return Setting.findOne();
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks([
    'Core_setting'
], hooksObject);
