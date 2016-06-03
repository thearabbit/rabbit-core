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
import '../../core/imports/ui/layouts/report/index.html';

// Group
let SimpleRoutes = FlowRouter.group({
    prefix: '/simple',
    title: "Simple",
    titlePrefix: 'Simple > ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});

// Customer list
import '../imports/ui/reports/customer.js';
SimpleRoutes.route('/customer-report', {
    name: 'simple.customerReport',
    title: __('simple.customerReport.title'),
    action: function (params, queryParams) {
        Layout.main('Simple_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simple.customerReport.title'),
        icon: 'users',
        parent: 'simple.home'
    }
});

SimpleRoutes.route('/customer-report-gen', {
    name: 'simple.customerReportGen',
    title: __('simple.customerReport.title'),
    action: function (params, queryParams) {
        Layout.report('Simple_customerReportGen');
    }
});

// Order
import '../imports/ui/reports/order.js';
SimpleRoutes.route('/order-report', {
    name: 'simple.orderReport',
    title: __('simple.orderReport.title'),
    action: function (params, queryParams) {
        Layout.main('Simple_orderReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simple.orderReport.title'),
        icon: 'cart-plus',
        parent: 'simple.home'
    }
});

SimpleRoutes.route('/order-report-gen', {
    name: 'simple.orderReportGen',
    title: __('simple.orderReport.title'),
    action: function (params, queryParams) {
        Layout.report('Simple_orderReportGen');
    }
});
