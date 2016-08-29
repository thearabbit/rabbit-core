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

// Customer list with in page (printThis package)
import '../imports/ui/reports/customer.js';
SimplePOSRoutes.route('/customer-report', {
    name: 'simplePos.customerReport',
    title: 'Customer Report',
    action: function (params, queryParams) {
        Layout.main('SimplePos_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        icon: 'users',
        parent: 'simplePos.home'
    }
});

// Invoice with new page
import '../imports/ui/reports/invoice.js';
SimplePOSRoutes.route('/invoice-report', {
    name: 'simplePos.invoiceReport',
    title: 'Invoice Report',
    action: function (params, queryParams) {
        Layout.main('SimplePos_invoiceReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Invoice Report',
        icon: 'cart-plus',
        parent: 'simplePos.home'
    }
});
SimplePOSRoutes.route('/invoice-report-gen', {
    name: 'simplePos.invoiceReportGe',
    title: 'Invoice Report',
    action: function (params, queryParams) {
        Layout.report('SimplePos_invoiceReportGen');
    }
});
