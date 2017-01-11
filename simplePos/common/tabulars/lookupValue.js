import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import {numeral} from 'meteor/numeral:numeral';
import {lightbox} from 'meteor/theara:lightbox-helpers';

// Lib
import {tabularOpts} from '../../../core/common/libs/tabular-opts.js';

// Collection
import {LookupValue} from '../collections/lookupValue.js';

// Page
Meteor.isClient && require('../../imports/pages/lookupValue.html');

let tabularData = _.assignIn(_.clone(tabularOpts), {
    name: 'simplePos.lookupValue',
    collection: LookupValue,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.SimplePos_lookupValueAction},
        {data: "name", title: "Name"},
        {data: "private", title: "Private"},
        {
            data: "options",
            title: "Options (Value : Label)",
            render: function (val, type, doc) {
                let list = `<ul>`;

                _.forEach(val, (o) => {
                    list += `<li>${o.value} : ${o.label}</li>`;
                });
                list += `</ul>`;

                return list;
            }
        },
    ],
    extraFields: ['_id'],
    order: [[1, 'asc']],
});

export const LookupValueTabular = new Tabular.Table(tabularData);
