import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import moment from 'moment';
import {EJSON} from 'meteor/ejson';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';
import {createNewAlertify} from '../../../client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../client/libs/render-template.js';
import {destroyAction} from '../../../client/libs/destroy-action.js';
import {displaySuccess, displayError, displayLoading} from '../../../client/libs/display-alert.js';

// Collection
import {Exchange} from '../../api/collections/exchange.js';
import {Setting} from '../../api/collections/setting.js';

// Tabular
import {ExchangeTabular} from '../../../common/tabulars/exchange.js';

// Page
import './exchange.html';


// Declare template
let indexTmpl = Template.Core_exchange,
    newTmpl = Template.Core_exchangeNew,
    editTmpl = Template.Core_exchangeEdit,
    showTmpl = Template.Core_exchangeShow;

// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('exchange', {size: 'lg'});
    createNewAlertify('exchangeShow');
});
indexTmpl.helpers({
    tabularTable(){
        return ExchangeTabular;
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.exchange(fa('plus', TAPi18n.__('core.exchange.title')), renderTemplate(newTmpl));
    },
    'click .js-update' (event, instance) {
        // let data = Blaze.getData(event.target);
        alertify.exchange(fa('pencil', TAPi18n.__('core.exchange.title')), renderTemplate(editTmpl, this));
    },
    'click .js-destroy' (event, instance) {
        // let data = Blaze.getData(event.target);
        destroyAction(
            Exchange,
            {_id: this._id},
            {title: TAPi18n.__('core.exchange.title'), itemTitle: moment(this.exDate).format('DD/MM/YYYY')}
        );
    },
    'click .js-display' (event, instance) {
        // let data = Blaze.getData(event.target);
        alertify.exchangeShow(fa('eye', TAPi18n.__('core.exchange.title')), renderTemplate(showTmpl, this));
    }
});

// New
newTmpl.helpers({
    collection(){
        return Exchange;
    },
    doc () {
        let khr = 0, usd = 0, thb = 0;
        let baseCurrency = Setting.findOne().baseCurrency;

        if (baseCurrency == 'KHR') {
            khr = 1;
        } else if (baseCurrency == 'USD') {
            usd = 1;
        } else {
            thb = 1;
        }

        return {base: baseCurrency, khr: khr, usd: usd, thb: thb};
    }
});

// Edit
editTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('core.exchange', {_id: this.data._id});
    });
});

editTmpl.helpers({
    collection(){
        return Exchange;
    },
    doc () {
        let data = Exchange.findOne(this._id);
        return data;
    }
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('core.exchange', {_id: this.data._id});
    });
});

showTmpl.helpers({
    doc () {
        let data = Exchange.findOne(this._id);
        data.ratesVal = EJSON.stringify(data.rates);
        return data;
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        // if (formType == 'update') {
        alertify.exchange().close();
        // }
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks([
    'Core_exchangeNew',
    'Core_exchangeEdit'
], hooksObject);
