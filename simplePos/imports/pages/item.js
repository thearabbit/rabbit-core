import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';

// --------- Tabular Config -------------
import {$} from 'meteor/jquery';

// Bootstrap Theme
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

// Buttons Core
import dataTableButtons from 'datatables.net-buttons-bs';

// Import whichever buttons you are using
import columnVisibilityButton from 'datatables.net-buttons/js/buttons.colVis.js';
import html5ExportButtons from 'datatables.net-buttons/js/buttons.html5.js';
import flashExportButtons from 'datatables.net-buttons/js/buttons.flash.js';
import printButton from 'datatables.net-buttons/js/buttons.print.js';

// Then initialize everything you imported
dataTablesBootstrap(window, $);
dataTableButtons(window, $);
columnVisibilityButton(window, $);
html5ExportButtons(window, $);
flashExportButtons(window, $);
printButton(window, $);
// --------- /Tabular Config -------------

// Lib
import {createNewAlertify} from '../../../core/client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../core/client/libs/display-alert.js';
import {__} from '../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../core/client/components/loading.js';
import '../../../core/client/components/column-action.js';
import '../../../core/client/components/form-footer.js';

// Collection
import {Item} from '../../common/collections/item.js';

// Tabular
import {ItemTabular} from '../../common/tabulars/item.js';

// Page
import './item.html';

// Declare template
let indexTmpl = Template.SimplePos_item,
    actionTmpl = Template.SimplePos_itemAction,
    formTmpl = Template.SimplePos_itemForm,
    showTmpl = Template.SimplePos_itemShow;


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
        alertify.item(fa('plus', TAPi18n.__('simplePos.item.title')), renderTemplate(formTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.item(fa('pencil', TAPi18n.__('simplePos.item.title')), renderTemplate(formTmpl, {
            itemId: this._id,
            type: this.type
        }));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Item,
            {_id: this._id},
            {title: TAPi18n.__('simplePos.item.title'), itemTitle: this._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.item(fa('eye', TAPi18n.__('simplePos.item.title')), renderTemplate(showTmpl, {itemId: this._id}));
    }
});

// Form
formTmpl.onCreated(function () {
    this.type = new ReactiveVar();

    this.autorun(()=> {
        // Lookup value
        this.subscribe('simplePos.lookupValue', ['Item Type']);

        let currentData = Template.currentData();
        if (currentData) {
            this.type.set(currentData.type);
            this.subscribe('simplePos.itemById', currentData.itemId);
        }
    });
});

formTmpl.helpers({
    collection(){
        return Item;
    },
    data () {
        let data = {
            formType: 'insert',
            doc: {}
        };
        let currentData = Template.currentData();

        if (currentData) {
            data.formType = 'update';
            data.doc = Item.findOne(currentData.itemId);
        }

        return data;
    },
    showPrice(){
        let type = Template.instance().type.get();
        return type == 'C' ? true : false;
    }
});

formTmpl.events({
    'change [name="type"]'(event, instance){
        instance.type.set(instance.$(event.currentTarget).val());
    }
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        let currentData = Template.currentData();
        this.subscribe('simplePos.itemById', currentData.itemId);
    });
});

showTmpl.helpers({
    i18nLabel(label){
        let key = `simplePos.item.schema.${label}.label`;
        return TAPi18n.__(key);
    },
    data () {
        let currentData = Template.currentData();
        let data = Item.findOne(currentData._id);
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
        displaySuccess();

        $('[name="name"]').val('');
        $('[name="name"]').focus();
        $('[name="price"]').val('');
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks(['SimplePos_itemForm'], hooksObject);
