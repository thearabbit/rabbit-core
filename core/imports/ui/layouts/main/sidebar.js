import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {AutoForm} from 'meteor/aldeed:autoform';

// Schema
import {SidebarBranchSchema} from '../../../api/collections/sidebar-branch.js';

// Page
import './sidebar.html';
import './sidebar-menu-tool.js';

// Sidebar Layout
Template._SidebarLayout.helpers({
    sidebarMenu: function () {
        let currentModule = Session.get('currentModule');
        return `${currentModule}_sidebarMenu`;
    }
});

// Sidebar form for branch office
Template._SidebarForm.onCreated(function () {
    this.autorun(() => {
        if (Meteor.user()) {
            let rolesBranch = Meteor.user().rolesBranch;
            this.subscribe('core.branch', {_id: {$in: rolesBranch}});
        }
    });
});

Template._SidebarForm.helpers({
    schema(){
        return SidebarBranchSchema;
    }
});

Template._SidebarForm.events({
    'change [name="branch"]': function (event, instance) {
        let branch = event.target.value;

        // Change current branch office
        Session.setAuth('currentBranch', branch);
    }
});
