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

// Method
import {lookupItem} from '../../../common/methods/lookup-item.js';

// Collection
import {OrderItemsSchema} from '../../api/collections/order-items.js';

// Page
import './order-items.html';

// Declare template
let indexTmpl = Template.SimplePos_orderItems,
    actionTmpl = Template.SimplePos_orderItemsAction,
    newTmpl = Template.SimplePos_orderItemsNew,
    editTmpl = Template.SimplePos_orderItemsEdit;

// Local collection
let itemsCollection;

// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('item');

    // Data context
    let data = Template.currentData();
    itemsCollection = data.itemsCollection;
});

indexTmpl.helpers({
    tableSettings: function () {
        let i18nPrefix = 'simplePos.order.schema';

        reactiveTableSettings.showFilter = false;
        reactiveTableSettings.showNavigation = 'never';
        reactiveTableSettings.showColumnToggles = false;
        reactiveTableSettings.collection = itemsCollection;
        reactiveTableSettings.fields = [
            {key: 'itemId', label: 'ID'},
            {key: 'itemName', label: 'Name'},
            {
                key: 'qty',
                label: 'Qty',
                fn(value, obj, key){
                    return Spacebars.SafeString(`<input type="text" value="${value}" class="item-qty">`);
                }
            },
            {
                key: 'price',
                label: 'Price',
                fn(value, obj, key){
                    return Spacebars.SafeString(`<input type="text" value="${value}" class="item-price">`);
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
                tmpl: actionTmpl, sortable: false
            }
        ];

        return reactiveTableSettings;
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

indexTmpl.events({
    'click .js-update-item': function (event, instance) {
        alertify.item(fa('pencil', 'Items'), renderTemplate(editTmpl, this));
    },
    'click .js-destroy-item': function (event, instance) {
        destroyAction(
            itemsCollection,
            {_id: this._id},
            {title: 'Items', itemTitle: this.itemId}
        );
    },
    'keyup .item-qty,.item-price'(event, instance){
        let $parents = $(event.currentTarget).parents('tr');

        let itemId = $parents.find('.itemId').text();
        let qty = $parents.find('.item-qty').val();
        let price = $parents.find('.item-price').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);
        let amount = numeral(qty * price).format("0,0.00");

        $parents.find('.amount').text(amount);
    },
    'blur .item-qty,.item-price': function (event, instance) {
        let $parents = $(event.currentTarget).parents('tr');

        let itemId = $parents.find('.itemId').text();
        let qty = $parents.find('.item-qty').val();
        let price = $parents.find('.item-price').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);
        amount = math.round(qty * price, 2);

        // Update
        $parents.find('.amount').text('');
        itemsCollection.update(
            {_id: itemId},
            {$set: {qty: qty, price: price, amount: amount}}
        );
    }
});

// New
newTmpl.onCreated(function () {
    // State
    this.itemId = new ReactiveVar();
    this.qty = new ReactiveVar(0);
    this.price = new ReactiveVar(0);
});

newTmpl.helpers({
    schema(){
        return OrderItemsSchema;
    },
    price: function () {
        return Template.instance().price.get();
    },
    amount: function () {
        const instance = Template.instance();
        let amount = instance.qty.get() * instance.price.get();

        return amount;
    },
    disabledAddItemBtn: function () {
        const instance = Template.instance();
        if (instance.itemId.get() && instance.qty.get() > 0) {
            return {};
        }

        return {disabled: true};
    },
});

newTmpl.events({
    'change [name="itemId"]': function (event, instance) {
        let itemId = event.currentTarget.value;
        instance.itemId.set(itemId);

        // Check item value
        if (itemId) {
            $.blockUI();
            lookupItem.callPromise({
                itemId: itemId
            }).then((result)=> {
                instance.price.set(result.price);

                Meteor.setTimeout(()=> {
                    $.unblockUI();
                }, 100);

            }).catch((err)=> {
                console.log(err.message);
            });
        } else {
            instance.price.set(0);
        }

        // Clear
        instance.$('[name="qty"]').val(1);
        instance.qty.set(1);
    },
    'keyup [name="qty"],[name="price"]': function (event, instance) {
        let qty = instance.$('[name="qty"]').val();
        let price = instance.$('[name="price"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);

        instance.qty.set(qty);
        instance.price.set(price);
    },
    'click .js-add-item': function (event, instance) {
        let itemId = instance.$('[name="itemId"]').val();
        let itemName = _.split(instance.$('[name="itemId"] option:selected').text(), " : ")[1];
        let qty = parseInt(instance.$('[name="qty"]').val());
        let price = math.round(parseFloat(instance.$('[name="price"]').val()), 2);
        let amount = math.round(qty * price, 2);

        // Check exist
        let exist = itemsCollection.findOne({itemId: itemId});
        if (exist) {
            qty += parseInt(exist.qty);
            amount = math.round(qty * price, 2);

            itemsCollection.update(
                {_id: itemId},
                {$set: {qty: qty, price: price, amount: amount}}
            );
        } else {
            itemsCollection.insert({
                _id: itemId,
                itemId: itemId,
                itemName: itemName,
                qty: qty,
                price: price,
                amount: amount
            });
        }
    },
});

// Edit
editTmpl.onCreated(function () {
    this.qty = new ReactiveVar(0);
    this.price = new ReactiveVar(0);

    this.autorun(()=> {
        let data = Template.currentData();
        this.qty.set(data.qty);
        this.price.set(data.price);
    });
});

editTmpl.helpers({
    schema(){
        return OrderItemsSchema;
    },
    data: function () {
        let data = Template.currentData();
        return data;
    },
    price: function () {
        return Template.instance().price.get();
    },
    amount: function () {
        const instance = Template.instance();
        let amount = instance.qty.get() * instance.price.get();
        return amount;
    }
});

editTmpl.events({
    'change [name="itemId"]': function (event, instance) {
        let itemId = event.currentTarget.value;

        // Check item value
        if (itemId) {
            $.blockUI();
            lookupItem.callPromise({
                itemId: itemId
            }).then((result)=> {
                instance.price.set(result.price);

                Meteor.setTimeout(()=> {
                    $.unblockUI();
                }, 100);

            }).catch((err)=> {
                console.log(err.message);
            });
        } else {
            instance.price.set(0);
        }
    },
    'keyup [name="qty"],[name="price"]': function (event, instance) {
        let qty = instance.$('[name="qty"]').val();
        let price = instance.$('[name="price"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);
        price = _.isEmpty(price) ? 0 : parseFloat(price);

        instance.qty.set(qty);
        instance.price.set(price);
    }
});

let hooksObject = {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        this.event.preventDefault();

        // Check old item
        if (insertDoc.itemId == currentDoc.itemId) {
            itemsCollection.update(
                {_id: currentDoc.itemId},
                updateDoc
            );
        } else {
            itemsCollection.remove({_id: currentDoc.itemId});

            // Check exist item
            let exist = itemsCollection.findOne({_id: insertDoc.itemId});
            if (exist) {
                let newQty = exist.qty + insertDoc.qty;
                let newPrice = insertDoc.price;
                let newAmount = math.round(newQty * newPrice, 2);

                itemsCollection.update(
                    {_id: insertDoc.itemId},
                    {$set: {qty: newQty, price: newPrice, amount: newAmount}}
                );
            } else {
                let itemName = _.split($('[name="itemId"] option:selected').text(), " : ")[1];

                itemsCollection.insert({
                    _id: insertDoc.itemId,
                    itemId: insertDoc.itemId,
                    itemName: itemName,
                    qty: insertDoc.qty,
                    price: insertDoc.price,
                    amount: insertDoc.amount
                });
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
