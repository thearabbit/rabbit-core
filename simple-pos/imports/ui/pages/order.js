import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {_} from 'meteor/erasaur:meteor-lodash';
import 'meteor/theara:jsonview';
import {TAPi18n} from 'meteor/tap:i18n';
import 'meteor/tap:i18n-ui';


// Lib
import {createNewAlertify} from '../../../../core/client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../core/client/libs/display-alert.js';
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/column-action.js';
import '../../../../core/client/components/form-footer.js';

// Collection
import {Order} from '../../api/collections/order.js';

// Tabular
import {OrderTabular} from '../../../common/tabulars/order.js';

// Page
import './order.html';
import './order-items.js';

// Declare template
let indexTmpl = Template.SimplePos_order,
    actionTmpl = Template.SimplePos_orderAction,
    newTmpl = Template.SimplePos_orderNew,
    editTmpl = Template.SimplePos_orderEdit,
    showTmpl = Template.SimplePos_orderShow;

// Local collection
let itemsCollection = new Mongo.Collection(null);

// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('order', {size: 'lg'});
    createNewAlertify('orderShow',);
});

indexTmpl.helpers({
    tabularTable(){
        return OrderTabular;
    },
    selector() {
        return {branchId: Session.get('currentBranch')};
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.order(fa('plus', 'Order'), renderTemplate(newTmpl)).maximize();
    },
    'click .js-update' (event, instance) {
        alertify.order(fa('pencil', 'Order'), renderTemplate(editTmpl, this)).maximize();
    },
    'click .js-destroy' (event, instance) {
        let data = this;
        destroyAction(
            Order,
            {_id: data._id},
            {title: 'Order', itemTitle: data._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.orderShow(fa('eye', 'Order'), renderTemplate(showTmpl, this));
    },
    'click .js-invoice' (event, instance) {
        let params = {};
        let queryParams = {orderId: this._id};
        let path = FlowRouter.path("simplePos.orderReportGen", params, queryParams);

        window.open(path, '_blank');
    }
});

// New
newTmpl.helpers({
    collection(){
        return Order;
    },
    itemsCollection(){
        return itemsCollection;
    },
    disabledSubmitBtn: function () {
        let count = itemsCollection.find().count();
        if (count == 0) {
            return {disabled: true};
        }

        return {};
    }
});

newTmpl.onDestroyed(function () {
    // Remove items collection
    itemsCollection.remove({});
});

// Edit
editTmpl.onCreated(function () {
    this.autorun(()=> {
        let currentData = Template.currentData();
        this.subscribe('simplePos.orderById', currentData._id);
    });
});

editTmpl.helpers({
    collection(){
        return Order;
    },
    data () {
        let currentData = Template.currentData();
        let data = Order.findOne(currentData._id);

        // Add items to local collection
        _.forEach(data.items, (value)=> {
            itemsCollection.insert(value);
        });

        return data;
    },
    itemsCollection(){
        return itemsCollection;
    },
    disabledSubmitBtn: function () {
        let cont = itemsCollection.find().count();
        if (cont == 0) {
            return {disabled: true};
        }

        return {};
    }
});

editTmpl.onDestroyed(function () {
    // Remove items collection
    itemsCollection.remove({});
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        let currentData = Template.currentData();
        this.subscribe('simplePos.orderById', currentData._id);
    });
});

showTmpl.helpers({
    data () {
        let currentData = Template.currentData();
        let data = Order.findOne(currentData._id);

        // Use jsonview
        data.jsonViewOpts = {collapsed: true};

        return data;
    }
});

// Hook
let hooksObject = {
    before: {
        insert: function (doc) {
            doc.items = itemsCollection.find().fetch();
            return doc;
        },
        update: function (doc) {
            doc.$set.items = itemsCollection.find().fetch();

            delete doc.$unset;

            return doc;
        }
    },
    onSuccess (formType, result) {
        // Remove items collection
        itemsCollection.remove({});

        alertify.order().close();
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks([
    'SimplePos_orderNew',
    'SimplePos_orderEdit'
], hooksObject);
