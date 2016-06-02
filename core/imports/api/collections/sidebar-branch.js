import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';

import {SelectOpts} from '../../ui/libs/select-opts.js';

export const SidebarBranchSchema = new SimpleSchema({
    branch: {
        type: String,
        label: function () {
            return TAPi18n.__('core.welcome.branch');
        },
        autoform: {
            type: "select2",
            options: function () {
                return Meteor.isClient && SelectOpts.branchForCurrentUser(false);
            },
            afFieldInput: {
                value: function () {
                    return Meteor.isClient && Session.get('currentBranch');
                }
            }
        }
    }
});
