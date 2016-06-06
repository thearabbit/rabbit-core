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
let SimplePOSRoutes = FlowRouter.group({
    prefix: '/simple-pos',
    title: "Simple POS",
    titlePrefix: 'Simple POS > ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});

// Customer list
import '../imports/ui/reports/customer.js';
SimplePOSRoutes.route('/customer-report', {
    name: 'simplePos.customerReport',
    title: __('simplePos.customerReport.title'),
    action: function (params, queryParams) {
        Layout.main('SimplePos_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simplePos.customerReport.title'),
        icon: 'users',
        parent: 'simplePos.home'
    }
});

SimplePOSRoutes.route('/customer-report-gen', {
    name: 'simplePos.customerReportGen',
    title: __('simplePos.customerReport.title'),
    action: function (params, queryParams) {
        Layout.report('SimplePos_customerReportGen');
    }
});

// Order
import '../imports/ui/reports/order.js';
SimplePOSRoutes.route('/order-report', {
    name: 'simplePos.orderReport',
    title: __('simplePos.orderReport.title'),
    action: function (params, queryParams) {
        Layout.main('SimplePos_orderReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simplePos.orderReport.title'),
        icon: 'cart-plus',
        parent: 'simplePos.home'
    }
});

SimplePOSRoutes.route('/order-report-gen', {
    name: 'simplePos.orderReportGen',
    title: __('simplePos.orderReport.title'),
    action: function (params, queryParams) {
        Layout.report('SimplePos_orderReportGen');
    }
});
