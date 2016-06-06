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
        alertify.order(fa('plus', TAPi18n.__('simplePos.order.title')), renderTemplate(newTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.order(fa('pencil', TAPi18n.__('simplePos.order.title')), renderTemplate(editTmpl, this));
    },
    'click .js-destroy' (event, instance) {
        let data = this;
        destroyAction(
            Order,
            {_id: data._id},
            {title: TAPi18n.__('simplePos.order.title'), itemTitle: data._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.orderShow(fa('eye', TAPi18n.__('simplePos.order.title')), renderTemplate(showTmpl, this));
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
        let cont = itemsCollection.find().count();
        if (cont == 0) {
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
        this.subscribe('simplePos.order', {_id: this.data._id});
    });
});

editTmpl.helpers({
    collection(){
        return Order;
    },
    data () {
        let data = Order.findOne(this._id);

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
        this.subscribe('simplePos.order', {_id: this.data._id});
    });
});

showTmpl.helpers({
    i18nLabel(label){
        let key = `simplePos.order.schema.${label}.label`;
        return TAPi18n.__(key);
    },
    data () {
        let data = Order.findOne(this._id);

        // Use jsonview
        data.jsonViewOpts = {collapsed: true};

        return data;
    }
});

// Hook
let hooksObject = {
    before: {
        insert: function (doc) {
            let items = [];
            itemsCollection.find().forEach((obj)=> {
                delete obj._id;
                items.push(obj);
            });
            doc.items = items;

            return doc;
        },
        update: function (doc) {
            let items = [];
            itemsCollection.find().forEach((obj)=> {
                delete obj._id;
                items.push(obj);
            });
            doc.$set.items = items;

            delete doc.$unset;

            return doc;
        }
    },
    onSuccess (formType, result) {
        // if (formType == 'update') {
        // Remove items collection
        itemsCollection.remove({});

        alertify.order().close();
        // }
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
