import {Meteor} from 'meteor/meteor';
import {Templet} from 'meteor/templating';
import {Tabular} from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';

// Config
import {tabularOpts} from '../libs/tabular-opts.js';

// Page
Meteor.isClient && require('../../imports/ui/pages/user.html');

tabularOpts.name = "core.user";
tabularOpts.collection = Meteor.users;
// tabularOpts.selector = function (userId) {
//     return {username: {$ne: 'super'}}
// };
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.Core_userAction},
    {data: "profile.name", title: "Full Name"},
    {data: "username", title: "User Name"},
    {
        data: "emails",
        title: "Emails",
        render: function (val) {
            if (typeof val !== 'undefined') {
                return val[0].address;
            }
            return null;
        }
    },
    {
        data: "roles",
        title: "Roles",
        render: function (val, type, doc) {
            if (typeof val !== undefined) {
                return EJSON.stringify(val);
            }
            return null;
        }
    },
    {
        data: "rolesBranch",
        title: "Roles For Branch",
        render: function (val, type, doc) {
            if (typeof val !== 'undefined') {
                return val;
            }
            return null;
        }
    }
    //{
    //    data: "status.online", title: "Status",
    //    render: function (val, type, doc) {
    //        if (val == true) {
    //            return '<span class="label label-success">online</span>';
    //        } else {
    //            return '<span class="label label-default">offline</span>';
    //        }
    //    }
    //}
];

export const UserTabular = new Tabular.Table(tabularOpts);