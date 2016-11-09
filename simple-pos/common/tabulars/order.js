import {Meteor} from 'meteor/meteor';
import {Templet} from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import {numeral} from 'meteor/numeral:numeral';
import {lightbox} from 'meteor/theara:lightbox-helpers';

// Lib
import {tabularOpts} from '../../../core/common/libs/tabular-opts.js';

// Collection
import {Order} from '../collections/order.js';

// Page
Meteor.isClient && require('../../imports/pages/order.html');

let tabularData = _.assignIn(_.clone(tabularOpts), {
    name : 'simplePos.order',
collection : Order,
columns : [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.SimplePos_orderAction},
    {data: "_id", title: "ID"},
    {
        data: "orderDate",
        title: "Date",
        render: function (val, type, doc) {
            return moment(val).format('DD/MM/YYYY');
        }
    },
    {data: "total", title: "Total"},
    {data: "des", title: "Description"},
    {data: "customerId", title: "Customer"},
],
});

export const OrderTabular = new Tabular.Table(tabularData);
