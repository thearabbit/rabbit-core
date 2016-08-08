import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

// Page
import './sidebar-menu-tool.html';

Template.Core_sidebarMenuTool.helpers({
    isRestore () {
        let currentModule = Session.get('currentModule');
        if (currentModule == 'Core') {
            return true
        }

        return false;
    }
});
