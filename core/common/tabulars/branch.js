import {Meteor} from 'meteor/meteor';
import {Templet} from 'meteor/templating';
import {Tabular} from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';

// Lib
import {tabularOpts} from '../libs/tabular-opts.js';

// Collection
import {Branch} from '../../imports/api/collections/branch.js';
import {Setting} from '../../imports/api/collections/setting.js';

// Page
Meteor.isClient && require('../../imports/ui/pages/branch.html');

tabularOpts.name = 'core.branch';
tabularOpts.collection = Branch;
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.Core_branchAction},
    {
        data: "_id",
        title: "ID",
        render: function (val, type, doc) {
            let setting = Setting.findOne();
            if (val != setting.headOffice) {
                return val;
            }
        
            return '<u class="text-primary">' + val + '</u>';
        }
    },
    {data: "khName", title: "Kh Name"},
    //{data: "khShortName", title: "Kh Short Name"},
    {data: "enName", title: "En Name"},
    //{data: "enShortName", title: "En Short Name"},
    {data: "khAddress", title: "Kh Address"},
    // {data: "enAddress", title: "En Address"},
    {data: "telephone", title: "Telephone"},
    {data: "email", title: "Email"}
];
export const BranchTabular = new Tabular.Table(tabularOpts);
