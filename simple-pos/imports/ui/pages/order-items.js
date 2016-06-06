import {ReactiveVar} from 'meteor/reactive-var';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {_} from 'meteor/erasaur:meteor-lodash';
import {$} from 'meteor/jquery';
import {TAPi18n} from 'meteor/tap:i18n';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import 'meteor/theara:template-states';

// Lib
import {createNewAlertify} from '../../../../core/client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../core/client/libs/display-alert.js';
import {reactiveTableSettings} from '../../../../core/client/libs/reactive-table-settings.js';

// Component
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/column-action.js';
import '../../../../core/client/components/form-footer.js';

// Collection
import {ItemsSchema} from '../../api/collections/order-items.js';
import {Order} from '../../api/collections/order.js';

// Declare template
var itemsTmpl = Template.SimplePos_orderItems,
    actionItemsTmpl = Template.SimplePos_orderItemsAction;
editItemsTmpl = Template.SimplePos_orderItemsEdit;


// Local collection
// let itemsCollection = new Mongo.Collection(null);
var itemsCollection;

// Page
import './order-items.html';

itemsTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('item');

    // Data context
    let data = Template.currentData();
    itemsCollection = data.itemsCollection;

    this.myState = new ReactiveDict();
    this.myState.setDefault({
        qty: 0,
        price: 0,
        total: 0
    });

    // Template state
    this.state('tmpAmount', 0);

    this.autorun(()=> {
        let tmpAmount = math.round(this.myState.get('qty') * this.myState.get('price'), 2);
        this.state('tmpAmount', tmpAmount);
    });
});

itemsTmpl.onRendered(function () {
});

itemsTmpl.helpers({
    tableSettings: function () {
        let i18nPrefix = 'simplePos.item.schema';

        reactiveTableSettings.showFilter = false;
        reactiveTableSettings.showNavigation = 'never';
        reactiveTableSettings.showColumnToggles = false;
        reactiveTableSettings.collection = itemsCollection;
        reactiveTableSettings.fields = [
            {key: 'itemId', label: 'Item'},
            {key: 'qty', label: 'Qty'},
            {
                key: 'price',
                label: 'Price',
                fn (value, object, key) {
                    return numeral(value).format('0,0.00');
                }
            },
            {
                key: 'amount',
                label: 'Amount',
                fn (value, object, key) {
                    return numeral(value).format('0,0.00');
                }
            },
            {
                key: '_id',
                label(){
                    return fa('bars', '', true);
                },
                headerClass: function () {
                    let css = 'text-center col-action-order-item';
                    return css;
                },
                tmpl: actionItemsTmpl, sortable: false
            }
        ];

        return reactiveTableSettings;
    },
    schema(){
        return ItemsSchema;
    },
    disabledAddItemBtn: function () {
        const instance = Template.instance();
        if (instance.state('tmpAmount') <= 0) {
            return {disabled: true};
        }

        return {};
    },
    itemsList: function () {
        let getItems = itemsCollection.find();

        return getItems;
    },
    total: function () {
        const instance = Template.instance();
        let getItems = itemsCollection.find();
        let total = 0;
        getItems.forEach((obj)=> {
            total += obj.amount;
        });
        instance.myState.set('total', total);

        return total;
    },
    keyArgs(index, name){
        return `items.${index}.${name}`;
    }
});

itemsTmpl.events({
    'change [name="itemId"]': function (event, instance) {
        instance.$('[name="qty"]').val('');
        instance.$('[name="price"]').val('');
        instance.$('[name="amount"]').val('');

        instance.myState.set('qty', '');
        instance.myState.set('price', '');
    },
    'keyup [name="qty"],[name="price"]': function (event, instance) {
        var qty = instance.$('[name="qty"]').val();
        var price = instance.$('[name="price"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);

        instance.myState.set('qty', qty);
        instance.myState.set('price', price);
    },
    'click .js-add-item': function (event, instance) {
        let itemId = instance.$('[name="itemId"]').val();
        let qty = parseInt(instance.$('[name="qty"]').val());
        let price = math.round(parseFloat(instance.$('[name="price"]').val()), 2);
        let amount = math.round(qty * price, 2);

        // Check exist
        let exist = itemsCollection.findOne({itemId: itemId});
        if (exist) {
            qty += parseInt(exist.qty);
            amount = math.round(qty * price, 2);

            itemsCollection.update(
                {_id: _id},
                {$set: {qty: qty, price: price, amount: amount}}
            );
        } else {
            itemsCollection.insert({
                itemId: itemId,
                qty: qty,
                price: price,
                amount: amount
            });
        }
    },
    // Reactive table for item
    'click .js-update-item': function (event, instance) {
        alertify.item(fa('pencil', TAPi18n.__('simplePos.order.schema.itemId.label')), renderTemplate(editItemsTmpl, this));
    },
    'click .js-destroy-item': function (event, instance) {
        destroyAction(
            itemsCollection,
            {_id: this._id},
            {title: TAPi18n.__('simplePos.order.schema.itemId.label'), itemTitle: this.itemId}
        );
    }
});


// Edit
editItemsTmpl.onCreated(function () {
    this.state('amount', 0);

    this.autorun(()=> {
        let data = Template.currentData();
        this.state('amount', data.amount);
    });
});

editItemsTmpl.helpers({
    schema(){
        return ItemsSchema;
    },
    data: function () {
        let data = Template.currentData();
        return data;
    }
});

editItemsTmpl.events({
    'keyup [name="qty"],[name="price"]': function (event, instance) {
        let qty = instance.$('[name="qty"]').val();
        let price = instance.$('[name="price"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);
        let amount = qty * price;

        instance.state('amount', amount);
    }
});

let hooksObject = {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        this.event.preventDefault();

        // Check old item
        if (insertDoc.itemId == currentDoc.itemId) {
            itemsCollection.update(
                {_id: currentDoc._id},
                updateDoc
            );
        } else {
            // Check exist item
            let exist = itemsCollection.findOne({_id: insertDoc._id});
            if (exist) {
                let newQty = exist.qty + insertDoc.qty;
                let newPrice = insertDoc.price;
                let newAmount = math.round(newQty * newPrice, 2);

                itemsCollection.update(
                    {_id: insertDoc._id},
                    {$set: {qty: newQty, price: newPrice, amount: newAmount}}
                );
            } else {
                itemsCollection.remove({_id: currentDoc._id});
                itemsCollection.insert(insertDoc);
            }
        }

        this.done();
    },
    onSuccess: function (formType, result) {
        alertify.item().close();
        displaySuccess();
    },
    onError: function (formType, error) {
        displayError(error.message);
    }
};
AutoForm.addHooks(['SimplePos_orderItemsEdit'], hooksObject);
