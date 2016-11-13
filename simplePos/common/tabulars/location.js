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
import {Location} from '../collections/location.js';

// Page
Meteor.isClient && require('../../imports/pages/location.html');

let tabularData = _.assignIn(_.clone(tabularOpts), {
    name: 'simplePos.location',
    collection: Location,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.SimplePos_locationAction},
        {
            data: "code",
            title: "Code",
            render: function (val, type, doc) {
                let level = _.isArray(doc.ancestors) ? doc.ancestors.length : 0;
                level = Spacebars.SafeString(_.repeat('&nbsp;', level * 5));

                // Check type
                if (doc.type == 'V') {
                    return Spacebars.SafeString(`${level}<span class="text-green">${val}</span>`);
                }

                return `${level}${val}`;
            }
        },
        {data: "name", title: "Name"},
        {
            data: "type",
            title: "Type",
            render: function (val, type, doc) {
                if (val == 'V') {
                    return Spacebars.SafeString(`<span class="label label-success">${val}</span>`);
                }
                return val;
            }
        },
    ],
    order: [[1, 'asc']],
    extraFields: ['_id', 'type', 'ancestors'],
});

export const LocationTabular = new Tabular.Table(tabularData);
