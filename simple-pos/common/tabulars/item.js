import {Meteor} from 'meteor/meteor';
import {Templet} from 'meteor/templating';
import Tabular from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import {numeral} from 'meteor/numeral:numeral';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib
import {tabularOpts} from '../../../core/common/libs/tabular-opts.js';

// Collection
import {Item} from '../collections/item.js';

// Page
Meteor.isClient && require('../../imports/pages/item.html');

let tabularData = _.assignIn(_.clone(tabularOpts), {
    name: 'simplePos.item',
    collection: Item,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.SimplePos_itemAction},
        {
            data: "_id",
            title: "ID",
            // titleFn: function () {
            //     return TAPi18n.__('simplePos.item.schema._id.label');
            // }
        },
        {
            data: "name",
            title: "Name",
            // titleFn: function () {
            //     return TAPi18n.__('simplePos.item.schema.name.label');
            // }
        },
        {
            data: "price",
            title: "Price",
            // titleFn: function () {
            //     return TAPi18n.__('simplePos.item.schema.price.label');
            // },
            render: function (val, type, doc) {
                return numeral(val).format('$ 0,0.00');
            }
        },
        {
            data: "ancestors",
            title: "Parent",
            // titleFn: function () {
            //     return TAPi18n.__('simplePos.item.schema.ancestors.label');
            // },
            render: function (val, type, doc) {
                return val;
            }
        },
        {
            data: "type",
            title: "Type",
            // titleFn: function () {
            //     return TAPi18n.__('simplePos.item.schema.type.label');
            // }
        },
        {
            data: "photo",
            title: "Photo",
            // titleFn: function () {
            //     return TAPi18n.__('simplePos.item.schema.photo.label');
            // },
            // visible: false, // Disable column
            render: function (val, type, doc) {
                if (val) {
                    let img = Files.findOne(val);
                    if (img) {
                        return lightbox(img.url(), doc._id, doc.name);
                    }
                }

                return null;
            }
        }
    ],
});

export const ItemTabular = new Tabular.Table(tabularData);
