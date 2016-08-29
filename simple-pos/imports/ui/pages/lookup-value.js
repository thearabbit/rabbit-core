import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {createNewAlertify} from '../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../core/client/libs/display-alert.js';
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/column-action.js';
import '../../../../core/client/components/form-footer.js';

// Collection
import {LookupValue} from '../../api/collections/lookup-value.js';

// Tabular
import {LookupValueTabular} from '../../../common/tabulars/lookup-value.js';

// Page
import './lookup-value.html';

// Declare template
let indexTmpl = Template.SimplePos_lookupValue,
    optionsTmpl = Template.SimplePos_lookupValueOptions,
    formTmpl = Template.SimplePos_lookupValueForm;


// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('lookupValue', {size: 'lg'});
});

indexTmpl.helpers({
    tabularTable(){
        return LookupValueTabular;
    },
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.lookupValue(fa('plus', 'Lookup Value'), renderTemplate(formTmpl));
    },
    'click .js-update' (event, instance) {
        // Check private
        if (this.private) {
            displayError('You can not update [Private = true]!');
        } else {
            alertify.lookupValue(fa('pencil', 'Lookup Value'), renderTemplate(formTmpl, {lookupValueId: this._id}));
        }
    },
    'click .js-destroy' (event, instance) {
        if (this.private) {
            displayError('You can not delete [Private = true]!');
        } else {
            destroyAction(
                LookupValue,
                {_id: this._id},
                {title: 'Lookup Value', itemTitle: this._id}
            );
        }
    },
});

// Contact tabular
optionsTmpl.helpers({
    jsonViewOpts () {
        return {collapsed: true};
    }
});

// Form
formTmpl.onCreated(function () {
    this.autorun(()=> {
        let currentData = Template.currentData();
        if (currentData) {
            this.subscribe('simplePos.lookupValueById', currentData.lookupValueId);
        }
    });
});

formTmpl.helpers({
    collection(){
        return LookupValue;
    },
    data () {
        let data = {
            formType: 'insert',
            doc: {}
        };
        let currentData = Template.currentData();

        if (currentData) {
            data.formType = 'update';
            data.doc = LookupValue.findOne(currentData.lookupValueId);
        }

        return data;
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        if (formType == 'update') {
            alertify.lookupValue().close();
        }
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks(['SimplePos_lookupValueForm'], hooksObject);
