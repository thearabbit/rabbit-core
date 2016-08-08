import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {moment} from 'meteor/momentjs:moment';
import {TAPi18n} from 'meteor/tap:i18n';
import {__} from '../../../common/libs/tapi18n-callback-helper.js';

export const Exchange = new Mongo.Collection("core_exchange");

let Rates = new SimpleSchema({
    KHR: {
        type: Number,
        label: function () {
            return TAPi18n.__('core.exchange.khrLbl');
        },
        decimal: true,
        min: 0.1,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({prefix: '៛'});
            }
        }
    },
    USD: {
        type: Number,
        label: function () {
            return TAPi18n.__('core.exchange.usdLbl');
        },
        decimal: true,
        min: 0.1,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    THB: {
        type: Number,
        label: function () {
            return TAPi18n.__('core.exchange.thbLbl');
        },
        decimal: true,
        min: 0.1,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({prefix: 'B'});
            }
        }
    }
});

Exchange.schema = new SimpleSchema({
    exDate: {
        type: Date,
        label: function () {
            return TAPi18n.__('core.exchange.dateLbl');
        },
        unique: true,
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    showTodayButton: true
                }
            }
        }
    },
    base: {
        type: String,
        label: function () {
            return TAPi18n.__('core.exchange.baseCurrencyLbl');
        }
    },
    rates: {
        type: Rates,
        label: function () {
            return TAPi18n.__('core.exchange.ratesLbl');
        }
    }
});

Exchange.attachSchema(Exchange.schema);
