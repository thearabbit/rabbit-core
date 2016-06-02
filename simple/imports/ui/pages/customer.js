import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';

// Lib
import {createNewAlertify} from '../../../../core/client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../core/client/libs/destroy-action.js';

// Component
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/tabular-action.js';
import '../../../../core/client/components/form-footer.js';

// Collection
import {Customer} from '../../api/collections/customer.js';

// Tabular
import {CustomerTabular} from '../../../common/tabulars/customer.js';

// Page
import './customer.html';

// Declare template
let indexTmpl = Template.Simple_customer,
    actionTmpl = Template.Simple_customerAction,
    newTmpl = Template.Simple_customerNew,
    editTmpl = Template.Simple_customerEdit,
    showTmpl = Template.Simple_customerShow;


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
        return {branchId: Session.get('currentBranch')};
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.customer(fa('plus', 'Customer'), renderTemplate(newTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.customer(fa('pencil', 'Customer'), renderTemplate(editTmpl, this));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Customer,
            {_id: this._id},
            {title: 'Customer', customer: this._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.customerShow(fa('eye', 'Customer'), renderTemplate(showTmpl, this));
    }
});

// New
newTmpl.helpers({
    collection(){
        return Customer;
    }
});

// Edit
editTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('simple.customer', {_id: this.data._id});
    });
});

editTmpl.helpers({
    collection(){
        return Customer;
    },
    data () {
        let data = Customer.findOne(this._id);
        return data;
    }
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('simple.customer', {_id: this.data._id});
    });
});

showTmpl.helpers({
    data () {
        let data = Customer.findOne(this._id);
        return data;
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        if (formType == 'update') {
            alertify.customer().close();
        }
        sAlert.success('Success');
    },
    onError (formType, error) {
        sAlert.error(error.message);
    }
};

AutoForm.addHooks([
    'Simple_customerNew',
    'Simple_customerEdit'
], hooksObject);
