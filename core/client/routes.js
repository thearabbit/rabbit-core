import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {FlowRouterTitle} from 'meteor/ostrio:flow-router-title';
import {TAPi18n} from 'meteor/tap:i18n';
import 'meteor/arillo:flow-router-helpers';
import 'meteor/zimme:active-route';
import 'meteor/theara:flow-router-breadcrumb';

// Lib
import {__} from '../common/libs/tapi18n-callback-helper.js';

// Layout
import {Layout} from './libs/render-layout.js';
import '../imports/ui/layouts/login';
import '../imports/ui/layouts/main';

// Global subscriptions
FlowRouter.subscriptions = function () {
    // Currency
    this.register('core.currency', Meteor.subscribe('core.currency'));
    // // Setting
    this.register('core.setting', Meteor.subscribe('core.setting'));
    // Company
    this.register('core.company', Meteor.subscribe('core.company'));

    // Files upload
    this.register('files', Meteor.subscribe('files'));
    // Meteor.subscribe('files');
};

// Author
FlowRouter.triggers.enter([
    function (context, redirect) {
        let currentModule = Session.get('currentModule');

        if (!Meteor.userId() || !currentModule) {
            FlowRouter.go('core.welcome');
        }
    }
], {
    except: ['core.welcome']
});

// Not found
import '../imports/ui/pages/not-found.js';
FlowRouter.notFound = {
    name: 'core.notFound',
    title: '404: Page not found',
    action: function () {
        Layout.login('Core_notFound');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Not Found',
        parent: 'core.welcome'
    }
};

// Group
let CoreRoutes = FlowRouter.group({
    prefix: '/core',
    title: "Core",
    titlePrefix: 'Core > '
});

// Welcome
import '../imports/ui/pages/welcome.js';
FlowRouter.route('/', {
    name: 'core.welcome',
    title: __('core.welcome.title'),
    action: function (params, queryParams) {
        Layout.login('Core_welcome');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.welcome.title'),
        icon: 'dashboard'
        //parent: 'core.welcome'
    }
});

// Home
import '../imports/ui/pages/home.js';
CoreRoutes.route('/home', {
    name: 'core.home',
    title: __('core.home.title'),
    action(param, queryParam){
        Layout.main('Core_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.home.title'),
        icon: 'home',
        parent: 'core.welcome'
    }
});

// Branch
import '../imports/ui/pages/branch.js';
CoreRoutes.route('/branch', {
    name: 'core.branch',
    title: __('core.branch.title'),
    action: function (params, queryParams) {
        Layout.main('Core_branch');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.branch.title'),
        icon: 'sitemap',
        parent: 'core.welcome'
    }
});

// Company
import '../imports/ui/pages/company.js';
CoreRoutes.route('/company', {
    name: 'core.company',
    title: __('core.company.title'),
    action: function (params, queryParams) {
        Layout.main('Core_company');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.company.title'),
        icon: 'building',
        parent: 'core.welcome'
    }
});

// Exchange
import '../imports/ui/pages/exchange.js';
CoreRoutes.route('/exchange', {
    name: 'core.exchange',
    title: __('core.exchange.title'),
    action: function (params, queryParams) {
        Layout.main('Core_exchange');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.exchange.title'),
        icon: 'exchange',
        parent: 'core.welcome'
    }
});

// Setting
import '../imports/ui/pages/setting.js';
CoreRoutes.route('/setting', {
    name: 'core.setting',
    title: __('core.setting.title'),
    action: function (params, queryParams) {
        Layout.main('Core_setting');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.setting.title'),
        icon: 'cogs',
        parent: 'core.welcome'
    }
});

// User
import '../imports/ui/pages/user.js';
CoreRoutes.route('/user', {
    name: 'core.user',
    title: __('core.user.title'),
    action: function (params, queryParams) {
        Layout.main('Core_user');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('core.user.title'),
        icon: 'user',
        parent: 'core.welcome'
    }
});

// Profile
import '../imports/ui/pages/profile.js';
CoreRoutes.route('/profile', {
    name: 'core.profile',
    title: 'Profile',
    action: function (params, queryParams) {
        Layout.main('Core_profile');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Profile',
        icon: 'user',
        parent: 'core.welcome'
    }
});

// Backup  & Restore
import '../imports/ui/pages/backup-restore.js';
CoreRoutes.route('/backup', {
    name: 'core.backup',
    title: 'Backup',
    action: function (params, queryParams) {
        Layout.main('Core_backup');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Backup',
        icon: 'download',
        parent: 'core.welcome'
    }
});

CoreRoutes.route('/restore', {
    name: 'core.restore',
    title: 'Restore',
    action: function (params, queryParams) {
        Layout.main('Core_restore');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Restore',
        icon: 'upload',
        parent: 'core.welcome'
    }
});
