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
import {Customer} from '../../api/collections/customer.js';

// Tabular
import {CustomerTabular} from '../../../common/tabulars/customer.js';

// Page
import './customer.html';

// Declare template
let indexTmpl = Template.SimplePos_customer,
    contactTmpl = Template.SimplePos_customerContact,
    formTmpl = Template.SimplePos_customerForm,
    showTmpl = Template.SimplePos_customerShow;


// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('customer', {size: 'lg'});
    createNewAlertify('customerShow',);
});

indexTmpl.helpers({
    tabularTable(){
        return CustomerTabular;
    },
    selector() {
        return {branchId: Session.get('currentByBranch')};
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.customer(fa('plus', 'Customer'), renderTemplate(formTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.customer(fa('pencil', 'Customer'), renderTemplate(formTmpl, {customerId: this._id}));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Customer,
            {_id: this._id},
            {title: 'Customer', itemTitle: this._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.customerShow(fa('eye', 'Customer'), renderTemplate(showTmpl, {customerId: this._id}));
    }
});

// Contact tabular
contactTmpl.helpers({
    jsonViewOpts () {
        return {collapsed: true};
    }
});

// Form
formTmpl.onCreated(function () {
    this.autorun(()=> {
        // Lookup value
        this.subscribe('simplePos.lookupValueByNames', ['Gender', 'Contact Type']);

        let currentData = Template.currentData();
        if (currentData) {
            this.subscribe('simplePos.customerById', currentData.customerId);
        }
    });
});

formTmpl.helpers({
    collection(){
        return Customer;
    },
    data () {
        let data = {
            formType: 'insert',
            doc: {}
        };
        let currentData = Template.currentData();

        if (currentData) {
            data.formType = 'update';
            data.doc = Customer.findOne(currentData.customerId);
        }

        return data;
    }
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        let currentData = Template.currentData();
        this.subscribe('simplePos.customerById', currentData.customerId);
    });
});

showTmpl.helpers({
    data () {
        let currentData = Template.currentData();
        return Customer.findOne(currentData.customerId);
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        if (formType == 'update') {
            alertify.customer().close();
        }
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks(['SimplePos_customerForm'], hooksObject);
