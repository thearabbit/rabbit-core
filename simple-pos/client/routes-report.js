import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {FlowRouterTitle} from 'meteor/ostrio:flow-router-title';
import 'meteor/arillo:flow-router-helpers';
import 'meteor/zimme:active-route';
import 'meteor/theara:flow-router-breadcrumb';

// Lib
import {__} from '../../core/common/libs/tapi18n-callback-helper.js';

// Layout
import {Layout} from '../../core/client/libs/render-layout.js';
import '../../core/imports/layouts/report/index.html';

// Group
let SimplePosRoutes = FlowRouter.group({
    prefix: '/simple-pos',
    title: "Simple Pos",
    titlePrefix: 'Simple Pos > ',
    subscriptions: function (params, queryParams) {
        // Branch by user
        if (Meteor.user()) {
            let rolesBranch = Meteor.user().rolesBranch;
            this.register('core.branch', Meteor.subscribe('core.branch', {_id: {$in: rolesBranch}}));
        }
    }
});

// Item List
import '../imports/reports/itemList.js';
SimplePosRoutes.route('/item-list-report', {
    name: 'simplePos.itemListReport',
    title: 'Item List',
    action: function (params, queryParams) {
        Layout.main('SimplePos_itemListReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Item List',
        // icon: 'cart-plus',
        parent: 'simplePos.home'
    }
});

// Invoice
import '../imports/reports/invoice.js';
SimplePosRoutes.route('/invoice-report', {
    name: 'simplePos.invoiceReport',
    title: 'Invoice Report',
    action: function (params, queryParams) {
        Layout.main('SimplePos_invoiceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Invoice Report',
        // icon: 'cart-plus',
        parent: 'simplePos.home'
    }
});
SimplePosRoutes.route('/invoice-report-gen', {
    name: 'simplePos.invoiceReportGe',
    title: 'Invoice Report',
    action: function (params, queryParams) {
        Layout.report('SimplePos_invoiceReportGen');
    }
});

// Order
import '../imports/reports/order.js';
SimplePosRoutes.route('/order-report', {
    name: 'simplePos.orderReport',
    title: 'Order Report',
    action: function (params, queryParams) {
        Layout.main('SimplePos_orderReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Order Report',
        // icon: 'users',
        parent: 'simplePos.home'
    }
});
