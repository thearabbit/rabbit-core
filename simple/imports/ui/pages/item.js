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
import {Item} from '../../api/collections/item.js';

// Tabular
import {ItemTabular} from '../../../common/tabulars/item.js';

// Page
import './item.html';

// Declare template
let indexTmpl = Template.Simple_item,
    actionTmpl = Template.Simple_itemAction,
    newTmpl = Template.Simple_itemNew,
    editTmpl = Template.Simple_itemEdit,
    showTmpl = Template.Simple_itemShow;


// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('item');
});

indexTmpl.helpers({
    tabularTable(){
        return ItemTabular;
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.item(fa('plus', 'Item'), renderTemplate(newTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.item(fa('pencil', 'Item'), renderTemplate(editTmpl, this));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Item,
            {_id: this._id},
            {title: 'Item', item: this._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.item(fa('eye', 'Item'), renderTemplate(showTmpl, this));
    }
});

// New
newTmpl.helpers({
    collection(){
        return Item;
    }
});

// Edit
editTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('simple.item', {_id: this.data._id});
    });
});

editTmpl.helpers({
    collection(){
        return Item;
    },
    data () {
        let data = Item.findOne(this._id);
        return data;
    }
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('simple.item', {_id: this.data._id});
    });
});

showTmpl.helpers({
    data () {
        let data = Item.findOne(this._id);
        data.photoUrl = null;
        if (data.photo) {
            let img = Files.findOne(data.photo);
            if (img) {
                data.photoUrl = img.url();
            }
        }

        return data;
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        if (formType == 'update') {
            alertify.item().close();
        }
        sAlert.success('Success');
    },
    onError (formType, error) {
        sAlert.error(error.message);
    }
};

AutoForm.addHooks([
    'Simple_itemNew',
    'Simple_itemEdit'
], hooksObject);
