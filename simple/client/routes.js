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
let SimpleRoutes = FlowRouter.group({
    prefix: '/simple',
    title: "Simple",
    titlePrefix: 'Simple > ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});

// Home
import '../imports/ui/pages/home.js';
SimpleRoutes.route('/home', {
    name: 'simple.home',
    title: __('simple.home.title'),
    action(param, queryParam){
        Layout.main('Simple_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simple.home.title'),
        icon: 'home',
        parent: 'core.welcome'
    }
});

// Item
import '../imports/ui/pages/item.js';
SimpleRoutes.route('/item', {
    name: 'simple.item',
    title: __('simple.item.title'),
    action: function (params, queryParams) {
        Layout.main('Simple_item');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simple.item.title'),
        icon: 'product-hunt',
        parent: 'simple.home'
    }
});

// Customer
import '../imports/ui/pages/customer.js';
SimpleRoutes.route('/customer', {
    name: 'simple.customer',
    title: __('simple.customer.title'),
    action: function (params, queryParams) {
        Layout.main('Simple_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simple.customer.title'),
        icon: 'users',
        parent: 'simple.home'
    }
});

// Order
import '../imports/ui/pages/order.js';
SimpleRoutes.route('/order', {
    name: 'simple.order',
    title: __('simple.order.title'),
    action: function (params, queryParams) {
        Layout.main('Simple_order');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: __('simple.order.title'),
        icon: 'cart-plus',
        parent: 'simple.home'
    }
});
