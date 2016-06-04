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

    // Reactive table filter
    this.filter = new ReactiveTable.Filter('simple.customerByBranchFilter', ['branchId']);
});

indexTmpl.helpers({
    tabularTable(){
        return CustomerTabular;
    },
    selector() {
        return {branchId: Session.get('currentBranch')};
    },
    tableSettings(){
        let instance = Template.instance();
        instance.filter.set(Session.get('currentBranch'));

        reactiveTableSettings.showColumnToggles = false;
        reactiveTableSettings.collection = 'simple.reactiveTable.customer';
        reactiveTableSettings.filters = ['simple.customerFilter', 'simple.customerByBranchFilter'];
        reactiveTableSettings.fields = [
            {
                key: '_id',
                label: __('simple.customer.idLbl'),
                sortOrder: 0,
                sortDirection: 'asc'
            },
            {key: 'name', label: __('simple.customer.nameLbl')},
            {key: 'gender', label: __('simple.customer.genderLbl')},
            {
                key: 'dob',
                label: __('simple.customer.dobLbl'),
                fn (value, object, key) {
                    return moment(value).format('YYYY-MM-DD');
                }
            },
            {key: 'telephone', label: __('simple.customer.telephoneLbl')},
            {
                key: '_id',
                label(){
                    return fa('bars', '', true);
                },
                headerClass: function () {
                    let css = 'text-center col-action';
                    return css;
                },
                tmpl: actionTmpl, sortable: false
            }
        ];

        return reactiveTableSettings;
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.customer(fa('plus', TAPi18n.__('simple.customer.title')), renderTemplate(newTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.customer(fa('pencil', TAPi18n.__('simple.customer.title')), renderTemplate(editTmpl, this));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Customer,
            {_id: this._id},
            {title: TAPi18n.__('simple.customer.title'), customer: this._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.customerShow(fa('eye', TAPi18n.__('simple.customer.title')), renderTemplate(showTmpl, this));
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
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks([
    'Simple_customerNew',
    'Simple_customerEdit'
], hooksObject);
