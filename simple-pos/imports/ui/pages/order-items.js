import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
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

// Lib
import {createNewAlertify} from '../../../../core/client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../core/client/libs/display-alert.js';
import {reactiveTableSettings} from '../../../../core/client/libs/reactive-table-settings.js';
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/column-action.js';
import '../../../../core/client/components/form-footer.js';

// Collection
import {ItemsSchema} from '../../api/collections/order-items.js';
import {Order} from '../../api/collections/order.js';

// Page
import './order-items.html';

// Declare template
var itemsTmpl = Template.SimplePos_orderItems,
    actionItemsTmpl = Template.SimplePos_orderItemsAction,
    editItemsTmpl = Template.SimplePos_orderItemsEdit;

// Local collection
var itemsCollection;


itemsTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('item');

    // State
    this.amountState = new ReactiveVar(0);

    // Data context
    let data = Template.currentData();
    itemsCollection = data.itemsCollection;
});

itemsTmpl.helpers({
    tableSettings: function () {
        let i18nPrefix = 'simplePos.order.schema';

        reactiveTableSettings.showFilter = false;
        reactiveTableSettings.showNavigation = 'never';
        reactiveTableSettings.showColumnToggles = false;
        reactiveTableSettings.collection = itemsCollection;
        reactiveTableSettings.fields = [
            {key: 'itemId', label: __(`${i18nPrefix}.itemId.label`)},
            {key: 'qty', label: __(`${i18nPrefix}.qty.label`)},
            {
                key: 'price',
                label: __(`${i18nPrefix}.price.label`),
                fn (value, object, key) {
                    return numeral(value).format('0,0.00');
                }
            },
            {
                key: 'amount',
                label: __(`${i18nPrefix}.amount.label`),
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
    amount(){
        const instance = Template.instance();
        return instance.amountState.get();
    },
    schema(){
        return ItemsSchema;
    },
    disabledAddItemBtn: function () {
        const instance = Template.instance();
        if (instance.amountState.get() <= 0) {
            return {disabled: true};
        }

        return {};
    },
    total: function () {
        let total = 0;
        let getItems = itemsCollection.find();
        getItems.forEach((obj)=> {
            total += obj.amount;
        });

        return total;
    }
});

itemsTmpl.events({
    'change [name="itemId"]': function (event, instance) {
        instance.$('[name="qty"]').val('');
        instance.$('[name="price"]').val('');
        instance.$('[name="amount"]').val('');
    },
    'keyup [name="qty"],[name="price"]': function (event, instance) {
        let qty = instance.$('[name="qty"]').val();
        let price = instance.$('[name="price"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);
        let amount = qty * price;

        instance.amountState.set(amount);
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
    let self = this;
    self.amountState = new ReactiveVar(0);

    self.autorun(()=> {
        let data = Template.currentData();
        self.amountState.set(data.amount);
    });
});

editItemsTmpl.helpers({
    schema(){
        return ItemsSchema;
    },
    data: function () {
        let data = Template.currentData();
        return data;
    },
    amount: function () {
        const instance = Template.instance();
        return instance.amountState.get();
    }
});

editItemsTmpl.events({
    'change [name="itemId"]': function (event, instance) {
        instance.$('[name="qty"]').val('');
        instance.$('[name="price"]').val('');
        instance.$('[name="amount"]').val('');
    },
    'keyup [name="qty"],[name="price"]': function (event, instance) {
        let qty = instance.$('[name="qty"]').val();
        let price = instance.$('[name="price"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);
        let amount = qty * price;

        instance.amountState.set(amount);
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
