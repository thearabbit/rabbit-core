import {Meteor} from 'meteor/meteor';
import {Templet} from 'meteor/templating';
import {Tabular} from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib
import {tabularOpts} from '../libs/tabular-opts.js';

// Collection
import {Exchange} from '../../imports/api/collections/exchange.js';

// Page
Meteor.isClient && require('../../imports/ui/pages/exchange.html');

tabularOpts.name = "core.exchange";
tabularOpts.collection = Exchange;
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.Core_exchangeAction},
    {
        data: "exDate",
        title: "Data",
        render: function (val, type, doc) {
            return moment(val).format('DD/MM/YYYY');
        }
    },
    {data: "base", title: "Base Currency"},
    {
        data: "rates",
        title: "Rates",
        render: function (val, type, doc) {
            return EJSON.stringify(val);
        }
    }
];

export const ExchangeTabular = new Tabular.Table(tabularOpts);