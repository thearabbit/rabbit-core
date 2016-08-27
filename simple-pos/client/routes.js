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
import '../../core/imports/ui/layouts/login';
import '../../core/imports/ui/layouts/main';

// Group
let SimplePOSRoutes = FlowRouter.group({
    prefix: '/simple-pos',
    title: "Simple POS",
    titlePrefix: 'Simple POS > ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});

// Home
import '../imports/ui/pages/home.js';
SimplePOSRoutes.route('/home', {
    name: 'simplePos.home',
    title: __('simplePos.home.title'),
    action(param, queryParam){
        Layout.main('SimplePos_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simplePos.home.title'),
        icon: 'home',
        parent: 'core.welcome'
    }
});

// Lookup Value
import '../imports/ui/pages/lookup-value.js';
SimplePOSRoutes.route('/lookup-value', {
    name: 'simplePos.lookupValue',
    title: 'Lookup Value',
    action: function (params, queryParams) {
        Layout.main('SimplePos_lookupValue');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Lookup Value',
        icon: 'asterisk',
        parent: 'simplePos.home'
    }
});

// Item
import '../imports/ui/pages/item.js';
SimplePOSRoutes.route('/item', {
    name: 'simplePos.item',
    title: __('simplePos.item.title'),
    action: function (params, queryParams) {
        Layout.main('SimplePos_item');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simplePos.item.title'),
        icon: 'product-hunt',
        parent: 'simplePos.home'
    }
});

// Customer
import '../imports/ui/pages/customer.js';
SimplePOSRoutes.route('/customer', {
    name: 'simplePos.customer',
    title: 'Customer',
    action: function (params, queryParams) {
        Layout.main('SimplePos_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer',
        icon: 'users',
        parent: 'simplePos.home'
    }
});

// Order
import '../imports/ui/pages/order.js';
SimplePOSRoutes.route('/order', {
    name: 'simplePos.order',
    title: 'Order',
    action: function (params, queryParams) {
        Layout.main('SimplePos_order');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Order',
        icon: 'cart-plus',
        parent: 'simplePos.home'
    }
});
